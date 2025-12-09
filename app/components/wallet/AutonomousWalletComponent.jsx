/*
   ╔═══════════════════════════════════════════════════════════╗
   ║        ⟐ AUTONOMOUS WALLET REACT COMPONENT ⟐              ║
   ║   For use in bridgeworld.lol Next.js application           ║
   ╚═══════════════════════════════════════════════════════════╝
*/

'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { AutonomousWallet } from '@/lib/wallet/AutonomousWallet';

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const [wallet, setWallet] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initWallet = async () => {
      try {
        setLoading(true);
        const w = new AutonomousWallet({
          name: 'Bridgeworld Autonomous Wallet',
          tonNetwork: 'mainnet'
        });

        const initResult = await w.initialize({
          metamask: {
            appName: 'Bridgeworld',
            appUrl: typeof window !== 'undefined' ? window.location.origin : 'https://bridgeworld.lol'
          },
          ton: {
            network: 'mainnet'
          }
        });

        if (initResult.success) {
          setWallet(w);
          setStatus(w.getStatus());

          // Listen for account changes
          w.on('accountsChanged', (accounts) => {
            setStatus(w.getStatus());
          });

          w.on('chainChanged', (chainId) => {
            setStatus(w.getStatus());
          });

          w.on('connect', () => {
            setStatus(w.getStatus());
          });

          w.on('disconnect', () => {
            setStatus(w.getStatus());
          });
        } else {
          setError('Failed to initialize wallet');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initWallet();
  }, []);

  return (
    <WalletContext.Provider value={{ wallet, status, loading, error }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};

// Wallet Connection Button Component
export function WalletConnectButton() {
  const { wallet, status, loading } = useWallet();
  const [connecting, setConnecting] = useState(false);

  const handleConnect = async () => {
    if (!wallet) return;

    try {
      setConnecting(true);
      const result = await wallet.connect();
      
      if (result.success) {
        console.log('Connected:', result.accounts);
      } else {
        console.error('Connection failed:', result.error);
      }
    } catch (error) {
      console.error('Connection error:', error);
    } finally {
      setConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    if (!wallet) return;

    try {
      await wallet.disconnect();
    } catch (error) {
      console.error('Disconnect error:', error);
    }
  };

  if (loading) {
    return (
      <button disabled className="px-4 py-2 bg-gray-400 text-white rounded-lg">
        Loading...
      </button>
    );
  }

  if (status?.connected) {
    return (
      <div className="flex items-center gap-2">
        <div className="px-4 py-2 bg-green-500 text-white rounded-lg">
          {status.account?.slice(0, 6)}...{status.account?.slice(-4)}
        </div>
        <button
          onClick={handleDisconnect}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      disabled={connecting}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
    >
      {connecting ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}

// Chain Selector Component
export function ChainSelector() {
  const { wallet, status } = useWallet();
  const [chains, setChains] = useState([]);

  useEffect(() => {
    if (wallet && wallet.chainlist?.chains) {
      setChains(wallet.chainlist.chains.slice(0, 10)); // Show first 10 chains
    }
  }, [wallet]);

  const handleSwitchChain = async (chainId) => {
    if (!wallet) return;

    try {
      const hexChainId = `0x${chainId.toString(16)}`;
      await wallet.switchChain(hexChainId);
    } catch (error) {
      console.error('Chain switch error:', error);
    }
  };

  if (!status?.connected) {
    return null;
  }

  return (
    <select
      value={status.chainId}
      onChange={(e) => handleSwitchChain(parseInt(e.target.value, 16))}
      className="px-4 py-2 border rounded-lg"
    >
      {chains.map((chain) => (
        <option key={chain.chainId} value={`0x${chain.chainId.toString(16)}`}>
          {chain.name} ({chain.chainId})
        </option>
      ))}
    </select>
  );
}

// Wallet Status Display
export function WalletStatus() {
  const { status, loading, error } = useWallet();

  if (loading) {
    return <div className="text-gray-500">Loading wallet...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!status) {
    return null;
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="font-bold mb-2">Wallet Status</h3>
      <div className="space-y-1 text-sm">
        <div>Connected: {status.connected ? '✅' : '❌'}</div>
        <div>Account: {status.account || 'Not connected'}</div>
        <div>Chain ID: {status.chainId || 'N/A'}</div>
        <div className="mt-2">
          <div className="font-semibold">Providers:</div>
          <div className="ml-2">
            MetaMask: {status.providers.metamask ? '✅' : '❌'}
          </div>
          <div className="ml-2">
            TON: {status.providers.ton ? '✅' : '❌'}
          </div>
          <div className="ml-2">
            OpenNetwork: {status.providers.openNetwork ? '✅' : '❌'}
          </div>
        </div>
        <div className="mt-2">
          <div className="font-semibold">DeFi:</div>
          <div className="ml-2">
            Chainlist: {status.defi.chainlist} chains
          </div>
          <div className="ml-2">
            ALLbridge: {status.defi.allbridge} chains
          </div>
          <div className="ml-2">
            Chainlink: {status.defi.chainlink} networks
          </div>
        </div>
      </div>
    </div>
  );
}
