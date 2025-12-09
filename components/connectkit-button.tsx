'use client';

import { ConnectKitButton } from 'connectkit';

/**
 * ConnectKit Wallet Connection Button
 * Supports multiple wallets: MetaMask, WalletConnect, Coinbase, etc.
 * Based on TreasureProject web3-starter-template
 */
export function WalletConnectButton() {
  return (
    <div className="flex items-center justify-center">
      <ConnectKitButton />
    </div>
  );
}
