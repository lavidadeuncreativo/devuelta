'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, CheckCircle2 } from 'lucide-react';
import { DigitalPassCard } from '@/components/features/pass/DigitalPassCard';
import { useAppStore } from '@/lib/store';
import { Membership, LoyaltyProgram, Customer, Reward } from '@/lib/types';

export default function PassViewPage({ params }: { params: Promise<{ serial: string }> }) {
  const { serial } = use(params);
  const { memberships, programs, customers, business } = useAppStore();

  // Find membership by serial or ID
  const membership = memberships.find((m: Membership) => m.passSerial === serial || m.id === serial);
  
  if (!membership) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-center">
        <div className="max-w-xs">
          <h1 className="text-xl font-bold mb-2">Pase no encontrado</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">El enlace es inválido o el pase ha sido revocado.</p>
        </div>
      </div>
    );
  }

  const program = programs.find((p: LoyaltyProgram) => p.id === membership.programId);
  const customer = customers.find((c: Customer) => c.id === membership.customerId);

  if (!program || !customer || !business) {
    return <div className="min-h-screen flex items-center justify-center">Error al cargar datos del pase</div>;
  }

  const currentVal = membership.currentVisits;
  const rewardAvailable = currentVal >= program.goalValue || useAppStore.getState().rewards.some((r: Reward) => r.membershipId === membership.id && r.status === 'available');

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative">
      <div className="absolute inset-0 gradient-radial-hero" />

      <motion.div
        className="relative max-w-sm w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20 mb-4">
            <CheckCircle2 size={12} /> Pase Verificado
          </div>
        </div>

        <DigitalPassCard
          businessName={business.name}
          programName={program.name}
          customerName={customer.fullName}
          currentValue={currentVal}
          goalValue={program.goalValue}
          rewardDetail={program.rewardDetail}
          programType={program.programType}
          bgColor={program.passBgColor}
          textColor={program.passTextColor}
          rewardAvailable={rewardAvailable}
          animated={true}
        />

        <div className="mt-6 space-y-3">
          <button className="btn-primary w-full !py-3 justify-center opacity-60 cursor-not-allowed">
            <Smartphone size={16} />
            Agregar a Apple Wallet
          </button>
          <button className="btn-secondary w-full !py-3 justify-center opacity-60 cursor-not-allowed">
            <Smartphone size={16} />
            Agregar a Google Wallet
          </button>
          <p className="text-[10px] text-center text-[var(--color-text-muted)] mt-2 italic">
            La integración completa con Wallet se habilita en planes Pro.
          </p>
        </div>

        {/* Program details */}
        <div className="card-surface p-5 mt-6 space-y-3">
          <h3 className="text-sm font-semibold">Tu Membresía</h3>
          <div className="text-sm text-[var(--color-text-secondary)] space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-[var(--color-border-subtle)]">
              <span className="text-[var(--color-text-muted)] text-xs">Negocio</span>
              <span className="font-medium text-[var(--color-text)]">{business.name}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-[var(--color-border-subtle)]">
              <span className="text-[var(--color-text-muted)] text-xs">Programa</span>
              <span className="font-medium text-[var(--color-text)]">{program.name}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-[var(--color-border-subtle)]">
              <span className="text-[var(--color-text-muted)] text-xs">Miembro desde</span>
              <span className="font-medium text-[var(--color-text)]">{new Date(membership.enrolledAt).toLocaleDateString()}</span>
            </div>
            <div>
              <span className="text-[var(--color-text-muted)] text-xs block mb-1">Tu beneficio</span>
              <span className="font-bold text-[var(--color-brand)]">{program.rewardDetail}</span>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-[var(--color-text-muted)] mt-8">
          Powered by{' '}
          <span className="font-semibold">De<span className="text-[var(--color-brand)]">Vuelta</span></span>
        </p>
      </motion.div>
    </div>
  );
}
