'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Coffee, Scissors, Sparkles, UtensilsCrossed, Croissant, Dumbbell,
  ShoppingBag, PawPrint, ArrowRight, ArrowLeft, Check, QrCode,
  Star, Gift, UserPlus, Sparkle, Palette, Eye,
} from 'lucide-react';
import { DigitalPassCard } from '@/components/features/pass/DigitalPassCard';
import { programTemplates } from '@/lib/demo/templates';
import { cn, getBusinessTypeLabel } from '@/lib/utils';

const businessTypes = [
  { type: 'cafeteria', icon: Coffee, color: '#f0e6d3', emoji: '☕' },
  { type: 'barberia', icon: Scissors, color: '#e2e8f0', emoji: '✂️' },
  { type: 'spa', icon: Sparkles, color: '#d4c5f9', emoji: '✨' },
  { type: 'restaurante', icon: UtensilsCrossed, color: '#fcd34d', emoji: '🍽️' },
  { type: 'panaderia', icon: Croissant, color: '#f5deb3', emoji: '🥐' },
  { type: 'fitness', icon: Dumbbell, color: '#7dd3fc', emoji: '💪' },
  { type: 'tienda', icon: ShoppingBag, color: '#a5b4fc', emoji: '🛍️' },
  { type: 'veterinaria', icon: PawPrint, color: '#86efac', emoji: '🐾' },
];

const stepsConfig = [
  { label: 'Tu giro', icon: Star },
  { label: 'Plantilla', icon: Gift },
  { label: 'Tu marca', icon: Palette },
  { label: 'Vista previa', icon: Eye },
  { label: 'QR', icon: QrCode },
  { label: 'Alta cliente', icon: UserPlus },
  { label: '¡Primera visita!', icon: Sparkle },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedType, setSelectedType] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [brandColor, setBrandColor] = useState('#0d9669');
  const [visitRegistered, setVisitRegistered] = useState(false);

  const template = programTemplates.find(t => t.businessType === selectedType);

  const next = () => setStep(s => Math.min(s + 1, stepsConfig.length - 1));
  const back = () => setStep(s => Math.max(s - 1, 0));

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 gradient-radial-hero" />
      <div className="absolute inset-0 gradient-mesh opacity-30" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center">
              <span className="text-base font-extrabold text-white/90">D</span>
            </div>
            <span className="text-xl font-bold tracking-tight">
              De<span className="text-[var(--color-brand)]">Vuelta</span>
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-1 mb-8 max-w-md mx-auto">
          {stepsConfig.map((_, i) => (
            <div
              key={i}
              className={cn(
                'flex-1 h-1 rounded-full transition-all duration-500',
                i <= step ? 'bg-[var(--color-brand)]' : 'bg-[var(--color-border)]'
              )}
            />
          ))}
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          {/* Step 0: Choose business type */}
          {step === 0 && (
            <StepContainer key="s0">
              <h2 className="text-2xl font-bold text-center mb-2">¿Cuál es tu giro de negocio?</h2>
              <p className="text-sm text-[var(--color-text-secondary)] text-center mb-8">
                Te prepararemos un programa de lealtad listo para usar.
              </p>
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                {businessTypes.map(biz => (
                  <button
                    key={biz.type}
                    onClick={() => { setSelectedType(biz.type); next(); }}
                    className="card-interactive p-4 text-center group"
                  >
                    <div className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center text-xl transition-transform group-hover:scale-110" style={{ background: `${biz.color}12` }}>
                      {biz.emoji}
                    </div>
                    <p className="text-sm font-medium">{getBusinessTypeLabel(biz.type)}</p>
                  </button>
                ))}
              </div>
            </StepContainer>
          )}

          {/* Step 1: Template */}
          {step === 1 && template && (
            <StepContainer key="s1">
              <h2 className="text-2xl font-bold text-center mb-2">Tu programa sugerido</h2>
              <p className="text-sm text-[var(--color-text-secondary)] text-center mb-8">
                Basado en tu giro, te recomendamos esta plantilla.
              </p>
              <div className="card-surface p-6 max-w-md mx-auto mb-6">
                <h3 className="text-lg font-semibold mb-1">{template.name}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-3">{template.description}</p>
                <div className="flex gap-2">
                  <span className="badge badge-brand">{template.programType === 'visits' ? 'Visitas' : 'Puntos'}</span>
                  <span className="badge badge-muted">Meta: {template.goalValue}</span>
                  <span className="badge badge-muted">{template.rewardDetail}</span>
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <button onClick={back} className="btn-secondary"><ArrowLeft size={15} /> Atrás</button>
                <button onClick={next} className="btn-primary">Me gusta <ArrowRight size={15} /></button>
              </div>
            </StepContainer>
          )}

          {/* Step 2: Brand */}
          {step === 2 && (
            <StepContainer key="s2">
              <h2 className="text-2xl font-bold text-center mb-2">Personaliza tu marca</h2>
              <p className="text-sm text-[var(--color-text-secondary)] text-center mb-8">
                Estos datos aparecerán en el pase de tus clientes.
              </p>
              <div className="max-w-sm mx-auto space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Nombre de tu negocio</label>
                  <input type="text" className="input-field" value={businessName} onChange={e => setBusinessName(e.target.value)} placeholder="Mi Negocio" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Color principal</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={brandColor} onChange={e => setBrandColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border border-[var(--color-border)]" />
                    <input type="text" className="input-field flex-1" value={brandColor} onChange={e => setBrandColor(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <button onClick={back} className="btn-secondary"><ArrowLeft size={15} /> Atrás</button>
                <button onClick={next} className="btn-primary">Continuar <ArrowRight size={15} /></button>
              </div>
            </StepContainer>
          )}

          {/* Step 3: Pass preview */}
          {step === 3 && template && (
            <StepContainer key="s3">
              <h2 className="text-2xl font-bold text-center mb-2">Así se ve tu pase digital</h2>
              <p className="text-sm text-[var(--color-text-secondary)] text-center mb-8">
                Tus clientes lo guardarán en su wallet.
              </p>
              <div className="max-w-xs mx-auto mb-6">
                <DigitalPassCard
                  businessName={businessName || 'Tu Negocio'}
                  programName={template.name}
                  customerName="Cliente Demo"
                  currentValue={2}
                  goalValue={template.goalValue}
                  rewardDetail={template.rewardDetail}
                  programType={template.programType}
                  bgColor={template.passBgColor}
                  textColor={template.passTextColor}
                  animated={true}
                />
              </div>
              <div className="flex gap-3 justify-center">
                <button onClick={back} className="btn-secondary"><ArrowLeft size={15} /> Atrás</button>
                <button onClick={next} className="btn-primary">¡Se ve increíble! <ArrowRight size={15} /></button>
              </div>
            </StepContainer>
          )}

          {/* Step 4: QR */}
          {step === 4 && (
            <StepContainer key="s4">
              <h2 className="text-2xl font-bold text-center mb-2">Tu QR de inscripción</h2>
              <p className="text-sm text-[var(--color-text-secondary)] text-center mb-8">
                Comparte este código con tus clientes para que se registren.
              </p>
              <div className="max-w-xs mx-auto mb-6 text-center">
                <motion.div
                  className="w-48 h-48 mx-auto rounded-2xl bg-white p-4 mb-4"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <div className="w-full h-full rounded-lg bg-[var(--color-bg-primary)] flex items-center justify-center">
                    <QrCode size={80} className="text-[var(--color-text-muted)]" />
                  </div>
                </motion.div>
                <p className="text-xs text-[var(--color-text-muted)]">devuelta.app/enroll/{businessName ? businessName.toLowerCase().replace(/\s+/g, '-') : 'tu-negocio'}/{template?.name.toLowerCase().replace(/\s+/g, '-') || 'programa'}</p>
              </div>
              <div className="flex gap-3 justify-center">
                <button onClick={back} className="btn-secondary"><ArrowLeft size={15} /> Atrás</button>
                <button onClick={next} className="btn-primary">Simular alta de cliente <ArrowRight size={15} /></button>
              </div>
            </StepContainer>
          )}

          {/* Step 5: Simulate enrollment */}
          {step === 5 && (
            <StepContainer key="s5">
              <h2 className="text-2xl font-bold text-center mb-2">Simula el alta de un cliente</h2>
              <p className="text-sm text-[var(--color-text-secondary)] text-center mb-8">
                Así de fácil es para tus clientes inscribirse.
              </p>
              <div className="max-w-sm mx-auto space-y-4 mb-6">
                <div className="card-surface p-5">
                  <div className="text-center mb-4">
                    <h3 className="text-base font-semibold">{template?.name || 'Mi Programa'}</h3>
                    <p className="text-xs text-[var(--color-text-muted)]">{businessName || 'Tu Negocio'}</p>
                  </div>
                  <div className="space-y-3">
                    <input type="text" className="input-field" defaultValue="Sofía Hernández" placeholder="Nombre completo" />
                    <input type="tel" className="input-field" defaultValue="+52 55 1234 5678" placeholder="Teléfono o email" />
                    <label className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                      <input type="checkbox" defaultChecked className="rounded border-[var(--color-border)]" />
                      Acepto términos y condiciones
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <button onClick={back} className="btn-secondary"><ArrowLeft size={15} /> Atrás</button>
                <button onClick={next} className="btn-primary"><UserPlus size={15} /> Registrar cliente</button>
              </div>
            </StepContainer>
          )}

          {/* Step 6: First visit */}
          {step === 6 && (
            <StepContainer key="s6">
              {!visitRegistered ? (
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">¡Registra tu primera visita!</h2>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-8">
                    Haz clic para sumar el primer sello de Sofía.
                  </p>
                  <div className="max-w-xs mx-auto mb-8">
                    <DigitalPassCard
                      businessName={businessName || 'Tu Negocio'}
                      programName={template?.name || 'Mi Programa'}
                      customerName="Sofía Hernández"
                      currentValue={0}
                      goalValue={template?.goalValue || 5}
                      rewardDetail={template?.rewardDetail || 'Recompensa'}
                      programType={template?.programType || 'visits'}
                      bgColor={template?.passBgColor || '#1a1a2e'}
                      textColor={template?.passTextColor || '#f0e6d3'}
                      animated={true}
                    />
                  </div>
                  <button onClick={() => setVisitRegistered(true)} className="btn-primary !py-3 !px-6 text-base">
                    <Star size={18} />
                    Registrar visita
                  </button>
                </div>
              ) : (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full gradient-brand mx-auto mb-6 flex items-center justify-center glow-brand-strong"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.3, 1] }}
                    transition={{ duration: 0.6, times: [0, 0.6, 1] }}
                  >
                    <Check size={36} className="text-white" />
                  </motion.div>
                  <h2 className="text-2xl font-bold mb-2">¡Tu programa está activo! 🎉</h2>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                    Sofía tiene su primer sello. Así de fácil es fidelizar clientes.
                  </p>
                  <div className="max-w-xs mx-auto mb-8">
                    <DigitalPassCard
                      businessName={businessName || 'Tu Negocio'}
                      programName={template?.name || 'Mi Programa'}
                      customerName="Sofía Hernández"
                      currentValue={1}
                      goalValue={template?.goalValue || 5}
                      rewardDetail={template?.rewardDetail || 'Recompensa'}
                      programType={template?.programType || 'visits'}
                      bgColor={template?.passBgColor || '#1a1a2e'}
                      textColor={template?.passTextColor || '#f0e6d3'}
                      animated={true}
                    />
                  </div>
                  <button onClick={() => router.push('/app/dashboard')} className="btn-primary !py-3 !px-8 text-base">
                    Ir al dashboard
                    <ArrowRight size={16} />
                  </button>
                </motion.div>
              )}
            </StepContainer>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StepContainer({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
