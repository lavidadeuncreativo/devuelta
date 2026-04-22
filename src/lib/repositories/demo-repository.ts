import { useAppStore } from '../store';
import { 
  IProgramRepository, 
  ICustomerRepository, 
  IMembershipRepository, 
  IVisitRepository, 
  IRewardRepository, 
  IRedemptionRepository, 
  IAuditRepository,
  ILocationRepository
} from './base';
import { 
  LoyaltyProgram, 
  Customer, 
  Membership, 
  Visit, 
  Reward, 
  Redemption, 
  AuditLog,
  Location
} from '../types';

export class DemoProgramRepository implements IProgramRepository {
  async getAll() { return useAppStore.getState().programs; }
  async getById(id: string) { return useAppStore.getState().programs.find((p: LoyaltyProgram) => p.id === id) || null; }
  async getBySlug(slug: string) { return useAppStore.getState().programs.find((p: LoyaltyProgram) => p.slug === slug) || null; }
  async create(data: Omit<LoyaltyProgram, 'id' | 'createdAt' | 'updatedAt'>) {
    const store = useAppStore.getState();
    store.addProgram(data);
    const programs = useAppStore.getState().programs;
    return programs[programs.length - 1];
  }
  async update(id: string, updates: Partial<LoyaltyProgram>) {
    useAppStore.getState().updateProgram(id, updates);
    return (await this.getById(id))!;
  }
  async delete(id: string) { /* Not implemented for demo */ }
}

export class DemoCustomerRepository implements ICustomerRepository {
  async getAll() { return useAppStore.getState().customers; }
  async getById(id: string) { return useAppStore.getState().customers.find((c: Customer) => c.id === id) || null; }
  async getByContact(contact: string) { 
    return useAppStore.getState().customers.find((c: Customer) => c.email === contact || c.phone === contact) || null; 
  }
  async create(data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) {
    useAppStore.getState().addCustomer(data);
    const customers = useAppStore.getState().customers;
    return customers[customers.length - 1];
  }
  async update(id: string, updates: Partial<Customer>) {
    /* Need updateCustomer in store if we want real edits, but let's stick to base for now */
    return (await this.getById(id))!;
  }
  async search(query: string) {
    const q = query.toLowerCase();
    return useAppStore.getState().customers.filter((c: Customer) => 
      c.fullName.toLowerCase().includes(q) || 
      c.email?.toLowerCase().includes(q) || 
      c.phone?.includes(q)
    );
  }
}

export class DemoMembershipRepository implements IMembershipRepository {
  async getAll() { return useAppStore.getState().memberships; }
  async getById(id: string) { return useAppStore.getState().memberships.find((m: Membership) => m.id === id) || null; }
  async getBySerial(serial: string) { return useAppStore.getState().memberships.find((m: Membership) => m.passSerial === serial) || null; }
  async getByCustomer(customerId: string) { return useAppStore.getState().memberships.filter((m: Membership) => m.customerId === customerId); }
  async create(data: Omit<Membership, 'id' | 'enrolledAt'>) {
    useAppStore.getState().addMembership(data);
    const memberships = useAppStore.getState().memberships;
    return memberships[memberships.length - 1];
  }
  async update(id: string, updates: Partial<Membership>) {
    useAppStore.getState().updateMembership(id, updates);
    return (await this.getById(id))!;
  }
}

export class DemoVisitRepository implements IVisitRepository {
  async getByMembership(membershipId: string) { return useAppStore.getState().visits.filter((v: Visit) => v.membershipId === membershipId); }
  async create(data: Omit<Visit, 'id' | 'createdAt'>) {
    useAppStore.getState().addVisitRecord(data);
    const visits = useAppStore.getState().visits;
    return visits[visits.length - 1];
  }
}

export class DemoRewardRepository implements IRewardRepository {
  async getByMembership(membershipId: string) { return useAppStore.getState().rewards.filter((r: Reward) => r.membershipId === membershipId); }
  async create(data: Omit<Reward, 'id' | 'unlockedAt'>) {
    useAppStore.getState().addRewardRecord(data);
    const rewards = useAppStore.getState().rewards;
    return rewards[rewards.length - 1];
  }
  async update(id: string, updates: Partial<Reward>) {
    useAppStore.getState().updateRewardRecord(id, updates);
    const reward = useAppStore.getState().rewards.find((r: Reward) => r.id === id);
    return reward!;
  }
}

export class DemoRedemptionRepository implements IRedemptionRepository {
  async getByMembership(membershipId: string) { return useAppStore.getState().redemptions.filter((r: Redemption) => r.membershipId === membershipId); }
  async create(data: Omit<Redemption, 'id' | 'redeemedAt'>) {
    useAppStore.getState().addRedemptionRecord(data);
    const redemptions = useAppStore.getState().redemptions;
    return redemptions[redemptions.length - 1];
  }
}

export class DemoLocationRepository implements ILocationRepository {
  async getAll() { return useAppStore.getState().locations; }
  async create(data: Omit<Location, 'id' | 'createdAt'>) {
    useAppStore.getState().addLocation(data);
    const locations = useAppStore.getState().locations;
    return locations[locations.length - 1];
  }
  async update(id: string, updates: Partial<Location>) {
    /* Need updateLocation in store */
    return useAppStore.getState().locations.find((l: Location) => l.id === id)!;
  }
}

export class DemoAuditRepository implements IAuditRepository {
  async getLogs(businessId: string) { return useAppStore.getState().auditLogs.filter((l: AuditLog) => l.businessId === businessId); }
  async log(data: Omit<AuditLog, 'id' | 'createdAt'>) {
    useAppStore.getState().addAuditLog(data);
    const logs = useAppStore.getState().auditLogs;
    return logs[logs.length - 1];
  }
}
