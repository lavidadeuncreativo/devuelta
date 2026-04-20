'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import { Smartphone } from 'lucide-react';
import { DigitalPassCard } from '@/components/features/pass/DigitalPassCard';
import { demoMemberships, demoPrograms, demoCustomers, demoBusiness } from '@/lib/demo/data';

export default function PassViewPage({ params }: { params: Promise<{ membershipId: string }> }) {
  const { membershipId } = use(params);

  // Demo: find membership or use first one
  const membership = demoMemberships.find(m => m.id === membershipId || m.passSerial === membershipId) || demoMemberships[0];
  const program = demoPrograms.find(p => p.id === membership.programId) || demoPrograms[0];
  const customer = demoCustomers.find(c => c.id === membership.customerId) || demoCustomers[0];

  const currentVal = program.programType === 'visits' ? membership.currentVisits : membership.currentPoints;
  const rewardAvailable = currentVal >= program.goalValue;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative">
      <div className="absolute inset-0 gradient-radial-hero" />

      <motion.div
        className="relative max-w-sm w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <DigitalPassCard
          businessName={demoBusiness.name}
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
          <button className="btn-primary w-full !py-3 justify-center">
            <Smartphone size={16} />
            Agregar a Apple Wallet
          </button>
          <button className="btn-secondary w-full !py-3 justify-center">
            <Smartphone size={16} />
            Agregar a Google Wallet
          </button>
        </div>

        {/* Program details */}
        <div className="card-surface p-5 mt-6 space-y-3">
          <h3 className="text-sm font-semibold">Detalles del programa</h3>
          <div className="text-sm text-[var(--color-text-secondary)] space-y-2">
            <p><span className="text-[var(--color-text-muted)]">Negocio:</span> {demoBusiness.name}</p>
            <p><span className="text-[var(--color-text-muted)]">Programa:</span> {program.name}</p>
            <p><span className="text-[var(--color-text-muted)]">Recompensa:</span> {program.rewardDetail}</p>
            <p><span className="text-[var(--color-text-muted)]">Meta:</span> {program.goalValue} {program.programType === 'visits' ? 'visitas' : 'puntos'}</p>
          </div>
          {program.terms && (
            <div className="pt-3 border-t border-[var(--color-border-subtle)]">
              <p className="text-xs text-[var(--color-text-muted)]">{program.terms}</p>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-[var(--color-text-muted)] mt-6">
          Powered by{' '}
          <span className="font-semibold">De<span className="text-[var(--color-brand)]">Vuelta</span></span>
        </p>
      </motion.div>
    </div>
  );
}
