import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LoyaltyProgram, Customer, Membership, Location as BranchLocation } from './types';
import { 
  demoPrograms, 
  demoCustomers, 
  demoMemberships, 
  demoLocations 
} from './demo/data';

interface AppState {
  programs: LoyaltyProgram[];
  customers: Customer[];
  memberships: Membership[];
  locations: BranchLocation[];

  addProgram: (program: Omit<LoyaltyProgram, 'id' | 'createdAt' | 'updatedAt'>) => void;
  addCustomer: (customer: Omit<Customer, 'id' | 'joinedAt'>) => void;
  addMembership: (membership: Omit<Membership, 'id' | 'enrolledAt' | 'lastVisitAt'>) => void;
  addVisit: (membershipId: string, visitsToAdd?: number) => void;
  addLocation: (location: Omit<BranchLocation, 'id' | 'createdAt'>) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      programs: demoPrograms,
      customers: demoCustomers,
      memberships: demoMemberships,
      locations: demoLocations,

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
          joinedAt: new Date().toISOString()
        }]
      })),

      addMembership: (data) => set((state) => ({
        memberships: [...state.memberships, {
          ...data,
          id: `mem_${Date.now()}`,
          enrolledAt: new Date().toISOString(),
          lastVisitAt: new Date().toISOString()
        }]
      })),

      addVisit: (membershipId, visitsToAdd = 1) => set((state) => ({
        memberships: state.memberships.map((m) => {
          if (m.id === membershipId) {
            return {
              ...m,
              totalVisits: m.totalVisits + visitsToAdd,
              lastVisitAt: new Date().toISOString()
            };
          }
          return m;
        })
      })),

      addLocation: (data) => set((state) => ({
        locations: [...state.locations, {
          ...data,
          id: `loc_${Date.now()}`,
          createdAt: new Date().toISOString()
        }]
      }))
    }),
    {
      name: 'devuelta-demo-storage',
    }
  )
);
