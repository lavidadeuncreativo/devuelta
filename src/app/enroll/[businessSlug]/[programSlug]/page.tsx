'use client';

import { use, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Smartphone } from 'lucide-react';
import { DigitalPassCard } from '@/components/features/pass/DigitalPassCard';
import { useAppStore } from '@/lib/store';
import { DemoProgramRepository, DemoCustomerRepository, DemoMembershipRepository } from '@/lib/repositories/demo-repository';
import { DemoWalletAdapter } from '@/lib/wallet/demo-adapter';

export default function EnrollPage({ params }: { params: Promise<{ businessSlug: string; programSlug: string }> }) {
  const { businessSlug, programSlug } = use(params);
  const [enrolled, setEnrolled] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [passUrl, setPassUrl] = useState('');

  const { business, programs } = useAppStore();

  // Find business and program from slugs
  const targetBusiness = business?.slug === businessSlug ? business : null;
  const program = programs.find(p => p.slug === programSlug);

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetBusiness || !program) return;

    const customerRepo = new DemoCustomerRepository();
    const membershipRepo = new DemoMembershipRepository();
    const wallet = new DemoWalletAdapter();

    // 1. Create or get customer
    const customer = await customerRepo.create({
      businessId: targetBusiness.id,
      fullName: name,
      email: contact.includes('@') ? contact : undefined,
      phone: !contact.includes('@') ? contact : undefined,
    });

    const serial = `ps_${Date.now()}`;

    // 2. Create membership
    const membership = await membershipRepo.create({
      customerId: customer.id,
      programId: program.id,
      businessId: targetBusiness.id,
      currentVisits: 0,
      currentPoints: 0,
      totalVisits: 0,
      totalPoints: 0,
      rewardsEarned: 0,
      rewardsRedeemed: 0,
      status: 'active',
      passSerial: serial,
      walletPlatform: 'none'
    });

    // 3. Create Demo Pass
    const walletResult = await wallet.createPass({
      serialNumber: serial,
      customerName: name,
      programName: program.name,
      points: 0,
      goal: program.goalValue,
      reward: program.rewardDetail,
      bgColor: program.passBgColor,
      textColor: program.passTextColor
    });

    setPassUrl(walletResult.saveUrl);
    setEnrolled(true);
  };

  if (!targetBusiness || !program) {
    return <div className="min-h-screen flex items-center justify-center">Negocio o programa no encontrado</div>;
  }

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
              businessName={targetBusiness.name}
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
            <button className="btn-primary w-full !py-3 justify-center" onClick={() => window.open(passUrl, '_blank')}>
              <Smartphone size={16} />
              Ver Pase Digital
            </button>
            <button className="btn-secondary w-full !py-3 justify-center opacity-60">
              <Smartphone size={16} />
              Agregar a Apple Wallet
            </button>
            <button className="btn-secondary w-full !py-3 justify-center opacity-60">
              <Smartphone size={16} />
              Agregar a Google Wallet
            </button>
            <p className="text-xs text-[var(--color-text-muted)] mt-4">
              ✨ Membresía registrada con éxito.
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
          <p className="text-sm text-[var(--color-text-secondary)]">{targetBusiness.name}</p>
        </div>

        {/* Preview card */}
        <div className="mb-6">
          <DigitalPassCard
            businessName={targetBusiness.name}
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
