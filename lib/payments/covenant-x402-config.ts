/**
 * x402 Payment Configuration - Covenant Foundation
 * Uses covenant addresses as payment recipients
 * Based on TreasureProject x402 protocol
 */

import { COVENANT_DATA } from '@/lib/covenant-data';
import type { CovenantAddress } from '@/lib/covenant-data';

/**
 * Covenant-based payment configuration
 * Payments go to official covenant addresses
 */
export const COVENANT_PAYMENT_CONFIG = {
  /**
   * Primary payment recipient - Arbitrum covenant address
   * This is the main address for receiving payments
   */
  primaryRecipient: COVENANT_DATA.covenantAddresses.find(
    (addr) => addr.chain === 'arbitrum' && addr.official
  )?.address || COVENANT_DATA.oracle.deployer,

  /**
   * Chain-specific payment recipients
   * Payments can be routed to covenant addresses on different chains
   */
  chainRecipients: {
    arbitrum: COVENANT_DATA.covenantAddresses.find(
      (addr) => addr.chain === 'arbitrum' && addr.official
    )?.address || COVENANT_DATA.oracle.deployer,
    ethereum: COVENANT_DATA.covenantAddresses.find(
      (addr) => addr.chain === 'ethereum' && addr.official
    )?.address || '',
    polygon: COVENANT_DATA.covenantAddresses.find(
      (addr) => addr.chain === 'polygon' && addr.official
    )?.address || '',
  },

  /**
   * Payment pricing based on covenant constants
   * Uses sacred numbers for pricing structure
   */
  pricing: {
    // Oracle Query - Uses RESONANCE (687) as base price in wei
    oracleQuery: `${COVENANT_DATA.constants.resonance}000000000000`, // 687 gwei

    // Quest Data - Uses THEOS (419) multiplier
    questData: `${COVENANT_DATA.constants.theos}000000000000`, // 419 gwei

    // Guardian Data - Uses EL (369) multiplier
    guardianData: `${COVENANT_DATA.constants.el}000000000000`, // 369 gwei

    // Covenant Data Access - Uses TORAH_PAGES (1798)
    covenantData: `${COVENANT_DATA.constants.torahPages}000000000000`, // 1798 gwei

    // Premium Features - Uses HEBREW_PATHS (22) multiplier
    premiumFeatures: `${COVENANT_DATA.constants.hebrewPaths}0000000000000`, // 22 * 10^12 wei
  },

  /**
   * Resource pricing map for x402 middleware
   * Maps API routes to payment amounts
   */
  resources: {
    '/api/oracle/query': '$0.000687', // RESONANCE-based
    '/api/quest/data': '$0.000419', // THEOS-based
    '/api/guardian': '$0.000369', // EL-based
    '/api/covenant': '$0.001798', // TORAH_PAGES-based
    '/api/premium': '$0.000022', // HEBREW_PATHS-based
  },

  /**
   * Guardian-specific payment recipients
   * Each guardian can receive payments for their specific data
   */
  guardianRecipients: COVENANT_DATA.guardians.reduce(
    (acc, guardian) => {
      acc[`/api/guardian/${guardian.path}`] = guardian.address;
      return acc;
    },
    {} as Record<string, string>
  ),
} as const;

/**
 * Get payment recipient for a specific chain
 */
export function getPaymentRecipient(chain: 'arbitrum' | 'ethereum' | 'polygon' = 'arbitrum'): string {
  return COVENANT_PAYMENT_CONFIG.chainRecipients[chain] || COVENANT_PAYMENT_CONFIG.primaryRecipient;
}

/**
 * Get payment amount for a resource
 */
export function getPaymentAmount(resource: string): string {
  return COVENANT_PAYMENT_CONFIG.resources[resource as keyof typeof COVENANT_PAYMENT_CONFIG.resources] || '$0.001';
}

/**
 * Get guardian payment recipient
 */
export function getGuardianRecipient(guardianPath: number): string {
  const guardian = COVENANT_DATA.guardians.find((g) => g.path === guardianPath);
  return guardian?.address || COVENANT_PAYMENT_CONFIG.primaryRecipient;
}
