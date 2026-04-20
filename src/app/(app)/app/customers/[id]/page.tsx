'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Gift, CheckCircle2, UserPlus, Mail, Phone, Calendar } from 'lucide-react';
import Link from 'next/link';
import { demoCustomers, demoMemberships, demoPrograms, demoActivity } from '@/lib/demo/data';
import { formatRelativeTime, getProgressPercentage } from '@/lib/utils';
import { DigitalPassCard } from '@/components/features/pass/DigitalPassCard';

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const customer = demoCustomers.find(c => c.id === id) || demoCustomers[0];
  const memberships = demoMemberships.filter(m => m.customerId === customer.id);

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
              {customer.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
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
              <p className="text-2xl font-bold">{memberships.reduce((s, m) => s + m.totalVisits, 0)}</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">Total visitas</p>
            </motion.div>
            <motion.div className="card-surface p-4 text-center" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <p className="text-2xl font-bold">{memberships.reduce((s, m) => s + m.rewardsEarned, 0)}</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">Recompensas</p>
            </motion.div>
            <motion.div className="card-surface p-4 text-center" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <p className="text-2xl font-bold">{memberships.length}</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">Programas</p>
            </motion.div>
          </div>

          {/* Memberships */}
          <div>
            <h2 className="text-sm font-semibold mb-4">Programas activos</h2>
            <div className="space-y-4">
              {memberships.map((mem) => {
                const prog = demoPrograms.find(p => p.id === mem.programId);
                if (!prog) return null;
                const isVisits = prog.programType === 'visits';
                const current = isVisits ? mem.currentVisits : mem.currentPoints;
                const progress = getProgressPercentage(current, prog.goalValue);

                return (
                  <div key={mem.id} className="card-surface p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-semibold">{prog.name}</h3>
                      <span className="badge badge-brand">
                        {isVisits ? `${current}/${prog.goalValue}` : `${current} pts`}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--color-bg-primary)] mb-2">
                      <motion.div
                        className="h-full rounded-full gradient-brand"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {prog.rewardDetail} — {current >= prog.goalValue ? '🎁 ¡Disponible!' : `Faltan ${prog.goalValue - current} ${isVisits ? 'visitas' : 'puntos'}`}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity timeline */}
          <div>
            <h2 className="text-sm font-semibold mb-4">Actividad reciente</h2>
            <div className="space-y-1">
              {demoActivity.filter(a => a.customerName === customer.fullName).length > 0
                ? demoActivity.filter(a => a.customerName === customer.fullName).map(act => (
                  <div key={act.id} className="flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-[var(--color-bg-tertiary)] transition-colors">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center mt-0.5 ${
                      act.type === 'visit' ? 'bg-amber-500/15' :
                      act.type === 'enrollment' ? 'bg-[var(--color-brand)]/15' :
                      act.type === 'reward_unlocked' ? 'bg-purple-500/15' : 'bg-pink-500/15'
                    }`}>
                      {act.type === 'visit' && <Star size={12} className="text-amber-400" />}
                      {act.type === 'enrollment' && <UserPlus size={12} className="text-[var(--color-brand-light)]" />}
                      {act.type === 'reward_unlocked' && <Gift size={12} className="text-purple-400" />}
                      {act.type === 'redemption' && <CheckCircle2 size={12} className="text-pink-400" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{act.detail}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">{formatRelativeTime(act.timestamp)}</p>
                    </div>
                  </div>
                ))
                : (
                  <div className="text-center py-8 card-surface">
                    <Star size={24} className="mx-auto text-[var(--color-text-muted)] mb-2" />
                    <p className="text-sm text-[var(--color-text-secondary)]">Actividad del cliente se mostrará aquí</p>
                  </div>
                )
              }
            </div>
          </div>
        </div>

        {/* Right — Pass preview */}
        <div className="space-y-6">
          <h2 className="text-sm font-semibold">Pase digital</h2>
          {memberships[0] && (() => {
            const prog = demoPrograms.find(p => p.id === memberships[0].programId);
            if (!prog) return null;
            return (
              <DigitalPassCard
                businessName="Café Origen"
                programName={prog.name}
                customerName={customer.fullName}
                currentValue={prog.programType === 'visits' ? memberships[0].currentVisits : memberships[0].currentPoints}
                goalValue={prog.goalValue}
                rewardDetail={prog.rewardDetail}
                programType={prog.programType}
                bgColor={prog.passBgColor}
                textColor={prog.passTextColor}
                rewardAvailable={
                  (prog.programType === 'visits' ? memberships[0].currentVisits : memberships[0].currentPoints) >= prog.goalValue
                }
                animated={true}
              />
            );
          })()}

          {/* Quick actions */}
          <div className="card-surface p-4 space-y-2">
            <h3 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Acciones rápidas</h3>
            <Link href="/app/operations" className="btn-primary w-full justify-center text-sm">
              <Star size={14} />
              Registrar visita
            </Link>
            <button className="btn-secondary w-full justify-center text-sm">
              <Gift size={14} />
              Redimir recompensa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
