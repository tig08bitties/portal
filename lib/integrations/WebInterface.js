/*
   ╔═══════════════════════════════════════════════════════════╗
   ║        ⟐ WEB INTERFACE FOR THEOS-LIMA ⟐                   ║
   ║   HTTP Server • WebSocket • AI Interaction API            ║
   ╚═══════════════════════════════════════════════════════════╝
*/

import http from 'http';
import { URL } from 'url';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class WebInterface {
  constructor(theosLima, opts = {}) {
    this.theosLima = theosLima;
    this.port = opts.port || process.env.THEOS_WEB_PORT || 8888;
    this.host = opts.host || process.env.THEOS_WEB_HOST || 'localhost';
    this.server = null;
    this.wss = null;
    this.clients = new Set();
    this.conversationHistory = [];
    this.wsSupported = false;
    this.WebSocketServer = null;
  }

  // Initialize WebSocket support (optional)
  async initWebSocket() {
    try {
      const wsModule = await import('ws');
      this.WebSocketServer = wsModule.WebSocketServer;
      this.wsSupported = true;
      return true;
    } catch (error) {
      // WebSocket support not available, will use HTTP-only mode
      this.wsSupported = false;
      return false;
    }
  }

  // Start the web server
  async start() {
    // Try to initialize WebSocket support
    await this.initWebSocket();

    return new Promise((resolve, reject) => {
      this.server = http.createServer((req, res) => {
        this.handleRequest(req, res);
      });

      // WebSocket server (if available)
      if (this.wsSupported && this.WebSocketServer) {
        try {
          this.wss = new this.WebSocketServer({ server: this.server });
          this.wss.on('connection', (ws) => {
            this.handleWebSocketConnection(ws);
          });
        } catch (error) {
          console.log('   ⚠ WebSocket server initialization failed:', error.message);
          this.wsSupported = false;
        }
      }

      this.server.listen(this.port, this.host, () => {
        console.log(`\n╔═══════════════════════════════════════════════════════════╗`);
        console.log(`║        ⟐ THEOS-LIMA WEB INTERFACE ⟐                      ║`);
        console.log(`╚═══════════════════════════════════════════════════════════╝\n`);
        console.log(`🌐 Web Interface: http://${this.host}:${this.port}`);
        if (this.wsSupported) {
          console.log(`🔌 WebSocket: ws://${this.host}:${this.port}`);
        }
        console.log(`📡 API: http://${this.host}:${this.port}/api`);
        console.log(`💬 Chat UI: http://${this.host}:${this.port}/chat\n`);
        resolve();
      });

      this.server.on('error', (error) => {
        console.error('❌ Web server error:', error);
        reject(error);
      });
    });
  }

  // Stop the web server
  stop() {
    return new Promise((resolve) => {
      if (this.wss) {
        this.wss.close();
      }
      if (this.server) {
        this.server.close(() => {
          console.log('🛑 Web interface stopped');
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  // Handle HTTP requests
  handleRequest(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname;

    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    // API endpoints
    if (path.startsWith('/api/')) {
      this.handleAPI(req, res, path);
      return;
    }

    // Static routes
    switch (path) {
      case '/':
      case '/chat':
        this.serveChatUI(res);
        break;
      case '/status':
        this.serveStatus(res);
        break;
      case '/health':
        this.serveHealth(res);
        break;
      default:
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
  }

  // Handle API requests
  async handleAPI(req, res, path) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    
    try {
      if (path === '/api/query' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', async () => {
          try {
            const data = JSON.parse(body);
            const query = data.query || data.message || '';
            
            if (!query) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Query is required' }));
              return;
            }

            // Get response from TheosLima
            let response;
            if (this.theosLima && this.theosLima.fren) {
              response = await this.theosLima.autonomousQuery(query);
            } else {
              response = 'TheosLima not fully initialized. Please wait...';
            }

            // Add to conversation history
            this.conversationHistory.push({
              role: 'user',
              content: query,
              timestamp: Date.now()
            });
            this.conversationHistory.push({
              role: 'assistant',
              content: response,
              timestamp: Date.now()
            });

            // Keep last 50 messages
            if (this.conversationHistory.length > 50) {
              this.conversationHistory = this.conversationHistory.slice(-50);
            }

            // Broadcast to WebSocket clients
            this.broadcast({
              type: 'message',
              role: 'user',
              content: query,
              timestamp: Date.now()
            });
            this.broadcast({
              type: 'message',
              role: 'assistant',
              content: response,
              timestamp: Date.now()
            });

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              success: true,
              response,
              timestamp: Date.now()
            }));
          } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.message }));
          }
        });
        return;
      }

      if (path === '/api/status' && req.method === 'GET') {
        const status = this.theosLima ? this.theosLima.getStatus() : null;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          status,
          webInterface: {
            port: this.port,
            host: this.host,
            clients: this.clients.size
          }
        }));
        return;
      }

      if (path === '/api/history' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          history: this.conversationHistory.slice(-20) // Last 20 messages
        }));
        return;
      }

      if (path === '/api/stream' && req.method === 'POST') {
        // WebSocket streaming endpoint info
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: 'Use WebSocket connection for streaming',
          websocket: `ws://${this.host}:${this.port}`
        }));
        return;
      }

      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'API endpoint not found' }));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
    }
  }

  // Handle WebSocket connections
  handleWebSocketConnection(ws) {
    this.clients.add(ws);
    console.log(`🔌 WebSocket client connected (${this.clients.size} total)`);

    // Send welcome message
    ws.send(JSON.stringify({
      type: 'welcome',
      message: 'Connected to THEOS-LIMA Web Interface',
      timestamp: Date.now()
    }));

    // Handle messages
    ws.on('message', async (data) => {
      try {
        const message = JSON.parse(data.toString());
        
        if (message.type === 'query' || message.type === 'message') {
          const query = message.query || message.content || '';
          
          if (!query) {
            ws.send(JSON.stringify({
              type: 'error',
              message: 'Query is required'
            }));
            return;
          }

          // Send thinking indicator
          ws.send(JSON.stringify({
            type: 'thinking',
            message: 'Processing...'
          }));

          // Get response from TheosLima
          let response;
          if (this.theosLima && this.theosLima.fren) {
            response = await this.theosLima.autonomousQuery(query);
          } else {
            response = 'TheosLima not fully initialized. Please wait...';
          }

          // Stream response word by word
          const words = response.split(' ');
          for (let i = 0; i < words.length; i++) {
            ws.send(JSON.stringify({
              type: 'stream',
              chunk: words[i] + (i < words.length - 1 ? ' ' : ''),
              done: i === words.length - 1
            }));
            // Small delay for streaming effect
            await new Promise(resolve => setTimeout(resolve, 10));
          }

          // Send complete message
          ws.send(JSON.stringify({
            type: 'complete',
            response,
            timestamp: Date.now()
          }));

          // Add to conversation history
          this.conversationHistory.push({
            role: 'user',
            content: query,
            timestamp: Date.now()
          });
          this.conversationHistory.push({
            role: 'assistant',
            content: response,
            timestamp: Date.now()
          });

          // Broadcast to other clients
          this.broadcast({
            type: 'message',
            role: 'user',
            content: query,
            timestamp: Date.now()
          }, ws);
          this.broadcast({
            type: 'message',
            role: 'assistant',
            content: response,
            timestamp: Date.now()
          }, ws);
        }
      } catch (error) {
        ws.send(JSON.stringify({
          type: 'error',
          message: error.message
        }));
      }
    });

    // Handle disconnect
    ws.on('close', () => {
      this.clients.delete(ws);
      console.log(`🔌 WebSocket client disconnected (${this.clients.size} total)`);
    });
  }

  // Broadcast message to all clients
  broadcast(message, exclude = null) {
    this.clients.forEach((client) => {
      if (client !== exclude && client.readyState === 1) { // WebSocket.OPEN
        try {
          client.send(JSON.stringify(message));
        } catch (error) {
          // Client may have disconnected
          this.clients.delete(client);
        }
      }
    });
  }

  // Serve chat UI
  serveChatUI(res) {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>THEOS-LIMA Web Interface</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Courier New', monospace;
            background: #0a0a0a;
            color: #00ff00;
            height: 100vh;
            display: flex;
            flex-direction: column;
        }
        .header {
            background: #1a1a1a;
            padding: 1rem;
            border-bottom: 2px solid #00ff00;
            text-align: center;
        }
        .header h1 {
            color: #00ff00;
            font-size: 1.5rem;
        }
        .chat-container {
            flex: 1;
            overflow-y: auto;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .message {
            padding: 0.75rem;
            border-radius: 4px;
            max-width: 80%;
            word-wrap: break-word;
        }
        .message.user {
            background: #1a3a1a;
            align-self: flex-end;
            border-left: 3px solid #00ff00;
        }
        .message.assistant {
            background: #1a1a3a;
            align-self: flex-start;
            border-left: 3px solid #0088ff;
        }
        .input-container {
            background: #1a1a1a;
            padding: 1rem;
            border-top: 2px solid #00ff00;
            display: flex;
            gap: 0.5rem;
        }
        #messageInput {
            flex: 1;
            background: #0a0a0a;
            border: 1px solid #00ff00;
            color: #00ff00;
            padding: 0.75rem;
            font-family: 'Courier New', monospace;
            font-size: 1rem;
        }
        #messageInput:focus {
            outline: none;
            border-color: #00ff88;
        }
        #sendButton {
            background: #00ff00;
            color: #0a0a0a;
            border: none;
            padding: 0.75rem 2rem;
            font-family: 'Courier New', monospace;
            font-weight: bold;
            cursor: pointer;
        }
        #sendButton:hover {
            background: #00ff88;
        }
        .status {
            text-align: center;
            padding: 0.5rem;
            font-size: 0.875rem;
            color: #888;
        }
        .thinking {
            color: #888;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🜏 THEOS-LIMA Web Interface 🜏</h1>
        <div class="status" id="status">Connecting...</div>
    </div>
    <div class="chat-container" id="chatContainer"></div>
    <div class="input-container">
        <input type="text" id="messageInput" placeholder="Ask THEOS-LIMA anything..." />
        <button id="sendButton">Send</button>
    </div>

    <script>
        const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsHost = window.location.hostname;
        const wsPort = ${this.port};
        const ws = new WebSocket(wsProtocol + '//' + wsHost + ':' + wsPort);
        const chatContainer = document.getElementById('chatContainer');
        const messageInput = document.getElementById('messageInput');
        const sendButton = document.getElementById('sendButton');
        const status = document.getElementById('status');
        let currentMessage = null;

        ws.onopen = () => {
            status.textContent = 'Connected to THEOS-LIMA';
            status.style.color = '#00ff00';
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            
            if (data.type === 'welcome') {
                addMessage('system', 'Connected to THEOS-LIMA Web Interface');
            } else if (data.type === 'thinking') {
                currentMessage = addMessage('assistant', '🜏 Thinking...', true);
            } else if (data.type === 'stream') {
                if (currentMessage) {
                    if (currentMessage.textContent === '🜏 Thinking...') {
                        currentMessage.textContent = '';
                    }
                    currentMessage.textContent += data.chunk;
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                }
            } else if (data.type === 'complete') {
                currentMessage = null;
            } else if (data.type === 'message') {
                addMessage(data.role, data.content);
            } else if (data.type === 'error') {
                addMessage('system', 'Error: ' + data.message);
            }
        };

        ws.onerror = () => {
            status.textContent = 'WebSocket not available, using HTTP API';
            status.style.color = '#ffaa00';
            // Fallback to HTTP API
            setupHTTPFallback();
        };

        ws.onclose = () => {
            status.textContent = 'Disconnected';
            status.style.color = '#ff0000';
        };

        function setupHTTPFallback() {
            // HTTP fallback for when WebSocket is not available
            sendButton.addEventListener('click', sendHTTPMessage);
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendHTTPMessage();
                }
            });
        }

        async function sendHTTPMessage() {
            const message = messageInput.value.trim();
            if (message) {
                addMessage('user', message);
                messageInput.value = '';
                status.textContent = 'Processing...';
                
                try {
                    const response = await fetch('/api/query', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ query: message })
                    });
                    const data = await response.json();
                    if (data.success) {
                        addMessage('assistant', data.response);
                    } else {
                        addMessage('system', 'Error: ' + data.error);
                    }
                    status.textContent = 'Connected (HTTP mode)';
                } catch (error) {
                    addMessage('system', 'Error: ' + error.message);
                    status.textContent = 'Connection error';
                }
            }
        }

        function addMessage(role, content, isThinking = false) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message ' + role;
            if (isThinking) {
                messageDiv.classList.add('thinking');
            }
            messageDiv.textContent = content;
            chatContainer.appendChild(messageDiv);
            chatContainer.scrollTop = chatContainer.scrollHeight;
            return messageDiv;
        }

        function sendMessage() {
            const message = messageInput.value.trim();
            if (message && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({
                    type: 'query',
                    query: message
                }));
                addMessage('user', message);
                messageInput.value = '';
            }
        }

        sendButton.addEventListener('click', sendMessage);
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    </script>
</body>
</html>`;

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  }

  // Serve status page
  serveStatus(res) {
    const status = this.theosLima ? this.theosLima.getStatus() : null;
    const html = `<!DOCTYPE html>
<html>
<head>
    <title>THEOS-LIMA Status</title>
    <style>
        body { font-family: monospace; background: #0a0a0a; color: #00ff00; padding: 2rem; }
        pre { background: #1a1a1a; padding: 1rem; border: 1px solid #00ff00; }
    </style>
</head>
<body>
    <h1>🜏 THEOS-LIMA Status 🜏</h1>
    <pre>${JSON.stringify(status, null, 2)}</pre>
    <p><a href="/chat" style="color: #00ff00;">Go to Chat Interface</a></p>
</body>
</html>`;

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  }

  // Serve health check
  serveHealth(res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'healthy',
      timestamp: Date.now(),
      webInterface: {
        port: this.port,
        host: this.host,
        clients: this.clients.size
      }
    }));
  }
}
