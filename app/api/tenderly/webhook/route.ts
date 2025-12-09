import { NextRequest, NextResponse } from 'next/server';

/**
 * Tenderly Webhook Handler
 * Webhook ID: ad800d90-a387-4f79-8b9a-74b6a85bc847
 * 
 * This endpoint receives webhook events from Tenderly
 * Documentation: https://docs.tenderly.co/node/integrations-chain-interaction/ethers
 */

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Log webhook event
    console.log('Tenderly webhook received:', {
      timestamp: new Date().toISOString(),
      event: body,
    });

    // Process webhook based on event type
    const eventType = body.type || body.event || 'unknown';
    
    switch (eventType) {
      case 'transaction':
        // Handle transaction event
        await handleTransactionEvent(body);
        break;
      case 'block':
        // Handle block event
        await handleBlockEvent(body);
        break;
      case 'contract':
        // Handle contract event
        await handleContractEvent(body);
        break;
      default:
        console.log('Unknown webhook event type:', eventType);
    }

    return NextResponse.json({
      success: true,
      message: 'Webhook received',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Tenderly webhook error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'active',
    webhookId: 'ad800d90-a387-4f79-8b9a-74b6a85bc847',
    endpoint: '/api/tenderly/webhook',
    documentation: 'https://docs.tenderly.co/node/integrations-chain-interaction/ethers',
  });
}

async function handleTransactionEvent(data: any) {
  console.log('Transaction event:', {
    hash: data.hash || data.transaction_hash,
    from: data.from,
    to: data.to,
    value: data.value,
  });
  // Add custom transaction handling logic here
}

async function handleBlockEvent(data: any) {
  console.log('Block event:', {
    number: data.number || data.block_number,
    hash: data.hash || data.block_hash,
    timestamp: data.timestamp,
  });
  // Add custom block handling logic here
}

async function handleContractEvent(data: any) {
  console.log('Contract event:', {
    address: data.address || data.contract_address,
    event: data.event_name,
    logs: data.logs,
  });
  // Add custom contract event handling logic here
}
