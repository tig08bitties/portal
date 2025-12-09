/**
 * Oracle Query API Route - Covenant Foundation
 * Payment-protected endpoint using x402 protocol
 * Uses covenant oracle contract address
 */

import { NextRequest, NextResponse } from 'next/server';
import { COVENANT_DATA } from '@/lib/covenant-data';
import { COVENANT_PAYMENT_CONFIG } from '@/lib/payments/covenant-x402-config';
import { paymentMiddleware } from 'x402-next';
import { auto } from '@swader/x402facilitators';

/**
 * Oracle Query Handler
 * Returns oracle contract information and allows querying guardian registration
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const guardianPath = searchParams.get('guardianPath');
    const guardianAddress = searchParams.get('guardianAddress');

    // x402 payment middleware - payments go to covenant address
    const handler = paymentMiddleware(
      COVENANT_PAYMENT_CONFIG.primaryRecipient,
      { '/api/oracle/query': COVENANT_PAYMENT_CONFIG.resources['/api/oracle/query'] },
      auto
    );

    // Oracle contract information
    const oracleInfo = {
      address: COVENANT_DATA.oracle.address,
      network: COVENANT_DATA.oracle.network,
      chainId: COVENANT_DATA.oracle.chainId,
      explorer: COVENANT_DATA.oracle.explorer,
      deployer: COVENANT_DATA.oracle.deployer,
      block: COVENANT_DATA.oracle.block,
    };

    // If querying specific guardian
    if (guardianPath || guardianAddress) {
      const guardian = guardianPath
        ? COVENANT_DATA.guardians.find((g) => g.path === Number(guardianPath))
        : COVENANT_DATA.guardians.find((g) => g.address.toLowerCase() === guardianAddress?.toLowerCase());

      if (!guardian) {
        return NextResponse.json(
          { error: 'Guardian not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        oracle: oracleInfo,
        guardian: {
          path: guardian.path,
          hebrew: guardian.hebrew,
          address: guardian.address,
          isRegistered: guardian.isRegistered,
          bridgeworldMapping: guardian.bridgeworldMapping,
          questMultiplier: guardian.questMultiplier,
          harvesterBoost: guardian.harvesterBoost,
        },
        paymentInfo: {
          recipient: COVENANT_PAYMENT_CONFIG.primaryRecipient,
          amount: COVENANT_PAYMENT_CONFIG.resources['/api/oracle/query'],
          guardianRecipient: guardian.address,
        },
      });
    }

    // Return general oracle information
    return NextResponse.json({
      oracle: oracleInfo,
      guardians: {
        total: COVENANT_DATA.guardians.length,
        registered: COVENANT_DATA.guardians.filter((g) => g.isRegistered).length,
        paths: COVENANT_DATA.guardians.map((g) => ({
          path: g.path,
          hebrew: g.hebrew,
          address: g.address,
          isRegistered: g.isRegistered,
        })),
      },
      paymentInfo: {
        recipient: COVENANT_PAYMENT_CONFIG.primaryRecipient,
        amount: COVENANT_PAYMENT_CONFIG.resources['/api/oracle/query'],
      },
    });
  } catch (error) {
    console.error('Oracle query error:', error);
    return NextResponse.json(
      { error: 'Failed to query oracle' },
      { status: 500 }
    );
  }
}
