import { NextRequest, NextResponse } from 'next/server';
import { TelegramBotSystem } from '@/lib/telegram-bot';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message || !message.text) {
      return NextResponse.json({ ok: false, error: 'Invalid message' });
    }

    const chatId = message.chat.id.toString();
    const text = message.text;
    const command = text.split(' ')[0];

    const botSystem = new TelegramBotSystem(process.env.TELEGRAM_BOT_TOKEN);
    const response = await botSystem.handleCommand(command, chatId);

    // Send response back to Telegram
    await botSystem.sendMessage(chatId, response);

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error('Telegram webhook error:', error);
    return NextResponse.json({ ok: false, error: error.message });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Telegram Bot Webhook',
    status: 'active',
    commands: [
      '/deploy-covenant',
      '/deploy-build',
      '/deploy-cloudflare',
      '/deploy-guardians',
      '/deploy-all',
      '/status',
      '/collect-tools',
      '/activate-bots',
    ],
  });
}
