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
  removeProgram: (id: string) => void;
  addCustomer: (customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => void;
  addMembership: (membership: Omit<Membership, 'id' | 'enrolledAt'>) => void;
  updateMembership: (id: string, updates: Partial<Membership>) => void;
  addVisitRecord: (visit: Omit<Visit, 'id' | 'createdAt'>) => void;
  addRewardRecord: (reward: Omit<Reward, 'id' | 'unlockedAt'>) => void;
  updateRewardRecord: (id: string, updates: Partial<Reward>) => void;
  addRedemptionRecord: (redemption: Omit<Redemption, 'id' | 'redeemedAt'>) => void;
  addLocation: (location: Omit<BranchLocation, 'id' | 'createdAt'>) => void;
  updateLocation: (id: string, updates: Partial<BranchLocation>) => void;
  removeLocation: (id: string) => void;
  addAuditLog: (log: Omit<AuditLog, 'id' | 'createdAt'>) => void;
  setUsers: (users: User[]) => void;
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  performSorteo: (programId: string) => Promise<{ winnerName: string; winnerId: string } | null>;
  resetDemoData: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
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

      setBusiness: (business: Business) => set({ business }),

      updateProgram: (id: string, updates: Partial<LoyaltyProgram>) => set((state: AppState) => ({
        programs: state.programs.map((p: LoyaltyProgram) => (p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p))
      })),

      addProgram: (data: Omit<LoyaltyProgram, 'id' | 'createdAt' | 'updatedAt'>) => set((state: AppState) => ({
        programs: [...state.programs, {
          ...data,
          id: `prg_${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }]
      })),
      
      removeProgram: (id: string) => set((state: AppState) => ({
        programs: state.programs.filter((p: LoyaltyProgram) => p.id !== id)
      })),

      addCustomer: (data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => set((state: AppState) => ({
        customers: [...state.customers, {
          ...data,
          id: `cus_${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }]
      })),

      addMembership: (data: Omit<Membership, 'id' | 'enrolledAt'>) => set((state: AppState) => ({
        memberships: [...state.memberships, {
          ...data,
          id: `mem_${Date.now()}`,
          enrolledAt: new Date().toISOString()
        }]
      })),

      updateMembership: (id: string, updates: Partial<Membership>) => set((state: AppState) => ({
        memberships: state.memberships.map((m: Membership) => (m.id === id ? { ...m, ...updates } : m))
      })),

      addVisitRecord: (data: Omit<Visit, 'id' | 'createdAt'>) => set((state: AppState) => ({
        visits: [...state.visits, { ...data, id: `vst_${Date.now()}`, createdAt: new Date().toISOString() }]
      })),

      addRewardRecord: (data: Omit<Reward, 'id' | 'unlockedAt'>) => set((state: AppState) => ({
        rewards: [...state.rewards, { ...data, id: `rwd_${Date.now()}`, unlockedAt: new Date().toISOString() }]
      })),

      updateRewardRecord: (id: string, updates: Partial<Reward>) => set((state: AppState) => ({
        rewards: state.rewards.map((r: Reward) => (r.id === id ? { ...r, ...updates } : r))
      })),

      addRedemptionRecord: (data: Omit<Redemption, 'id' | 'redeemedAt'>) => set((state: AppState) => ({
        redemptions: [...state.redemptions, { ...data, id: `rdm_${Date.now()}`, redeemedAt: new Date().toISOString() }]
      })),

      addLocation: (data: Omit<BranchLocation, 'id' | 'createdAt'>) => set((state: AppState) => ({
        locations: [...state.locations, {
          ...data,
          id: `loc_${Date.now()}`,
          createdAt: new Date().toISOString()
        }]
      })),

      updateLocation: (id: string, updates: Partial<BranchLocation>) => set((state: AppState) => ({
        locations: state.locations.map((l: BranchLocation) => (l.id === id ? { ...l, ...updates } : l))
      })),

      removeLocation: (id: string) => set((state: AppState) => ({
        locations: state.locations.filter((l: BranchLocation) => l.id !== id)
      })),

      addAuditLog: (data: Omit<AuditLog, 'id' | 'createdAt'>) => set((state: AppState) => ({
        auditLogs: [...state.auditLogs, { ...data, id: `log_${Date.now()}`, createdAt: new Date().toISOString() }]
      })),
      
      setUsers: (users: User[]) => set({ users }),
      
      addUser: (data: Omit<User, 'id' | 'createdAt'>) => set((state: AppState) => ({
        users: [...state.users, { ...data, id: `usr_${Date.now()}`, createdAt: new Date().toISOString() }]
      })),

      performSorteo: async (programId: string) => {
        const state = get();
        const program = state.programs.find((p: LoyaltyProgram) => p.id === programId);
        if (!program || program.dynamicType !== 'giveaway') return null;

        const memberships = state.memberships.filter((m: Membership) => m.programId === programId && m.currentVisits > 0);
        if (memberships.length === 0) return null;

        // Weighted pool
        const pool: string[] = [];
        memberships.forEach((m: Membership) => {
          for (let i = 0; i < m.currentVisits; i++) {
            pool.push(m.customerId);
          }
        });

        const winnerId = pool[Math.floor(Math.random() * pool.length)];
        const winner = state.customers.find((c: Customer) => c.id === winnerId);

        if (winner && winner.phone) {
          const { WhatsAppService } = await import('./services/whatsapp-service');
          WhatsAppService.sendWinnerNotification(
            winner.phone,
            winner.fullName,
            program.rewardDetail,
            program.name
          ).catch(console.error);
        }

        return winner ? { winnerName: winner.fullName, winnerId: winner.id } : null;
      },

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
