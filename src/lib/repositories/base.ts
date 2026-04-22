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

export interface IProgramRepository {
  getAll(): Promise<LoyaltyProgram[]>;
  getById(id: string): Promise<LoyaltyProgram | null>;
  getBySlug(slug: string): Promise<LoyaltyProgram | null>;
  create(program: Omit<LoyaltyProgram, 'id' | 'createdAt' | 'updatedAt'>): Promise<LoyaltyProgram>;
  update(id: string, updates: Partial<LoyaltyProgram>): Promise<LoyaltyProgram>;
  delete(id: string): Promise<void>;
}

export interface ICustomerRepository {
  getAll(): Promise<Customer[]>;
  getById(id: string): Promise<Customer | null>;
  getByContact(contact: string): Promise<Customer | null>;
  create(customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Promise<Customer>;
  update(id: string, updates: Partial<Customer>): Promise<Customer>;
  search(query: string): Promise<Customer[]>;
}

export interface IMembershipRepository {
  getAll(): Promise<Membership[]>;
  getById(id: string): Promise<Membership | null>;
  getBySerial(serial: string): Promise<Membership | null>;
  getByCustomer(customerId: string): Promise<Membership[]>;
  getByProgramId?(programId: string): Promise<Membership[]>;
  create(membership: Omit<Membership, 'id' | 'enrolledAt'>): Promise<Membership>;
  update(id: string, updates: Partial<Membership>): Promise<Membership>;
}

export interface IVisitRepository {
  getByMembership(membershipId: string): Promise<Visit[]>;
  create(visit: Omit<Visit, 'id' | 'createdAt'>): Promise<Visit>;
}

export interface IRewardRepository {
  getByMembership(membershipId: string): Promise<Reward[]>;
  create(reward: Omit<Reward, 'id' | 'unlockedAt'>): Promise<Reward>;
  update(id: string, updates: Partial<Reward>): Promise<Reward>;
}

export interface IRedemptionRepository {
  getByMembership(membershipId: string): Promise<Redemption[]>;
  create(redemption: Omit<Redemption, 'id' | 'redeemedAt'>): Promise<Redemption>;
}

export interface ILocationRepository {
  getAll(): Promise<Location[]>;
  create(location: Omit<Location, 'id' | 'createdAt'>): Promise<Location>;
  update(id: string, updates: Partial<Location>): Promise<Location>;
}

export interface IAuditRepository {
  getLogs(businessId: string): Promise<AuditLog[]>;
  log(entry: Omit<AuditLog, 'id' | 'createdAt'>): Promise<AuditLog>;
}
