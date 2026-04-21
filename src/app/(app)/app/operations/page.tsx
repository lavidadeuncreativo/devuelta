'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Star, Gift, CheckCircle, User,
  ChevronRight, Zap, RotateCcw, Sparkles,
  ArrowLeft,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { cn, getProgressPercentage } from '@/lib/utils';
import { DigitalPassCard } from '@/components/features/pass/DigitalPassCard';
import type { Customer, Membership, LoyaltyProgram } from '@/lib/types';

type OperationMode = 'search' | 'customer' | 'success';

interface SelectedCustomer {
  customer: Customer;
  memberships: (Membership & { program: LoyaltyProgram })[];
}

export default function OperationsPage() {
  const { customers, memberships, programs, addVisit } = useAppStore();
  const [mode, setMode] = useState<OperationMode>('search');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<SelectedCustomer | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [successType, setSuccessType] = useState<'visit' | 'redemption'>('visit');

  const filteredCustomers = query.length >= 2
    ? customers.filter(c =>
        c.fullName.toLowerCase().includes(query.toLowerCase()) ||
        (c.email && c.email.toLowerCase().includes(query.toLowerCase())) ||
        (c.phone && c.phone.includes(query))
      ).slice(0, 8)
    : [];

  const selectCustomer = useCallback((customer: Customer) => {
    const custMemberships = memberships
      .filter(m => m.customerId === customer.id)
      .map(m => ({
        ...m,
        program: programs.find(p => p.id === m.programId)!,
      }));

    setSelected({ customer, memberships: custMemberships });
    setMode('customer');
    setQuery('');
  }, [memberships, programs]);

  const handleVisit = (membership: Membership & { program: LoyaltyProgram }) => {
    const newVisits = membership.currentVisits + 1;
    const rewardUnlocked = newVisits >= membership.program.goalValue;

    addVisit(membership.id, 1);

    if (rewardUnlocked) {
      setSuccessMessage(`¡Recompensa desbloqueada! ${membership.program.rewardDetail}`);
    } else {
      setSuccessMessage(`Visita registrada: ${newVisits} de ${membership.program.goalValue} sellos`);
    }
    setSuccessType('visit');
    setMode('success');
  };

  const handleRedeem = (membership: Membership & { program: LoyaltyProgram }) => {
    setSuccessMessage(`Recompensa redimida: ${membership.program.rewardDetail}`);
    setSuccessType('redemption');
    setMode('success');
  };

  const reset = () => {
    setMode('search');
    setSelected(null);
    setQuery('');
    setSuccessMessage('');
  };

  return (
    <div className="p-6 sm:p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Zap size={22} className="text-[var(--color-brand)]" />
            Operaciones
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Registra visitas y redime recompensas al instante.
          </p>
        </div>
        {mode !== 'search' && (
          <button onClick={reset} className="btn-ghost">
            <RotateCcw size={15} />
            Nuevo
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* ── SEARCH MODE ── */}
        {mode === 'search' && (
          <motion.div
            key="search"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Search input */}
            <div className="relative mb-4">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <input
                type="text"
                className="input-field !pl-12 !py-4 text-lg !rounded-2xl"
                placeholder="Buscar cliente por nombre, email o teléfono..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                autoFocus
              />
            </div>

            {/* Results */}
            <div className="space-y-2">
              {filteredCustomers.map((customer, i) => (
                <motion.button
                  key={customer.id}
                  className="w-full card-interactive p-4 flex items-center gap-4 text-left"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  onClick={() => selectCustomer(customer)}
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center text-sm font-bold text-[var(--color-text-secondary)]">
                    {customer.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{customer.fullName}</p>
                    <p className="text-xs text-[var(--color-text-muted)] truncate">{customer.email || customer.phone}</p>
                  </div>
                  <ChevronRight size={16} className="text-[var(--color-text-muted)]" />
                </motion.button>
              ))}

              {query.length >= 2 && filteredCustomers.length === 0 && (
                <div className="text-center py-12">
                  <User size={32} className="mx-auto text-[var(--color-text-muted)] mb-3" />
                  <p className="text-sm text-[var(--color-text-secondary)]">No se encontraron clientes</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">Intenta con otro nombre o email</p>
                </div>
              )}

              {query.length < 2 && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] mx-auto mb-4 flex items-center justify-center">
                    <Search size={24} className="text-[var(--color-text-muted)]" />
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)]">Busca un cliente para empezar</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">Escribe al menos 2 caracteres</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ── CUSTOMER MODE ── */}
        {mode === 'customer' && selected && (
          <motion.div
            key="customer"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Customer header */}
            <button onClick={reset} className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] mb-4 transition-colors">
              <ArrowLeft size={14} />
              Volver a búsqueda
            </button>

            <div className="card-surface p-5 mb-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--color-brand-subtle)] flex items-center justify-center text-lg font-bold text-[var(--color-brand)]">
                {selected.customer.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <h2 className="text-lg font-semibold">{selected.customer.fullName}</h2>
                <p className="text-sm text-[var(--color-text-muted)]">{selected.customer.email || selected.customer.phone}</p>
              </div>
            </div>

            {/* Memberships */}
            <div className="space-y-4">
              {selected.memberships.map((mem) => {
                const isVisitType = mem.program.programType === 'visits';
                const progress = getProgressPercentage(
                  isVisitType ? mem.currentVisits : mem.currentPoints,
                  mem.program.goalValue
                );
                const currentVal = isVisitType ? mem.currentVisits : mem.currentPoints;
                const rewardAvailable = currentVal >= mem.program.goalValue;

                return (
                  <div key={mem.id} className="card-surface p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-semibold">{mem.program.name}</h3>
                        <p className="text-xs text-[var(--color-text-muted)]">
                          {isVisitType
                            ? `${mem.currentVisits} de ${mem.program.goalValue} visitas`
                            : `${mem.currentPoints} de ${mem.program.goalValue} puntos`
                          }
                        </p>
                      </div>
                      <span className={cn(
                        'badge',
                        rewardAvailable ? 'badge-success' : 'badge-brand'
                      )}>
                        {rewardAvailable ? '🎁 Recompensa' : `${progress}%`}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="h-2 rounded-full bg-[var(--color-bg-primary)]">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: rewardAvailable ? 'var(--color-success)' : 'var(--color-brand)' }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      {!rewardAvailable && (
                        <button
                          onClick={() => handleVisit(mem)}
                          className="btn-primary flex-1 !py-3 text-base"
                        >
                          <Star size={18} />
                          {isVisitType ? 'Registrar visita' : 'Sumar puntos'}
                        </button>
                      )}
                      {rewardAvailable && (
                        <button
                          onClick={() => handleRedeem(mem)}
                          className="btn-primary flex-1 !py-3 text-base !bg-amber-500 hover:!bg-amber-400"
                        >
                          <Gift size={18} />
                          Redimir recompensa
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              {selected.memberships.length === 0 && (
                <div className="text-center py-12 card-surface">
                  <Star size={32} className="mx-auto text-[var(--color-text-muted)] mb-3" />
                  <p className="text-sm text-[var(--color-text-secondary)]">Sin programas activos</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">Este cliente no está inscrito en ningún programa</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ── SUCCESS MODE ── */}
        {mode === 'success' && (
          <motion.div
            key="success"
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{
                background: successType === 'visit'
                  ? 'var(--color-brand)'
                  : 'linear-gradient(135deg, #f59e0b, #ef4444)',
              }}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.6, times: [0, 0.6, 1], ease: [0.16, 1, 0.3, 1] }}
            >
              {successType === 'visit' ? (
                <CheckCircle size={36} className="text-white" />
              ) : (
                <Sparkles size={36} className="text-white" />
              )}
            </motion.div>

            {/* Particle burst */}
            <motion.div className="relative -mt-28 mb-12 h-8">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-0 w-2 h-2 rounded-full"
                  style={{
                    background: ['var(--color-brand)', '#f59e0b', '#6366f1', '#ec4899'][i % 4],
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos((i * Math.PI * 2) / 8) * 60,
                    y: Math.sin((i * Math.PI * 2) / 8) * 60 - 20,
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                />
              ))}
            </motion.div>

            <motion.h2
              className="text-2xl font-bold mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {successType === 'visit' ? '¡Visita registrada!' : '¡Recompensa redimida!'}
            </motion.h2>

            <motion.p
              className="text-base text-[var(--color-text-secondary)] mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {successMessage}
            </motion.p>

            <motion.div
              className="flex gap-3 justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button onClick={reset} className="btn-primary !py-3 !px-6">
                <Search size={16} />
                Otro cliente
              </button>
              <button onClick={() => { setMode('customer'); }} className="btn-secondary !py-3 !px-6">
                <ArrowLeft size={16} />
                Volver al cliente
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
