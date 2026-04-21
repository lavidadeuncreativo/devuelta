'use client';

import { motion } from 'framer-motion';
import {
  Users, CreditCard, Eye, Gift, TrendingUp,
  Target, ArrowUpRight, Calendar,
  Zap, BarChart3, Download, Mail, Filter, CheckCircle2
} from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  demoDashboardStats,
  demoWeeklyVisits,
  demoLocationStats,
  demoProgramDistribution,
  demoInsights,
} from '@/lib/demo/data';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart as ReBarChart, Bar, PieChart, Pie, Cell,
} from 'recharts';

export default function AnalyticsPage() {
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const triggerAction = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8 relative">
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-[var(--color-bg-primary)] border border-[var(--color-border)] shadow-xl px-4 py-2.5 rounded-full"
          >
            <CheckCircle2 size={16} className="text-[var(--color-success)]" />
            <span className="text-sm font-medium">{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Datos accionables de tu programa de lealtad.
          </p>
        </div>
        <div className="flex items-center gap-2 lg:gap-3">
          <div className="relative">
            <select className="input-field !py-2 !pl-9 !pr-8 text-sm appearance-none bg-[var(--color-bg-secondary)] border-none">
              <option>Últimos 7 días</option>
              <option>Último mes</option>
              <option>Último trimestre</option>
              <option>Este año</option>
            </select>
            <Filter size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none" />
          </div>
          <button onClick={() => triggerAction('Reporte enviado a tu correo')} className="btn-secondary !py-2 px-3 text-sm hidden sm:flex">
            <Mail size={15} />
            Email
          </button>
          <button onClick={() => triggerAction('Descarga de CSV iniciada')} className="btn-primary !py-2 px-3 text-sm">
            <Download size={15} />
            Exportar CSV
          </button>
        </div>
      </div>

      {/* Insights cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <InsightCard
          icon={Target}
          label="Cerca de recompensa"
          value={demoInsights.nearReward}
          detail="clientes a 1 visita"
          color="#f59e0b"
          delay={0}
        />
        <InsightCard
          icon={Zap}
          label="Programa más activo"
          value={0}
          customValue={demoInsights.mostActiveProgram}
          detail="más visitas esta semana"
          color="var(--color-brand)"
          delay={0.05}
        />
        <InsightCard
          icon={Gift}
          label="Canjes esta semana"
          value={demoInsights.weeklyRedemptions}
          detail="recompensas redimidas"
          color="#ec4899"
          delay={0.1}
        />
        <InsightCard
          icon={TrendingUp}
          label="Tasa de activación"
          value={demoInsights.activationRate}
          suffix="%"
          detail="clientes con ≥1 visita"
          color="#6366f1"
          delay={0.15}
        />
        <InsightCard
          icon={Users}
          label="Tasa de retorno"
          value={demoInsights.returnRate}
          suffix="%"
          detail="regresan en 30 días"
          color="var(--color-brand)"
          delay={0.2}
        />
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Visits trend */}
        <div className="lg:col-span-2 card-surface p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <BarChart3 size={15} className="text-[var(--color-brand)]" />
              Tendencia de visitas
            </h3>
            <span className="text-xs text-[var(--color-text-muted)]">Últimas 12 semanas</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={demoWeeklyVisits}>
                <defs>
                  <linearGradient id="gradVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.65 0.18 165)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(0.65 0.18 165)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="week"
                  tick={{ fill: 'oklch(0.45 0.015 260)', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: 'oklch(0.45 0.015 260)', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: 'oklch(0.16 0.01 260)',
                    border: '1px solid oklch(0.25 0.012 260)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '13px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="visits"
                  stroke="oklch(0.65 0.18 165)"
                  fill="url(#gradVisits)"
                  strokeWidth={2}
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="enrollments"
                  stroke="#6366f1"
                  fill="transparent"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-6 mt-3 text-xs text-[var(--color-text-muted)]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 rounded bg-[var(--color-brand)]" />
              <span>Visitas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 rounded bg-[#6366f1] opacity-70" style={{ borderTop: '1px dashed' }} />
              <span>Inscripciones</span>
            </div>
          </div>
        </div>

        {/* Program distribution */}
        <div className="card-surface p-5">
          <h3 className="text-sm font-semibold mb-5 flex items-center gap-2">
            <Eye size={15} className="text-[var(--color-brand)]" />
            Distribución por programa
          </h3>
          <div className="h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={demoProgramDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {demoProgramDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: 'oklch(0.16 0.01 260)',
                    border: '1px solid oklch(0.25 0.012 260)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '13px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-3">
            {demoProgramDistribution.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                  <span className="text-xs text-[var(--color-text-secondary)]">{item.name}</span>
                </div>
                <span className="text-xs font-medium">{item.value} miembros</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location stats */}
      <div className="card-surface p-5">
        <h3 className="text-sm font-semibold mb-5 flex items-center gap-2">
          <Calendar size={15} className="text-[var(--color-brand)]" />
          Rendimiento por sucursal
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {demoLocationStats.map((loc, i) => (
            <motion.div
              key={i}
              className="bg-[var(--color-bg-primary)] rounded-xl p-4 border border-[var(--color-border-subtle)]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <h4 className="text-base font-semibold mb-3">{loc.location}</h4>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-xl font-bold">{loc.visits}</p>
                  <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Visitas</p>
                </div>
                <div>
                  <p className="text-xl font-bold">{loc.customers}</p>
                  <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Clientes</p>
                </div>
                <div>
                  <p className="text-xl font-bold">{loc.redemptions}</p>
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

// ── Insight Card ──

function InsightCard({ icon: Icon, label, value, customValue, suffix, detail, color, delay }: {
  icon: React.ElementType; label: string; value: number; customValue?: string;
  suffix?: string; detail: string; color: string; delay: number;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (customValue) return;
    const duration = 800;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value, customValue]);

  return (
    <motion.div
      className="card-surface p-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: `${color}15` }}>
        <Icon size={15} style={{ color }} />
      </div>
      {customValue ? (
        <p className="text-sm font-bold leading-tight mb-1">{customValue}</p>
      ) : (
        <p className="text-xl font-bold mb-1">{display}{suffix}</p>
      )}
      <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider leading-tight">{label}</p>
    </motion.div>
  );
}
