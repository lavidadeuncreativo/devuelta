// ============================================================
// DeVuelta — Core Domain Types
// ============================================================

export type BusinessType =
  | 'cafeteria'
  | 'barberia'
  | 'spa'
  | 'restaurante'
  | 'panaderia'
  | 'fitness'
  | 'tienda'
  | 'veterinaria'
  | 'estudio_tatuaje'
  | 'otro';

export type SubscriptionStatus = 'trial' | 'active' | 'past_due' | 'cancelled';
export type UserRole = 'superadmin' | 'business_admin' | 'staff';
export type ProgramType = 'visits' | 'points' | 'fixed_reward';
export type ProgramStatus = 'draft' | 'active' | 'paused' | 'archived';
export type EnrollmentMode = 'open' | 'invite' | 'link_only';
export type MembershipStatus = 'active' | 'completed' | 'expired';
export type VisitType = 'visit' | 'points' | 'manual';
export type PointTransactionType = 'earn' | 'redeem' | 'adjust' | 'expire';
export type RewardStatus = 'available' | 'redeemed' | 'expired';
export type WalletPlatform = 'none' | 'apple' | 'google';

export interface Business {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  primaryColor: string;
  secondaryColor?: string;
  businessType: BusinessType;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  timezone: string;
  currency: string;
  locale: string;
  subscriptionStatus: SubscriptionStatus;
  trialEndsAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Location {
  id: string;
  businessId: string;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: UserRole;
  businessId: string;
  locationId?: string;
  isActive: boolean;
  createdAt: string;
}

export interface LoyaltyProgram {
  id: string;
  businessId: string;
  name: string;
  description?: string;
  slug: string;
  programType: ProgramType;
  status: ProgramStatus;
  goalValue: number;
  rewardType: string;
  rewardDetail: string;
  pointsPerUnit?: number;
  enrollmentMode: EnrollmentMode;
  visitCooldownMinutes: number;
  allowMultipleRewards: boolean;
  terms?: string;
  welcomeMessage?: string;
  isActive: boolean;
  startsAt?: string;
  expiresAt?: string;
  passBgColor: string;
  passTextColor: string;
  passLogoUrl?: string;
  passStampIcon?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  businessId: string;
  fullName: string;
  email?: string;
  phone?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Membership {
  id: string;
  customerId: string;
  programId: string;
  businessId: string;
  currentVisits: number;
  currentPoints: number;
  totalVisits: number;
  totalPoints: number;
  rewardsEarned: number;
  rewardsRedeemed: number;
  status: MembershipStatus;
  passSerial: string;
  walletPlatform: WalletPlatform;
  passLastSyncedAt?: string;
  enrolledAt: string;
  lastVisitAt?: string;
}

export interface Visit {
  id: string;
  membershipId: string;
  locationId: string;
  recordedBy: string;
  visitType: VisitType;
  pointsAdded: number;
  amountSpent?: number;
  idempotencyKey: string;
  notes?: string;
  createdAt: string;
}

export interface PointTransaction {
  id: string;
  membershipId: string;
  type: PointTransactionType;
  points: number;
  balanceAfter: number;
  description?: string;
  referenceId?: string;
  createdAt: string;
}

export interface Reward {
  id: string;
  membershipId: string;
  programId: string;
  status: RewardStatus;
  unlockedAt: string;
  expiresAt?: string;
}

export interface Redemption {
  id: string;
  rewardId: string;
  membershipId: string;
  locationId: string;
  redeemedBy: string;
  notes?: string;
  redeemedAt: string;
}

export interface AuditLog {
  id: string;
  businessId: string;
  userId: string;
  action: string;
  entityType?: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

// Joined / enriched types for UI
export interface MembershipWithDetails extends Membership {
  customer: Customer;
  program: LoyaltyProgram;
  rewards: Reward[];
}

export interface CustomerWithMemberships extends Customer {
  memberships: MembershipWithDetails[];
}

export interface ProgramWithStats extends LoyaltyProgram {
  totalMembers: number;
  totalVisits: number;
  totalRedemptions: number;
  activeMembers: number;
}

export interface DashboardStats {
  totalCustomers: number;
  activePasses: number;
  totalVisits: number;
  rewardsRedeemed: number;
  returnRate: number;
  activationRate: number;
}

export interface ActivityItem {
  id: string;
  type: 'visit' | 'enrollment' | 'reward_unlocked' | 'redemption';
  customerName: string;
  programName: string;
  locationName?: string;
  detail: string;
  timestamp: string;
}

// Program templates
export interface ProgramTemplate {
  businessType: BusinessType;
  name: string;
  description: string;
  programType: ProgramType;
  goalValue: number;
  rewardType: string;
  rewardDetail: string;
  passBgColor: string;
  passTextColor: string;
  icon: string;
  welcomeMessage: string;
}
