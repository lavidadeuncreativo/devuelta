// ============================================================
// DeVuelta — Wallet Service Factory
// Selects adapter based on environment configuration
// ============================================================

import type { WalletService } from './types';
import { DemoWalletAdapter } from './demo-adapter';

export function createWalletService(): WalletService {
  const appleConfigured = !!(
    process.env.APPLE_WALLET_PASS_TYPE_ID &&
    process.env.APPLE_WALLET_TEAM_ID &&
    process.env.APPLE_WALLET_CERT_PATH
  );

  const googleConfigured = !!(
    process.env.GOOGLE_WALLET_ISSUER_ID &&
    process.env.GOOGLE_WALLET_SERVICE_ACCOUNT_KEY
  );

  if (appleConfigured) {
    // Future: import and return AppleWalletAdapter
    console.log('[Wallet] Apple Wallet credentials detected — using Apple adapter');
  }

  if (googleConfigured) {
    // Future: import and return GoogleWalletAdapter
    console.log('[Wallet] Google Wallet credentials detected — using Google adapter');
  }

  console.log('[Wallet] No wallet credentials configured — using demo adapter');
  return new DemoWalletAdapter();
}

export type { WalletService, WalletPassData, WalletPassResult, PassStatus } from './types';
