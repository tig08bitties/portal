/**
 * Covenant Data API Route - Covenant Foundation
 * Payment-protected endpoint for accessing covenant data
 * Uses covenant constants for pricing
 */

import { NextRequest, NextResponse } from 'next/server';
import { COVENANT_DATA } from '@/lib/covenant-data';
import { COVENANT_PAYMENT_CONFIG } from '@/lib/payments/covenant-x402-config';
import { paymentMiddleware } from 'x402-next';
import { auto } from '@swader/x402facilitators';
import type { Address } from 'viem';

/**
 * Covenant Data Handler
 * Returns covenant data based on query parameters
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type'); // 'constants', 'guardians', 'addresses', 'oracle', 'all'
    const guardianPath = searchParams.get('guardianPath');

    // x402 payment middleware - payments go to covenant address
    const handler = paymentMiddleware(
      COVENANT_PAYMENT_CONFIG.primaryRecipient as Address,
      { '/api/covenant/data': COVENANT_PAYMENT_CONFIG.resources['/api/covenant'] },
      auto
    );

    // Return data based on type
    switch (type) {
      case 'constants':
        return NextResponse.json({
          constants: COVENANT_DATA.constants,
          paymentInfo: {
            recipient: COVENANT_PAYMENT_CONFIG.primaryRecipient,
            amount: COVENANT_PAYMENT_CONFIG.resources['/api/covenant'],
          },
        });

      case 'guardians':
        if (guardianPath) {
          const guardian = COVENANT_DATA.guardians.find(
            (g) => g.path === Number(guardianPath)
          );
          if (!guardian) {
            return NextResponse.json(
              { error: 'Guardian not found' },
              { status: 404 }
            );
          }
          return NextResponse.json({
            guardian,
            paymentInfo: {
              recipient: guardian.address,
              amount: COVENANT_PAYMENT_CONFIG.resources['/api/guardian'],
            },
          });
        }
        return NextResponse.json({
          guardians: COVENANT_DATA.guardians,
          total: COVENANT_DATA.guardians.length,
          registered: COVENANT_DATA.guardians.filter((g) => g.isRegistered).length,
          paymentInfo: {
            recipient: COVENANT_PAYMENT_CONFIG.primaryRecipient,
            amount: COVENANT_PAYMENT_CONFIG.resources['/api/covenant'],
          },
        });

      case 'addresses':
        return NextResponse.json({
          addresses: COVENANT_DATA.covenantAddresses,
          paymentInfo: {
            recipient: COVENANT_PAYMENT_CONFIG.primaryRecipient,
            amount: COVENANT_PAYMENT_CONFIG.resources['/api/covenant'],
          },
        });

      case 'oracle':
        return NextResponse.json({
          oracle: COVENANT_DATA.oracle,
          paymentInfo: {
            recipient: COVENANT_PAYMENT_CONFIG.primaryRecipient,
            amount: COVENANT_PAYMENT_CONFIG.resources['/api/oracle/query'],
          },
        });

      case 'contracts':
        return NextResponse.json({
          bridgeworldContracts: COVENANT_DATA.bridgeworldContracts,
          paymentInfo: {
            recipient: COVENANT_PAYMENT_CONFIG.primaryRecipient,
            amount: COVENANT_PAYMENT_CONFIG.resources['/api/covenant'],
          },
        });

      case 'all':
      default:
        return NextResponse.json({
          ...COVENANT_DATA,
          paymentInfo: {
            recipient: COVENANT_PAYMENT_CONFIG.primaryRecipient,
            amount: COVENANT_PAYMENT_CONFIG.resources['/api/covenant'],
            note: 'Complete covenant data access',
          },
        });
    }
  } catch (error) {
    console.error('Covenant data error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve covenant data' },
      { status: 500 }
    );
  }
}
