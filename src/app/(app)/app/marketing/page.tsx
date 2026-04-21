'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, Megaphone, Calendar, ArrowRight, User } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function MarketingPage() {
  const { customers, memberships } = useAppStore();

  // Basic aggregation for Customer of the Week
  const sortedCustomers = [...customers].sort((a, b) => {
    const visitsA = memberships.filter(m => m.customerId === a.id).reduce((s, m) => s + m.totalVisits, 0);
    const visitsB = memberships.filter(m => m.customerId === b.id).reduce((s, m) => s + m.totalVisits, 0);
    return visitsB - visitsA;
  });

  const customerOfTheWeek = sortedCustomers[0];
  const covVisits = customerOfTheWeek ? memberships.filter(m => m.customerId === customerOfTheWeek.id).reduce((s, m) => s + m.totalVisits, 0) : 0;

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Marketing & Engagement</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Lanza campañas, sorteos y premia a tus mejores clientes.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Customer of the week */}
        <motion.div 
          className="card-surface p-6 relative overflow-hidden group"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Trophy size={20} className="text-amber-500" />
            </div>
            <div>
              <h2 className="font-bold">Cliente de la semana</h2>
              <p className="text-xs text-[var(--color-text-muted)]">Basado en frecuencia de visitas</p>
            </div>
          </div>

          {customerOfTheWeek ? (
            <div className="text-center pb-2">
              <div className="w-20 h-20 mx-auto rounded-full bg-[var(--color-bg-secondary)] border-4 border-amber-500/20 flex items-center justify-center mb-3">
                <User size={32} className="text-[var(--color-text-muted)]" />
              </div>
              <h3 className="text-xl font-bold">{customerOfTheWeek.fullName}</h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">{covVisits} visitas en total</p>
              <button className="btn-secondary w-full justify-center">Premiar con saldo</button>
            </div>
          ) : (
            <p className="text-sm text-center text-[var(--color-text-muted)] py-8">No hay datos suficientes aún.</p>
          )}
        </motion.div>

        {/* Promo of the week */}
        <motion.div 
          className="card-surface p-6 lg:col-span-2 relative overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Megaphone size={20} className="text-blue-500" />
              </div>
              <div>
                <h2 className="font-bold">Campañas Activas</h2>
                <p className="text-xs text-[var(--color-text-muted)]">Gestión de promociones</p>
              </div>
            </div>
            <button className="btn-primary !py-2 !px-3 text-sm">Crear campaña</button>
          </div>

          <div className="border border-[var(--color-border-subtle)] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="badge badge-brand mb-2">Promoción Vigente</span>
              <h3 className="text-lg font-bold">Doble sello los Martes</h3>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">Todos los pases reciben x2 en visitas si escanean entre 16:00 y 20:00.</p>
            </div>
            <button className="btn-secondary whitespace-nowrap">Pausar</button>
          </div>
        </motion.div>
      </div>

      {/* Giveaways */}
      <motion.div 
        className="card-surface p-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <Sparkles size={20} className="text-purple-500" />
          </div>
          <div>
            <h2 className="font-bold">Sorteos y Giveaways (Próximamente)</h2>
            <p className="text-xs text-[var(--color-text-muted)]">Organiza ruletas y sorteos entre tus clientes recurrentes.</p>
          </div>
        </div>

        <div className="bg-[var(--color-bg-secondary)] rounded-2xl border border-dashed border-[var(--color-border)] p-12 text-center">
          <Calendar size={32} className="mx-auto text-[var(--color-text-muted)] mb-4" />
          <h3 className="text-lg font-medium mb-2">Módulo en construcción</h3>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-sm mx-auto mb-6">
            Pronto podrás seleccionar a un ganador aleatorio transparente entre todos tus clientes activos del mes.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
