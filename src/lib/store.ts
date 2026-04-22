import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  LoyaltyProgram, 
  Customer, 
  Membership, 
  Location as BranchLocation,
  Business,
  Visit,
  Reward,
  Redemption,
  AuditLog,
  User
} from './types';
import { 
  demoPrograms, 
  demoCustomers, 
  demoMemberships, 
  demoLocations,
  demoBusiness,
  demoUsers
} from './demo/data';

interface AppState {
  business: Business | null;
  programs: LoyaltyProgram[];
  customers: Customer[];
  memberships: Membership[];
  locations: BranchLocation[];
  visits: Visit[];
  rewards: Reward[];
  redemptions: Redemption[];
  auditLogs: AuditLog[];
  users: User[];

  // For Demo/Dev
  settings: {
    isDemo: boolean;
    useLocalOnly: boolean;
  };

  // Actions (Generic)
  setBusiness: (business: Business) => void;
  updateProgram: (id: string, updates: Partial<LoyaltyProgram>) => void;
  addProgram: (program: Omit<LoyaltyProgram, 'id' | 'createdAt' | 'updatedAt'>) => void;
  addCustomer: (customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => void;
  addMembership: (membership: Omit<Membership, 'id' | 'enrolledAt'>) => void;
  updateMembership: (id: string, updates: Partial<Membership>) => void;
  addVisitRecord: (visit: Omit<Visit, 'id' | 'createdAt'>) => void;
  addRewardRecord: (reward: Omit<Reward, 'id' | 'unlockedAt'>) => void;
  updateRewardRecord: (id: string, updates: Partial<Reward>) => void;
  addRedemptionRecord: (redemption: Omit<Redemption, 'id' | 'redeemedAt'>) => void;
  addLocation: (location: Omit<BranchLocation, 'id' | 'createdAt'>) => void;
  addAuditLog: (log: Omit<AuditLog, 'id' | 'createdAt'>) => void;
  setUsers: (users: User[]) => void;
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  resetDemoData: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      business: demoBusiness,
      programs: demoPrograms,
      customers: demoCustomers,
      memberships: demoMemberships,
      locations: demoLocations,
      visits: [],
      rewards: [],
      redemptions: [],
      auditLogs: [],
      users: demoUsers,
      settings: {
        isDemo: true,
        useLocalOnly: true,
      },

      setBusiness: (business) => set({ business }),

      updateProgram: (id, updates) => set((state) => ({
        programs: state.programs.map((p) => (p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p))
      })),

      addProgram: (data) => set((state) => ({
        programs: [...state.programs, {
          ...data,
          id: `prg_${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }]
      })),

      addCustomer: (data) => set((state) => ({
        customers: [...state.customers, {
          ...data,
          id: `cus_${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }]
      })),

      addMembership: (data) => set((state) => ({
        memberships: [...state.memberships, {
          ...data,
          id: `mem_${Date.now()}`,
          enrolledAt: new Date().toISOString()
        }]
      })),

      updateMembership: (id, updates) => set((state) => ({
        memberships: state.memberships.map((m) => (m.id === id ? { ...m, ...updates } : m))
      })),

      addVisitRecord: (data) => set((state) => ({
        visits: [...state.visits, { ...data, id: `vst_${Date.now()}`, createdAt: new Date().toISOString() }]
      })),

      addRewardRecord: (data) => set((state) => ({
        rewards: [...state.rewards, { ...data, id: `rwd_${Date.now()}`, unlockedAt: new Date().toISOString() }]
      })),

      updateRewardRecord: (id, updates) => set((state) => ({
        rewards: state.rewards.map((r) => (r.id === id ? { ...r, ...updates } : r))
      })),

      addRedemptionRecord: (data) => set((state) => ({
        redemptions: [...state.redemptions, { ...data, id: `rdm_${Date.now()}`, redeemedAt: new Date().toISOString() }]
      })),

      addLocation: (data) => set((state) => ({
        locations: [...state.locations, {
          ...data,
          id: `loc_${Date.now()}`,
          createdAt: new Date().toISOString()
        }]
      })),

      addAuditLog: (data) => set((state) => ({
        auditLogs: [...state.auditLogs, { ...data, id: `log_${Date.now()}`, createdAt: new Date().toISOString() }]
      })),
      
      setUsers: (users) => set({ users }),
      
      addUser: (data) => set((state) => ({
        users: [...state.users, { ...data, id: `usr_${Date.now()}`, createdAt: new Date().toISOString() }]
      })),

      resetDemoData: () => set({
        business: demoBusiness,
        programs: demoPrograms,
        customers: demoCustomers,
        memberships: demoMemberships,
        locations: demoLocations,
        visits: [],
        rewards: [],
        redemptions: [],
        auditLogs: [],
        users: demoUsers
      })
    }),
    {
      name: 'devuelta-demo-storage',
    }
  )
);
