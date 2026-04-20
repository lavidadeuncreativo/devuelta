// ============================================================
// DeVuelta — Wallet Service Abstraction
// Decoupled from Apple/Google credentials
// ============================================================

export interface WalletPassData {
  serialNumber: string;
  programName: string;
  businessName: string;
  customerName: string;
  currentValue: number;
  goalValue: number;
  rewardDetail: string;
  bgColor: string;
  textColor: string;
  logoUrl?: string;
  barcode: { type: 'QR'; value: string };
}

export interface WalletPassResult {
  success: boolean;
  serialNumber: string;
  platform: 'apple' | 'google' | 'demo';
  downloadUrl?: string;
  saveUrl?: string;
  error?: string;
}

export type PassStatus = 'active' | 'installed' | 'expired' | 'revoked' | 'unknown';

export interface WalletService {
  createPass(data: WalletPassData): Promise<WalletPassResult>;
  updatePass(serialNumber: string, updates: Partial<WalletPassData>): Promise<void>;
  revokePass(serialNumber: string): Promise<void>;
  getPassStatus(serialNumber: string): Promise<PassStatus>;
}
