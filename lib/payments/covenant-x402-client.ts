/**
 * Covenant x402 Payment Client
 * Client-side payment handling using covenant addresses
 * Based on TreasureProject x402-fetch
 */

import { COVENANT_PAYMENT_CONFIG } from './covenant-x402-config';
import { COVENANT_DATA } from '@/lib/covenant-data';

import { x402Fetch } from 'x402-fetch';

/**
 * Fetch oracle query with payment
 */
export async function fetchOracleQuery(
  guardianPath?: number,
  guardianAddress?: string,
  account?: { address: string }
) {
  if (!account?.address) {
    throw new Error('Wallet account required for payment');
  }

  const params = new URLSearchParams();
  if (guardianPath) params.set('guardianPath', guardianPath.toString());
  if (guardianAddress) params.set('guardianAddress', guardianAddress);

  // x402 payment-protected fetch - payments go to covenant address
  const response = await x402Fetch(`/api/oracle/query?${params}`, {
    account,
  });
  return response.json();
}

/**
 * Fetch covenant data with payment
 */
export async function fetchCovenantData(
  type: 'constants' | 'guardians' | 'addresses' | 'oracle' | 'contracts' | 'all' = 'all',
  guardianPath?: number,
  account?: { address: string }
) {
  if (!account?.address) {
    throw new Error('Wallet account required for payment');
  }

  const params = new URLSearchParams({ type });
  if (guardianPath) params.set('guardianPath', guardianPath.toString());

  // x402 payment-protected fetch - payments go to covenant address
  const response = await x402Fetch(`/api/covenant/data?${params}`, {
    account,
  });
  return response.json();
}

/**
 * Get payment info for a resource
 */
export function getPaymentInfo(resource: string) {
  return {
    recipient: COVENANT_PAYMENT_CONFIG.primaryRecipient,
    amount: COVENANT_PAYMENT_CONFIG.resources[resource as keyof typeof COVENANT_PAYMENT_CONFIG.resources] || '$0.001',
    covenantAddress: COVENANT_DATA.covenantAddresses.find((addr) => addr.official),
  };
}

/**
 * Get guardian payment recipient
 */
export function getGuardianPaymentInfo(guardianPath: number) {
  const guardian = COVENANT_DATA.guardians.find((g) => g.path === guardianPath);
  return {
    recipient: guardian?.address || COVENANT_PAYMENT_CONFIG.primaryRecipient,
    amount: COVENANT_PAYMENT_CONFIG.resources['/api/guardian'],
    guardian: guardian ? {
      path: guardian.path,
      hebrew: guardian.hebrew,
      address: guardian.address,
    } : null,
  };
}
