// ============================================================
// DeVuelta — Demo Wallet Adapter
// Works without Apple/Google credentials
// ============================================================

import type { WalletService, WalletPassData, WalletPassResult, PassStatus } from './types';

const passStore = new Map<string, { data: WalletPassData; status: PassStatus }>();

export class DemoWalletAdapter implements WalletService {
  async createPass(data: WalletPassData): Promise<WalletPassResult> {
    passStore.set(data.serialNumber, { data, status: 'active' });

    return {
      success: true,
      serialNumber: data.serialNumber,
      platform: 'demo',
      // In demo mode, we use the internal pass view URL
      saveUrl: `/pass/${data.serialNumber}`,
    };
  }

  async updatePass(serialNumber: string, updates: Partial<WalletPassData>): Promise<void> {
    const existing = passStore.get(serialNumber);
    if (existing) {
      passStore.set(serialNumber, {
        ...existing,
        data: { ...existing.data, ...updates },
      });
    }
  }

  async revokePass(serialNumber: string): Promise<void> {
    const existing = passStore.get(serialNumber);
    if (existing) {
      passStore.set(serialNumber, { ...existing, status: 'revoked' });
    }
  }

  async getPassStatus(serialNumber: string): Promise<PassStatus> {
    const existing = passStore.get(serialNumber);
    return existing?.status ?? 'unknown';
  }
}
