'use client';

import { motion } from 'framer-motion';
import {
  Users, CreditCard, Eye, Gift, TrendingUp, Activity,
  Plus, QrCode, Star, Zap, BarChart3, UserPlus,
  ArrowRight, ArrowUpRight, CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  demoDashboardStats,
  demoProgramStats,
  demoActivity,
} from '@/lib/demo/data';
import { formatRelativeTime } from '@/lib/utils';

export default function DashboardPage() {
  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Bienvenido de vuelta, Carlos. Aquí tienes un resumen de tu negocio.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Clientes registrados"
          value={demoDashboardStats.totalCustomers}
          suffix=""
          trend="+12%"
          color="var(--color-brand)"
          delay={0}
        />
        <StatCard
          icon={CreditCard}
          label="Pases activos"
          value={demoDashboardStats.activePasses}
          suffix=""
          trend="+8%"
          color="#6366f1"
          delay={0.05}
        />
        <StatCard
          icon={Eye}
          label="Visitas registradas"
          value={demoDashboardStats.totalVisits}
          suffix=""
          trend="+23%"
          color="#f59e0b"
          delay={0.1}
        />
        <StatCard
          icon={Gift}
          label="Recompensas redimidas"
          value={demoDashboardStats.rewardsRedeemed}
          suffix=""
          trend="+5%"
          color="#ec4899"
          delay={0.15}
        />
      </div>

      {/* Quick Actions + Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card-surface p-5">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Zap size={15} className="text-[var(--color-brand)]" />
              Acciones rápidas
            </h3>
            <div className="space-y-2">
              {[
                { icon: Plus, label: 'Crear programa', href: '/app/programs/new', color: 'var(--color-brand)' },
                { icon: QrCode, label: 'Compartir QR', href: '#', color: '#6366f1' },
                { icon: Star, label: 'Registrar visita', href: '/app/operations', color: '#f59e0b' },
                { icon: Gift, label: 'Redimir recompensa', href: '/app/operations', color: '#ec4899' },
                { icon: UserPlus, label: 'Agregar cliente', href: '/app/customers', color: '#14b8a6' },
                { icon: BarChart3, label: 'Ver analytics', href: '/app/analytics', color: '#8b5cf6' },
              ].map((action, i) => (
                <Link
                  key={i}
                  href={action.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-[var(--color-bg-tertiary)] transition-all group"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${action.color}15` }}
                  >
                    <action.icon size={15} style={{ color: action.color }} />
                  </div>
                  <span className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-text)] transition-colors">
                    {action.label}
                  </span>
                  <ArrowRight size={14} className="ml-auto text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          {/* Return Rate */}
          <div className="card-surface p-5">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <TrendingUp size={15} className="text-[var(--color-brand)]" />
              Tasa de retorno
            </h3>
            <div className="flex items-end gap-3">
              <AnimatedNumber value={demoDashboardStats.returnRate} className="text-3xl font-bold" />
              <span className="text-lg text-[var(--color-text-muted)] mb-1">%</span>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mt-2">
              de tus clientes regresan en 30 días
            </p>
            <div className="mt-3 h-2 rounded-full bg-[var(--color-bg-primary)] overflow-hidden">
              <motion.div
                className="h-full rounded-full gradient-brand"
                initial={{ width: 0 }}
                animate={{ width: `${demoDashboardStats.returnRate}%` }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-2">
          <div className="card-surface p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Activity size={15} className="text-[var(--color-brand)]" />
                Actividad reciente
              </h3>
              <button className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors">
                Ver todo
              </button>
            </div>

            <div className="space-y-1">
              {demoActivity.map((item, i) => (
                <motion.div
                  key={item.id}
                  className="flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-[var(--color-bg-tertiary)] transition-colors group"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    item.type === 'visit' ? 'bg-amber-500/15' :
                    item.type === 'enrollment' ? 'bg-[var(--color-brand)]/15' :
                    item.type === 'reward_unlocked' ? 'bg-purple-500/15' :
                    'bg-pink-500/15'
                  }`}>
                    {item.type === 'visit' && <Star size={14} className="text-amber-400" />}
                    {item.type === 'enrollment' && <UserPlus size={14} className="text-[var(--color-brand-light)]" />}
                    {item.type === 'reward_unlocked' && <Gift size={14} className="text-purple-400" />}
                    {item.type === 'redemption' && <CheckCircle2 size={14} className="text-pink-400" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{item.customerName}</span>
                      <span className="text-[var(--color-text-secondary)]"> · {item.programName}</span>
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{item.detail}</p>
                  </div>

                  <span className="text-xs text-[var(--color-text-muted)] shrink-0 mt-0.5">
                    {formatRelativeTime(item.timestamp)}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Program Performance */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Star size={15} className="text-[var(--color-brand)]" />
            Rendimiento por programa
          </h3>
          <Link href="/app/programs" className="text-xs text-[var(--color-brand)] hover:underline flex items-center gap-1">
            Ver todos <ArrowUpRight size={12} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {demoProgramStats.map((prog, i) => (
            <motion.div
              key={prog.id}
              className="card-interactive p-5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="badge badge-brand">{prog.programType === 'visits' ? 'Sellos' : 'Puntos'}</span>
                <span className="badge badge-success">Activo</span>
              </div>
              <h4 className="text-base font-semibold mb-1">{prog.name}</h4>
              <p className="text-xs text-[var(--color-text-muted)] mb-4">{prog.rewardDetail}</p>

              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[var(--color-border-subtle)]">
                <div>
                  <p className="text-lg font-bold">{prog.totalMembers}</p>
                  <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Miembros</p>
                </div>
                <div>
                  <p className="text-lg font-bold">{prog.totalVisits}</p>
                  <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Visitas</p>
                </div>
                <div>
                  <p className="text-lg font-bold">{prog.totalRedemptions}</p>
                  <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Canjes</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Animated Stat Card ──

function StatCard({ icon: Icon, label, value, suffix, trend, color, delay }: {
  icon: React.ElementType; label: string; value: number; suffix: string;
  trend: string; color: string; delay: number;
}) {
  return (
    <motion.div
      className="card-surface p-5"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-center justify-between mb-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: `${color}15` }}
        >
          <Icon size={17} style={{ color }} />
        </div>
        <span className="text-xs font-semibold text-emerald-400 flex items-center gap-0.5">
          <ArrowUpRight size={12} />
          {trend}
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <AnimatedNumber value={value} className="text-2xl font-bold tracking-tight" />
        {suffix && <span className="text-sm text-[var(--color-text-muted)]">{suffix}</span>}
      </div>
      <p className="text-xs text-[var(--color-text-muted)] mt-1">{label}</p>
    </motion.div>
  );
}

// ── Animated Number ──

function AnimatedNumber({ value, className }: { value: number; className?: string }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);

  return <span className={className}>{display.toLocaleString()}</span>;
}
