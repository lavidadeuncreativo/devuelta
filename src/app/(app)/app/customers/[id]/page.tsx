'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Gift, CheckCircle2, UserPlus, Mail, Phone, Calendar } from 'lucide-react';
import Link from 'next/link';
import { demoActivity } from '@/lib/demo/data';
import { useAppStore } from '@/lib/store';
import { formatRelativeTime, getProgressPercentage, cn } from '@/lib/utils';
import { DigitalPassCard } from '@/components/features/pass/DigitalPassCard';
import { useState, useEffect } from 'react';
import { DemoCustomerRepository, DemoMembershipRepository, DemoProgramRepository, DemoVisitRepository, DemoRewardRepository, DemoRedemptionRepository, DemoAuditRepository } from '@/lib/repositories/demo-repository';
import { LoyaltyService } from '@/lib/services/loyalty-service';
import { MembershipWithDetails } from '@/lib/types';

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { customers, memberships: allMemberships, programs, auditLogs, business } = useAppStore();
  const [selectedMembershipIdx, setSelectedMembershipIdx] = useState(0);
  const [customerMemberships, setCustomerMemberships] = useState<MembershipWithDetails[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const customer = customers.find((c) => c.id === id) || customers[0];

  // Logic to enrichment memberships
  useEffect(() => {
    if (customer) {
      const mems = allMemberships.filter((m) => m.customerId === customer.id);
      const enriched = mems.map(m => ({
        ...m,
        customer,
        program: programs.find(p => p.id === m.programId)!,
        rewards: useAppStore.getState().rewards.filter(r => r.membershipId === m.id)
      })).filter(m => m.program);
      setCustomerMemberships(enriched);
    }
  }, [customer, allMemberships, programs]);

  const selectedMembership = customerMemberships[selectedMembershipIdx];

  const handleAction = async (type: 'visit' | 'redeem') => {
    if (!selectedMembership) return;
    setIsProcessing(true);
    
    const service = new LoyaltyService(
      new DemoProgramRepository(),
      new DemoMembershipRepository(),
      new DemoVisitRepository(),
      new DemoRewardRepository(),
      new DemoRedemptionRepository(),
      new DemoAuditRepository()
    );

    const locationId = useAppStore.getState().locations[0]?.id || 'loc_01';
    
    if (type === 'visit') {
      await service.recordVisit(selectedMembership.id, locationId, 'staff_01');
    } else {
      await service.redeemReward(selectedMembership.id, locationId, 'staff_01');
    }
    
    setIsProcessing(false);
  };

  if (!customer) return <div className="p-8 text-center">Cliente no encontrado</div>;

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto">
      <Link href="/app/customers" className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] mb-6 transition-colors">
        <ArrowLeft size={14} />
        Volver a clientes
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left — Customer info + timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer header */}
          <motion.div
            className="card-surface p-6 flex items-start gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-14 h-14 rounded-full bg-[var(--color-brand-subtle)] flex items-center justify-center text-xl font-bold text-[var(--color-brand)]">
              {customer.fullName.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold">{customer.fullName}</h1>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-[var(--color-text-secondary)]">
                {customer.email && (
                  <span className="flex items-center gap-1.5">
                    <Mail size={13} className="text-[var(--color-text-muted)]" />
                    {customer.email}
                  </span>
                )}
                {customer.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone size={13} className="text-[var(--color-text-muted)]" />
                    {customer.phone}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-[var(--color-text-muted)]" />
                  Cliente desde {new Date(customer.createdAt).toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <motion.div className="card-surface p-4 text-center" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <p className="text-2xl font-bold">{customerMemberships.reduce((s, m) => s + m.totalVisits, 0)}</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">Total visitas</p>
            </motion.div>
            <motion.div className="card-surface p-4 text-center" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <p className="text-2xl font-bold">{customerMemberships.reduce((s, m) => s + m.rewardsRedeemed, 0)}</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">Recompensas</p>
            </motion.div>
            <motion.div className="card-surface p-4 text-center" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <p className="text-2xl font-bold">{customerMemberships.length}</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">Programas</p>
            </motion.div>
          </div>

          {/* Memberships */}
          <div>
            <h2 className="text-sm font-semibold mb-4">Programas activos</h2>
            <div className="space-y-4">
              {customerMemberships.map((mem, idx) => {
                const prog = mem.program;
                const isVisits = prog.programType === 'visits';
                const current = mem.currentVisits;
                const progress = getProgressPercentage(current, prog.goalValue);
                const isSelected = selectedMembershipIdx === idx;

                return (
                  <button 
                    key={mem.id} 
                    className={cn(
                      "w-full text-left card-surface p-5 transition-all outline-none",
                      isSelected ? "ring-2 ring-[var(--color-brand)] border-transparent" : "hover:border-[var(--color-brand)]/30"
                    )}
                    onClick={() => setSelectedMembershipIdx(idx)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-semibold">{prog.name}</h3>
                      <span className="badge badge-brand">
                        {isVisits ? `${current}/${prog.goalValue}` : `${current} pts`}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--color-bg-primary)] mb-2 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full gradient-brand"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {prog.rewardDetail} — {current >= prog.goalValue ? '🎁 ¡Disponible!' : `Faltan ${prog.goalValue - current} ${isVisits ? 'visitas' : 'puntos'}`}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Activity timeline */}
          <div>
            <h2 className="text-sm font-semibold mb-4">Actividad reciente</h2>
            <div className="space-y-1">
              {auditLogs.filter(l => l.entityId === selectedMembership?.id || (l.entityType === 'membership' && l.metadata?.membershipId === selectedMembership?.id)).length > 0
                ? auditLogs
                    .filter(l => l.entityId === selectedMembership?.id || (l.entityType === 'membership' && l.metadata?.membershipId === selectedMembership?.id))
                    .sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map(log => (
                  <div key={log.id} className="flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-[var(--color-bg-tertiary)] transition-colors">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center mt-0.5 ${
                      log.action === 'RECORD_VISIT' ? 'bg-amber-500/15' :
                      log.action === 'REDEEM_REWARD' ? 'bg-pink-500/15' : 'bg-[var(--color-brand)]/15'
                    }`}>
                      {log.action === 'RECORD_VISIT' && <Star size={12} className="text-amber-400" />}
                      {log.action === 'REDEEM_REWARD' && <Gift size={12} className="text-pink-400" />}
                      {log.action.includes('ENROLL') && <UserPlus size={12} className="text-[var(--color-brand-light)]" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{log.action === 'RECORD_VISIT' ? 'Visita registrada' : log.action === 'REDEEM_REWARD' ? 'Recompensa canjeada' : log.action}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">{formatRelativeTime(log.createdAt)}</p>
                    </div>
                  </div>
                ))
                : (
                  <div className="text-center py-8 border border-dashed border-[var(--color-border-subtle)] rounded-2xl">
                    <Star size={24} className="mx-auto text-[var(--color-text-muted)] mb-2 opacity-50" />
                    <p className="text-xs text-[var(--color-text-muted)]">No hay actividad reciente para este programa</p>
                  </div>
                )
              }
            </div>
          </div>
        </div>

          {/* Pass preview */}
          <div className="space-y-6">
            <h2 className="text-sm font-semibold">Pase digital</h2>
            {selectedMembership && (
              <DigitalPassCard
                businessName={business?.name || 'Tu Negocio'}
                programName={selectedMembership.program.name}
                customerName={customer.fullName}
                currentValue={selectedMembership.currentVisits}
                goalValue={selectedMembership.program.goalValue}
                rewardDetail={selectedMembership.program.rewardDetail}
                programType={selectedMembership.program.programType}
                bgColor={selectedMembership.program.passBgColor}
                textColor={selectedMembership.program.passTextColor}
                rewardAvailable={selectedMembership.rewards.some(r => r.status === 'available')}
                animated={true}
              />
            )}

            {/* Quick actions for Selected Program */}
            {selectedMembership && (
              <div className="card-surface p-4 space-y-2">
                <h3 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Acciones ({selectedMembership.program.name})</h3>
                <button 
                  onClick={() => handleAction('visit')}
                  disabled={isProcessing}
                  className="btn-primary w-full justify-center text-sm disabled:opacity-50"
                >
                  <Star size={14} />
                  Registrar visita
                </button>
                <button 
                  onClick={() => handleAction('redeem')}
                  disabled={isProcessing || !selectedMembership.rewards.some(r => r.status === 'available')}
                  className={cn(
                    "btn-secondary w-full justify-center text-sm disabled:opacity-50",
                    selectedMembership.rewards.some(r => r.status === 'available') ? "animate-pulse" : ""
                  )}
                >
                  <Gift size={14} />
                  Redimir recompensa
                </button>
              </div>
            )}
          </div>
      </div>
    </div>
  );
}
