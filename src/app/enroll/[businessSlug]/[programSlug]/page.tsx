'use client';

import { use, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Smartphone } from 'lucide-react';
import { DigitalPassCard } from '@/components/features/pass/DigitalPassCard';
import { demoPrograms, demoBusiness } from '@/lib/demo/data';

export default function EnrollPage({ params }: { params: Promise<{ businessSlug: string; programSlug: string }> }) {
  const { businessSlug, programSlug } = use(params);
  const [enrolled, setEnrolled] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  // Demo: use first program that matches slug or fallback
  const program = demoPrograms.find(p => p.slug === programSlug) || demoPrograms[0];

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    setEnrolled(true);
  };

  if (enrolled) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative">
        <div className="absolute inset-0 gradient-radial-hero" />
        <motion.div
          className="relative max-w-sm w-full text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="w-16 h-16 rounded-full gradient-brand mx-auto mb-6 flex items-center justify-center glow-brand"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.5, times: [0, 0.6, 1] }}
          >
            <Check size={28} className="text-white" />
          </motion.div>

          <h1 className="text-2xl font-bold mb-2">¡Estás registrado!</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mb-6">
            Tu pase digital está listo. Guárdalo en tu wallet para no perderlo.
          </p>

          <div className="mb-6">
            <DigitalPassCard
              businessName={demoBusiness.name}
              programName={program.name}
              customerName={name || 'Cliente'}
              currentValue={0}
              goalValue={program.goalValue}
              rewardDetail={program.rewardDetail}
              programType={program.programType}
              bgColor={program.passBgColor}
              textColor={program.passTextColor}
              animated={true}
            />
          </div>

          <div className="space-y-3">
            <button className="btn-primary w-full !py-3 justify-center">
              <Smartphone size={16} />
              Agregar a Apple Wallet
            </button>
            <button className="btn-secondary w-full !py-3 justify-center">
              <Smartphone size={16} />
              Agregar a Google Wallet
            </button>
            <p className="text-xs text-[var(--color-text-muted)] mt-3">
              🎯 Modo demo — La integración real con Apple/Google Wallet requiere configuración adicional
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="absolute inset-0 gradient-radial-hero" />
      <div className="absolute inset-0 gradient-mesh opacity-30" />

      <motion.div
        className="relative max-w-sm w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl gradient-brand mx-auto mb-4 flex items-center justify-center">
            <span className="text-lg font-extrabold text-white/90">D</span>
          </div>
          <h1 className="text-xl font-bold">{program.name}</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">{demoBusiness.name}</p>
        </div>

        {/* Preview card */}
        <div className="mb-6">
          <DigitalPassCard
            businessName={demoBusiness.name}
            programName={program.name}
            currentValue={0}
            goalValue={program.goalValue}
            rewardDetail={program.rewardDetail}
            programType={program.programType}
            bgColor={program.passBgColor}
            textColor={program.passTextColor}
            showQR={false}
            animated={true}
            compact
          />
        </div>

        {/* Welcome message */}
        {program.welcomeMessage && (
          <p className="text-sm text-center text-[var(--color-text-secondary)] mb-6 italic">
            &ldquo;{program.welcomeMessage}&rdquo;
          </p>
        )}

        <form onSubmit={handleEnroll} className="card-surface p-5 space-y-4">
          <h2 className="text-base font-semibold text-center">Únete al programa</h2>
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Nombre</label>
            <input type="text" className="input-field" placeholder="Tu nombre completo" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Teléfono o email</label>
            <input type="text" className="input-field" placeholder="+52 55 1234 5678" value={contact} onChange={e => setContact(e.target.value)} required />
          </div>
          <label className="flex items-start gap-2 text-xs text-[var(--color-text-secondary)]">
            <input type="checkbox" required className="rounded border-[var(--color-border)] mt-0.5" />
            <span>Acepto los{' '}
              <a href="#" className="text-[var(--color-brand)] hover:underline">términos y condiciones</a>
              {' '}del programa.
            </span>
          </label>
          <button type="submit" className="btn-primary w-full justify-center !py-3">
            Registrarme
            <ArrowRight size={15} />
          </button>
        </form>

        <p className="text-center text-xs text-[var(--color-text-muted)] mt-6">
          Powered by{' '}
          <span className="font-semibold">De<span className="text-[var(--color-brand)]">Vuelta</span></span>
        </p>
      </motion.div>
    </div>
  );
}
