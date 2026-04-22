// ============================================================
// DeVuelta — Comprehensive Demo Data
// Realistic seed for demo-ready product presentation
// ============================================================

import type {
  Business, Location, User, LoyaltyProgram, Customer,
  Membership, Visit, Reward, Redemption, ActivityItem,
  DashboardStats, ProgramWithStats,
} from '@/lib/types';

// ── Business ──────────────────────────────────────────────

export const demoBusiness: Business = {
  id: 'biz_01',
  name: 'Café Origen',
  slug: 'cafe-origen',
  logoUrl: undefined,
  primaryColor: '#0d9669',
  secondaryColor: '#f0e6d3',
  businessType: 'cafeteria',
  contactEmail: 'hola@cafeorigen.mx',
  contactPhone: '+52 55 1234 5678',
  website: 'https://cafeorigen.mx',
  timezone: 'America/Mexico_City',
  currency: 'MXN',
  locale: 'es-MX',
  subscriptionStatus: 'active',
  trialEndsAt: undefined,
  pricingPlan: 'pro',
  createdAt: '2024-09-15T10:00:00Z',
  updatedAt: '2025-01-10T14:30:00Z',
};

// ── Locations ─────────────────────────────────────────────

export const demoLocations: Location[] = [
  {
    id: 'loc_01',
    businessId: 'biz_01',
    name: 'Centro Histórico',
    address: 'Av. Reforma 234, Col. Centro',
    city: 'Ciudad de México',
    state: 'CDMX',
    phone: '+52 55 1234 5678',
    isActive: true,
    createdAt: '2024-09-15T10:00:00Z',
  },
  {
    id: 'loc_02',
    businessId: 'biz_01',
    name: 'Zona Rosa',
    address: 'Calle Génova 42, Col. Juárez',
    city: 'Ciudad de México',
    state: 'CDMX',
    phone: '+52 55 8765 4321',
    isActive: true,
    createdAt: '2024-11-20T08:00:00Z',
  },
];

// ── Users ─────────────────────────────────────────────────

export const demoUsers: User[] = [
  {
    id: 'usr_01',
    email: 'carlos@cafeorigen.mx',
    fullName: 'Carlos Mendoza',
    role: 'business_admin',
    businessId: 'biz_01',
    isActive: true,
    createdAt: '2024-09-15T10:00:00Z',
  },
  {
    id: 'usr_02',
    email: 'maria@cafeorigen.mx',
    fullName: 'María González',
    role: 'staff',
    businessId: 'biz_01',
    locationId: 'loc_01',
    isActive: true,
    createdAt: '2024-10-01T08:00:00Z',
  },
  {
    id: 'usr_03',
    email: 'roberto@cafeorigen.mx',
    fullName: 'Roberto Flores',
    role: 'staff',
    businessId: 'biz_01',
    locationId: 'loc_02',
    isActive: true,
    createdAt: '2024-11-22T09:00:00Z',
  },
];

// ── Loyalty Programs ──────────────────────────────────────

export const demoPrograms: LoyaltyProgram[] = [
  {
    id: 'prog_01',
    businessId: 'biz_01',
    name: 'Café de Vuelta',
    description: 'Compra 5 cafés y el sexto es gratis. Cada visita cuenta.',
    slug: 'cafe-de-vuelta',
    programType: 'visits',
    dynamicType: 'loyalty',
    status: 'active',
    goalValue: 5,
    rewardType: 'free_item',
    rewardDetail: 'Bebida gratis a tu elección',
    enrollmentMode: 'open',
    visitCooldownMinutes: 60,
    allowMultipleRewards: true,
    terms: 'Válido en cualquier sucursal. No acumulable con otras promociones. El sello se registra con cada compra de bebida caliente o fría.',
    welcomeMessage: '¡Bienvenido a Café de Vuelta! Cada café te acerca más a uno gratis. ☕',
    isActive: true,
    passBgColor: '#1a1a2e',
    passTextColor: '#f0e6d3',
    createdBy: 'Carlos Mendoza',
    createdAt: '2024-10-01T10:00:00Z',
    updatedAt: '2025-01-05T12:00:00Z',
  },
  {
    id: 'prog_02',
    businessId: 'biz_01',
    name: 'Corte Frecuente',
    description: 'Después de 4 cortes, obtén un 30% de descuento en tu siguiente servicio.',
    slug: 'corte-frecuente',
    programType: 'visits',
    dynamicType: 'loyalty',
    status: 'active',
    goalValue: 4,
    rewardType: 'discount_percent',
    rewardDetail: '30% de descuento',
    enrollmentMode: 'open',
    visitCooldownMinutes: 1440,
    allowMultipleRewards: false,
    terms: 'Aplica solo para corte de cabello. No aplica con otras promociones.',
    welcomeMessage: '¡Gracias por ser cliente frecuente! Tu próximo descuento está más cerca.',
    isActive: true,
    passBgColor: '#0f172a',
    passTextColor: '#e2e8f0',
    createdBy: 'María González',
    createdAt: '2024-11-15T09:00:00Z',
    updatedAt: '2025-01-08T15:00:00Z',
  },
  {
    id: 'prog_03',
    businessId: 'biz_01',
    name: 'Puntos Premium',
    description: 'Acumula 1 punto por cada $10 MXN. Alcanza 50 puntos y desbloquea tu recompensa.',
    slug: 'puntos-premium',
    programType: 'points',
    dynamicType: 'loyalty',
    status: 'active',
    goalValue: 50,
    rewardType: 'discount_fixed',
    rewardDetail: '$100 MXN de descuento',
    pointsPerUnit: 1,
    enrollmentMode: 'open',
    visitCooldownMinutes: 0,
    allowMultipleRewards: true,
    terms: 'Los puntos se acumulan por cada $10 gastados. Válido en todas las sucursales.',
    welcomeMessage: '¡Bienvenido al programa de puntos! Acumula con cada compra. 🌟',
    isActive: true,
    passBgColor: '#0f0f23',
    passTextColor: '#a5b4fc',
    createdBy: 'Roberto Flores',
    createdAt: '2025-01-01T10:00:00Z',
    updatedAt: '2025-01-10T10:00:00Z',
  },
];

// ── Customers (30 realistic Mexican names) ────────────────

const customerNames = [
  'Sofía Hernández', 'Diego Ramírez', 'Valentina López', 'Sebastián Torres',
  'Camila Martínez', 'Mateo García', 'Isabella Rodríguez', 'Santiago Flores',
  'Luciana Morales', 'Emiliano Díaz', 'Regina Vargas', 'Leonardo Castro',
  'Ximena Reyes', 'Andrés Herrera', 'Mariana Jiménez', 'Nicolás Guzmán',
  'Ana Paula Sánchez', 'Alejandro Medina', 'Fernanda Ortiz', 'Daniel Romero',
  'Renata Álvarez', 'Tomás Peña', 'Paulina Cruz', 'Adrián Ramos',
  'Valeria Domínguez', 'Maximiliano Aguilar', 'Natalia Ibarra', 'Juan Pablo Cortés',
  'Daniela Vega', 'Gabriel Navarro',
];

export const demoCustomers: Customer[] = customerNames.map((name: string, i: number) => ({
  id: `cust_${String(i + 1).padStart(2, '0')}`,
  businessId: 'biz_01',
  fullName: name,
  email: `${name.split(' ')[0].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}${i + 1}@email.com`,
  phone: `+52 55 ${String(1000 + i * 111).slice(0, 4)} ${String(2000 + i * 77).slice(0, 4)}`,
  createdAt: new Date(2024, 9 + Math.floor(i / 10), 1 + (i % 28)).toISOString(),
  updatedAt: new Date(2025, 0, 1 + (i % 28)).toISOString(),
}));

// ── Memberships ───────────────────────────────────────────

function makeMembership(
  custIdx: number,
  progIdx: number,
  visits: number,
  points: number,
  rewardsEarned: number,
  rewardsRedeemed: number,
): Membership {
  const prog = demoPrograms[progIdx];
  const cust = demoCustomers[custIdx];
  return {
    id: `mem_${cust.id}_${prog.id}`,
    customerId: cust.id,
    programId: prog.id,
    businessId: 'biz_01',
    currentVisits: visits,
    currentPoints: points,
    totalVisits: visits + (rewardsEarned * prog.goalValue),
    totalPoints: points + (rewardsEarned * prog.goalValue),
    rewardsEarned,
    rewardsRedeemed,
    status: 'active',
    passSerial: `DV-${String(custIdx).padStart(2, '0')}${String(progIdx).padStart(2, '0')}${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    walletPlatform: ['apple', 'google', 'none'][custIdx % 3] as 'apple' | 'google' | 'none',
    enrolledAt: cust.createdAt,
    lastVisitAt: new Date(2025, 0, Math.max(1, 15 - custIdx % 14)).toISOString(),
  };
}

export const demoMemberships: Membership[] = [
  // Program 1: Café de Vuelta (5 visits goal) — most popular
  ...Array.from({ length: 20 }, (_: any, i: number) => {
    const visits = [4, 3, 5, 2, 1, 4, 3, 5, 2, 3, 4, 1, 5, 2, 3, 4, 5, 1, 2, 3][i];
    const earned = [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0][i];
    const redeemed = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0][i];
    return makeMembership(i, 0, visits % 5, 0, earned, redeemed);
  }),
  // Program 2: Corte Frecuente (4 visits goal)
  ...Array.from({ length: 12 }, (_: any, i: number) => {
    const visits = [3, 2, 4, 1, 3, 2, 4, 1, 3, 2, 1, 4][i];
    const earned = [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1][i];
    const redeemed = [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0][i];
    return makeMembership(i + 5, 1, visits % 4, 0, earned, redeemed);
  }),
  // Program 3: Puntos Premium (50 points goal)
  ...Array.from({ length: 10 }, (_: any, i: number) => {
    const points = [45, 30, 50, 12, 38, 22, 50, 8, 41, 15][i];
    const earned = points >= 50 ? 1 : 0;
    const redeemed = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0][i];
    return makeMembership(i + 10, 2, 0, points % 50, earned, redeemed);
  }),
];

// ── Rewards ───────────────────────────────────────────────

export const demoRewards: Reward[] = demoMemberships
  .filter((m: Membership) => m.rewardsEarned > 0)
  .map((m: Membership) => ({
    id: `rew_${m.id}`,
    membershipId: m.id,
    programId: m.programId,
    status: m.rewardsRedeemed > 0 ? 'redeemed' as const : 'available' as const,
    unlockedAt: m.lastVisitAt || m.enrolledAt,
  }));

// ── Recent Activity ───────────────────────────────────────

const now = new Date();
function hoursAgo(h: number): string {
  return new Date(now.getTime() - h * 3600000).toISOString();
}

export const demoActivity: ActivityItem[] = [
  { id: 'act_01', type: 'visit', customerName: 'Sofía Hernández', programName: 'Café de Vuelta', locationName: 'Centro Histórico', detail: 'Sello registrado (4/5)', timestamp: hoursAgo(0.5) },
  { id: 'act_02', type: 'reward_unlocked', customerName: 'Valentina López', programName: 'Café de Vuelta', detail: '¡Recompensa desbloqueada! 🎉', timestamp: hoursAgo(1) },
  { id: 'act_03', type: 'enrollment', customerName: 'Gabriel Navarro', programName: 'Puntos Premium', detail: 'Nuevo cliente registrado', timestamp: hoursAgo(2) },
  { id: 'act_04', type: 'redemption', customerName: 'Isabella Rodríguez', programName: 'Café de Vuelta', locationName: 'Zona Rosa', detail: 'Bebida gratis redimida', timestamp: hoursAgo(3) },
  { id: 'act_05', type: 'visit', customerName: 'Diego Ramírez', programName: 'Café de Vuelta', locationName: 'Centro Histórico', detail: 'Sello registrado (3/5)', timestamp: hoursAgo(4) },
  { id: 'act_06', type: 'visit', customerName: 'Emiliano Díaz', programName: 'Corte Frecuente', locationName: 'Zona Rosa', detail: 'Sello registrado (2/4)', timestamp: hoursAgo(5) },
  { id: 'act_07', type: 'enrollment', customerName: 'Daniela Vega', programName: 'Café de Vuelta', detail: 'Nueva clienta registrada', timestamp: hoursAgo(8) },
  { id: 'act_08', type: 'redemption', customerName: 'Santiago Flores', programName: 'Corte Frecuente', locationName: 'Centro Histórico', detail: '30% descuento redimido', timestamp: hoursAgo(12) },
  { id: 'act_09', type: 'visit', customerName: 'Luciana Morales', programName: 'Puntos Premium', locationName: 'Zona Rosa', detail: '+8 puntos acumulados', timestamp: hoursAgo(14) },
  { id: 'act_10', type: 'visit', customerName: 'Camila Martínez', programName: 'Café de Vuelta', locationName: 'Centro Histórico', detail: 'Sello registrado (2/5)', timestamp: hoursAgo(20) },
];

// ── Dashboard Stats ───────────────────────────────────────

export const demoDashboardStats: DashboardStats = {
  totalCustomers: 30,
  activePasses: 42,
  totalVisits: 287,
  rewardsRedeemed: 14,
  returnRate: 72,
  activationRate: 85,
};

// ── Program Stats ─────────────────────────────────────────

export const demoProgramStats: ProgramWithStats[] = demoPrograms.map((prog: LoyaltyProgram) => {
  const members = demoMemberships.filter((m: Membership) => m.programId === prog.id);
  return {
    ...prog,
    totalMembers: members.length,
    totalVisits: members.reduce((sum: number, m: Membership) => sum + m.totalVisits, 0),
    totalRedemptions: members.reduce((sum: number, m: Membership) => sum + m.rewardsRedeemed, 0),
    activeMembers: members.filter((m: Membership) => m.status === 'active').length,
  };
});

// ── Analytics Chart Data ──────────────────────────────────

export const demoWeeklyVisits = [
  { week: 'Sem 1', visits: 18, enrollments: 5 },
  { week: 'Sem 2', visits: 24, enrollments: 3 },
  { week: 'Sem 3', visits: 21, enrollments: 7 },
  { week: 'Sem 4', visits: 32, enrollments: 4 },
  { week: 'Sem 5', visits: 28, enrollments: 6 },
  { week: 'Sem 6', visits: 35, enrollments: 5 },
  { week: 'Sem 7', visits: 30, enrollments: 8 },
  { week: 'Sem 8', visits: 38, enrollments: 4 },
  { week: 'Sem 9', visits: 42, enrollments: 6 },
  { week: 'Sem 10', visits: 36, enrollments: 3 },
  { week: 'Sem 11', visits: 45, enrollments: 7 },
  { week: 'Sem 12', visits: 40, enrollments: 5 },
];

export const demoLocationStats = [
  { location: 'Centro Histórico', visits: 168, customers: 22, redemptions: 9 },
  { location: 'Zona Rosa', visits: 119, customers: 18, redemptions: 5 },
];

export const demoProgramDistribution = [
  { name: 'Café de Vuelta', value: 20, color: '#0d9669' },
  { name: 'Corte Frecuente', value: 12, color: '#6366f1' },
  { name: 'Puntos Premium', value: 10, color: '#f59e0b' },
];

// ── Actionable Insights ───────────────────────────────────

export const demoInsights = {
  nearReward: demoMemberships.filter((m: Membership) => {
    const prog = demoPrograms.find((p: LoyaltyProgram) => p.id === m.programId);
    if (!prog) return false;
    if (prog.programType === 'visits') return m.currentVisits === prog.goalValue - 1;
    if (prog.programType === 'points') return m.currentPoints >= prog.goalValue * 0.9;
    return false;
  }).length,
  mostActiveProgram: 'Café de Vuelta',
  weeklyRedemptions: 3,
  activationRate: 85,
  returnRate: 72,
};
