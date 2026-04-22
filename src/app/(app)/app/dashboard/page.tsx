'use client';

import { motion } from 'framer-motion';
import {
  Users, CreditCard, Eye, Gift, TrendingUp, Activity,
  Plus, QrCode, Star, Zap, BarChart3, UserPlus,
  ArrowRight, ArrowUpRight, CheckCircle2, Award, MapPin
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { formatRelativeTime } from '@/lib/utils';
import { useAppStore } from '@/lib/store';
import { demoActivity } from '@/lib/demo/data';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

// Helper to get visits in a timeframe
const getVisitsByTimeframe = (visits: any[], days: number, buckets: number) => {
  const result = [];
  const now = new Date();
  for (let i = buckets - 1; i >= 0; i--) {
    let label = '';
    let count = 0;

    if (days === 1) { // Daily
      const hour = now.getHours() - i;
      label = `${hour}:00`;
      count = visits.filter(v => {
        const d = new Date(v.createdAt);
        return d.getHours() === hour && d.getDate() === now.getDate();
      }).length;
    } else if (days === 7) { // Weekly
      const d = new Date();
      d.setDate(d.getDate() - i);
      label = d.toLocaleDateString('es-MX', { weekday: 'short' });
      count = visits.filter(v => {
        const vd = new Date(v.createdAt);
        return vd.toDateString() === d.toDateString();
      }).length;
    } else { // Monthly (4 weeks)
      label = `Sem ${4-i}`;
      count = visits.filter(v => {
        const vd = new Date(v.createdAt);
        const diff = (now.getTime() - vd.getTime()) / (1000 * 60 * 60 * 24 * 7);
        return diff >= i && diff < i + 1;
      }).length;
    }
    result.push({ name: label, visitas: count });
  }
  return result;
};

export default function DashboardPage() {
  const { customers, memberships, programs, locations } = useAppStore();
  const [chartView, setChartView] = useState<'daily'|'weekly'|'monthly'>('weekly');

  const totalVisits = memberships.reduce((acc, m) => acc + m.totalVisits, 0);
  const totalRewards = memberships.reduce((acc, m) => acc + m.rewardsRedeemed, 0);

  // Computar Cliente de la semana (más visitas en últimos 7 días)
  const sortedByVisits = [...memberships].sort((a, b) => b.totalVisits - a.totalVisits);
  const topMember = sortedByVisits[0];
  const customerOfTheWeek = topMember ? customers.find(c => c.id === topMember.customerId) : null;

  // Computar Cliente del mes (simulado con más visitas totales por ahora)
  const customerOfTheMonth = sortedByVisits[1] ? customers.find(c => c.id === sortedByVisits[1].customerId) : null;

  const currentChartData = getVisitsByTimeframe(
    useAppStore.getState().visits,
    chartView === 'daily' ? 1 : chartView === 'weekly' ? 7 : 30,
    chartView === 'daily' ? 6 : chartView === 'weekly' ? 7 : 4
  );

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Bienvenido de vuelta. Aquí está el rendimiento en tiempo real.
        </p>
      </div>

      {/* Top Hero Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Customer of the week */}
        <motion.div className="card-surface p-6 flex flex-col justify-between relative overflow-hidden" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl" />
          <h3 className="text-sm font-semibold flex items-center gap-2 text-amber-500 mb-4">
            <Award size={16} /> Cliente de la semana
          </h3>
          {customerOfTheWeek ? (
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-xl border border-amber-500/30">
                {customerOfTheWeek.fullName.split(' ').map(n=>n[0]).join('')}
              </div>
              <div>
                <p className="text-lg font-bold">{customerOfTheWeek.fullName}</p>
                <p className="text-sm text-[var(--color-text-muted)]">{topMember.totalVisits} visitas</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-[var(--color-text-muted)]">Cargando...</p>
          )}
        </motion.div>

        {/* Customer of the month */}
        <motion.div className="card-surface p-6 flex flex-col justify-between relative overflow-hidden" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl" />
          <h3 className="text-sm font-semibold flex items-center gap-2 text-purple-500 mb-4">
            <Award size={16} /> Cliente del mes
          </h3>
          {customerOfTheMonth ? (
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center font-bold text-xl border border-purple-500/30">
                {customerOfTheMonth.fullName.split(' ').map(n=>n[0]).join('')}
              </div>
              <div>
                <p className="text-lg font-bold">{customerOfTheMonth.fullName}</p>
                <p className="text-sm text-[var(--color-text-muted)]">Top en lealtad</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-[var(--color-text-muted)]">Cargando...</p>
          )}
        </motion.div>

        {/* Promotion of the week */}
        <motion.div className="card-surface p-6 flex flex-col justify-between relative overflow-hidden" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-pink-400/10 rounded-full blur-2xl" />
          <h3 className="text-sm font-semibold flex items-center gap-2 text-pink-500 mb-4">
            <Zap size={16} /> Promoción activa
          </h3>
          <div>
            <p className="text-lg font-bold">Doble sello Martes</p>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">Válido hasta las 20:00h</p>
          </div>
        </motion.div>

        {/* Global Stats Snippets*/}
        <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Users} label="Clientes Totales" value={customers.length} color="var(--color-brand)" delay={0.1} />
          <StatCard icon={CreditCard} label="Pases Activos" value={memberships.length} color="#6366f1" delay={0.15} />
          <StatCard icon={Eye} label="Registro de Visitas" value={totalVisits} color="#f59e0b" delay={0.2} tip="Escaneos de QR y registros manuales" />
          <StatCard icon={Gift} label="Canjes Reales" value={totalRewards} color="#ec4899" delay={0.25} tip="Recompensas entregadas a clientes" />
        </div>
      </div>

      {/* Main Charts & Analytics */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 card-surface p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <TrendingUp size={15} className="text-[var(--color-brand)]" />
              Visitas de clientes
            </h3>
            <div className="flex bg-[var(--color-bg-primary)] rounded-lg p-1 border border-[var(--color-border-subtle)]">
              {(['daily', 'weekly', 'monthly'] as const).map(view => (
                <button
                  key={view}
                  onClick={() => setChartView(view)}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${chartView === view ? 'bg-[var(--color-bg-elevated)] shadow-sm font-medium' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`}
                >
                  {view === 'daily' ? 'Diario' : view === 'weekly' ? 'Semanal' : 'Mensual'}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentChartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisitas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-brand)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-brand)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border-subtle)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'var(--color-bg-secondary)', borderColor: 'var(--color-border)' }}
                  itemStyle={{ color: 'var(--color-brand)' }}
                />
                <Area type="monotone" dataKey="visitas" stroke="var(--color-brand)" strokeWidth={2} fillOpacity={1} fill="url(#colorVisitas)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions Array */}
        <div className="space-y-6">
          <div className="card-surface p-5">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Zap size={15} className="text-[var(--color-brand)]" />
              Acciones rápidas
            </h3>
            <div className="space-y-2">
              {[
                { icon: Plus, label: 'Crear Tarjeta', href: '/app/programs/new', color: 'var(--color-brand)' },
                { icon: Star, label: 'Buscar cliente y Registrar', href: '/app/customers', color: '#f59e0b' },
                { icon: Gift, label: 'Redimir recompensa', href: '/app/customers', color: '#ec4899' },
                { icon: BarChart3, label: 'Ver analytics', href: '/app/analytics', color: '#8b5cf6' },
              ].map((action, i) => (
                <Link
                  key={i}
                  href={action.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-[var(--color-bg-tertiary)] transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${action.color}15` }}>
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
        </div>
      </div>

      {/* Bottom Grids: Programs & Locations */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
            <Star size={15} className="text-[var(--color-brand)]" /> Rendimiento por Tarjeta
          </h3>
          <div className="space-y-3">
            {programs.map((prog, i) => {
              const pMems = memberships.filter(m => m.programId === prog.id);
              const pVisits = pMems.reduce((s, m) => s + m.totalVisits, 0);
              return (
                <motion.div key={prog.id} className="card-surface p-4 flex items-center justify-between" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <div>
                    <h4 className="font-semibold text-sm">{prog.name}</h4>
                    <p className="text-xs text-[var(--color-text-muted)]">{pMems.length} miembros activos</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{pVisits}</p>
                    <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Sellos / Puntos</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div>
           <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
            <MapPin size={15} className="text-[var(--color-brand)]" /> Tráfico por Sucursal
          </h3>
          <div className="space-y-3">
            {locations.length > 0 ? locations.map((loc, i) => (
              <motion.div key={loc.id} className="card-surface p-4 flex items-center justify-between" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <div>
                  <h4 className="font-semibold text-sm">{loc.name}</h4>
                  <p className="text-xs text-[var(--color-text-muted)]">{loc.address}</p>
                </div>
                <span className="badge badge-success">Operando</span>
              </motion.div>
            )) : (
              <div className="card-surface p-6 text-center text-sm text-[var(--color-text-muted)]">No hay sucursales aún.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Animated Stat Card ──

function StatCard({ icon: Icon, label, value, color, delay, tip }: {
  icon: React.ElementType; label: string; value: number;
  color: string; delay: number; tip?: string;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const duration = 1000;
    const tick = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 4))));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);

  return (
    <motion.div className="card-surface p-4" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}>
      <div className="flex items-center justify-between mb-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}15` }}>
          <Icon size={16} style={{ color }} />
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold tracking-tight">{display.toLocaleString()}</p>
        <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5 uppercase tracking-wider">{label}</p>
        {tip && <p className="text-[9px] text-[var(--color-text-muted)] mt-1 opacity-60 leading-none">{tip}</p>}
      </div>
    </motion.div>
  );
}
