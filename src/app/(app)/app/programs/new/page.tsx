'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Star, ArrowRight, ArrowLeft, Check, Gift,
  Coffee, Scissors, Sparkles, UtensilsCrossed,
  Croissant, Dumbbell, ShoppingBag, PawPrint,
  Eye, Palette, FileText,
} from 'lucide-react';
import { DigitalPassCard } from '@/components/features/pass/DigitalPassCard';
import { programTemplates } from '@/lib/demo/templates';
import { cn, getBusinessTypeLabel } from '@/lib/utils';
import type { ProgramTemplate } from '@/lib/types';
import { DemoProgramRepository } from '@/lib/repositories/demo-repository';
import { useAppStore } from '@/lib/store';

const iconMap: Record<string, React.ElementType> = {
  Coffee, Scissors, Sparkles, UtensilsCrossed, Croissant, Dumbbell, ShoppingBag, PawPrint,
};

const steps = [
  { id: 'type', label: 'Elegir tipo', icon: Star },
  { id: 'template', label: 'Plantilla', icon: Gift },
  { id: 'customize', label: 'Personalizar', icon: Palette },
  { id: 'preview', label: 'Finalizar', icon: Eye },
];

export default function NewProgramPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [dynamicType, setDynamicType] = useState<'loyalty' | 'giveaway'>('loyalty');
  const [selectedTemplate, setSelectedTemplate] = useState<ProgramTemplate | null>(null);
  const [programName, setProgramName] = useState('');
  const [programDesc, setProgramDesc] = useState('');
  const [goalValue, setGoalValue] = useState(5);
  const [rewardDetail, setRewardDetail] = useState('');
  const [bgColor, setBgColor] = useState('#1a1a2e');
  const [textColor, setTextColor] = useState('#f0e6d3');

  const handleSelectTemplate = (template: ProgramTemplate) => {
    setSelectedTemplate(template);
    setProgramName(template.name);
    setProgramDesc(template.description);
    setGoalValue(template.goalValue);
    setRewardDetail(template.rewardDetail);
    setBgColor(template.passBgColor);
    setTextColor(template.passTextColor);
    setCurrentStep(2);
  };

  const next = () => setCurrentStep((prev: number) => Math.min(prev + 1, steps.length - 1));
  const back = () => setCurrentStep((prev: number) => Math.max(prev - 1, 0));

  const handleCreate = async () => {
    const businessId = useAppStore.getState().business?.id || 'biz_01';
    const { addProgram } = useAppStore.getState();

    try {
      addProgram({
        businessId,
        name: programName,
        description: programDesc,
        slug: programName.toLowerCase().replace(/\s+/g, '-'),
        programType: selectedTemplate?.programType || 'visits',
        dynamicType: dynamicType,
        status: 'active',
        goalValue: goalValue,
        rewardType: selectedTemplate?.rewardType || 'free_item',
        rewardDetail: rewardDetail,
        enrollmentMode: 'open',
        visitCooldownMinutes: 60,
        allowMultipleRewards: true,
        isActive: true,
        passBgColor: bgColor,
        passTextColor: textColor
      });

      router.push('/app/programs?success=true');
    } catch (error) {
      console.error('Error creating program:', error);
      alert('Hubo un error al crear la tarjeta.');
    }
  };

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] mb-4 transition-colors">
          <ArrowLeft size={14} />
          Volver a tarjetas
        </button>
        <h1 className="text-2xl font-bold tracking-tight">Nueva Tarjeta</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Crea una nueva dinámica de lealtad o sorteo en segundos.
        </p>
      </div>

      {/* Step indicators */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((step: { id: string; label: string; icon: any }, i: number) => (
          <div key={step.id} className="flex items-center gap-2">
            <button
              onClick={() => i <= currentStep && setCurrentStep(i)}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                i === currentStep
                  ? 'bg-[var(--color-brand-subtle)] text-[var(--color-brand-light)]'
                  : i < currentStep
                  ? 'text-[var(--color-brand)] opacity-70'
                  : 'text-[var(--color-text-muted)]'
              )}
            >
              {i < currentStep ? <Check size={13} /> : <step.icon size={13} />}
              <span className="hidden sm:inline">{step.label}</span>
            </button>
            {i < steps.length - 1 && (
              <div className={cn(
                'w-8 h-px',
                i < currentStep ? 'bg-[var(--color-brand)]' : 'bg-[var(--color-border)]'
              )} />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        {/* Step 0: Type Selection */}
        {currentStep === 0 && (
          <motion.div key="step-0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-lg font-semibold mb-4">¿Qué tipo de dinámica quieres crear?</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <button 
                onClick={() => { setDynamicType('loyalty'); next(); }}
                className="card-interactive p-6 text-left border-2 border-transparent hover:border-[var(--color-brand)]"
              >
                <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center mb-4">
                  <Star size={24} />
                </div>
                <h3 className="font-bold mb-1">Tarjeta de Lealtad</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">Acumula sellos o puntos para obtener recompensas. Ideal para recurrencia.</p>
              </button>
              <button 
                onClick={() => { setDynamicType('giveaway'); next(); }}
                className="card-interactive p-6 text-left border-2 border-transparent hover:border-[var(--color-brand)]"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4">
                  <Gift size={24} />
                </div>
                <h3 className="font-bold mb-1">Tarjeta de Sorteo / Giveaway</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">Reparte boletos digitales por cada visita. Realiza sorteos entre tus clientes.</p>
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 1: Template selection */}
        {currentStep === 1 && (
          <motion.div key="step-1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-lg font-semibold mb-2">Selecciona una plantilla</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {programTemplates.map((template: ProgramTemplate) => (
                <button key={template.name} onClick={() => handleSelectTemplate(template)} className="card-interactive p-5 text-left group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-subtle)] flex items-center justify-center shrink-0">
                      {iconMap[template.icon] && React.createElement(iconMap[template.icon], { size: 22, className: "text-[var(--color-brand)]" })}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{template.name}</h3>
                      <p className="text-sm text-[var(--color-text-secondary)]">{template.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <button onClick={back} className="btn-secondary mt-8">Atrás</button>
          </motion.div>
        )}

        {/* Step 2: Customize */}
        {currentStep === 2 && (
          <motion.div key="step-2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Personaliza los detalles</h2>
                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Nombre de la {dynamicType === 'loyalty' ? 'Tarjeta' : 'Dinámica'}</label>
                  <input type="text" className="input-field" value={programName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProgramName(e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Meta ({selectedTemplate?.programType === 'visits' ? 'visitas' : 'puntos'})</label>
                  <input type="number" className="input-field" value={goalValue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGoalValue(parseInt(e.target.value) || 1)} min={1} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Recompensa / Premio</label>
                  <input type="text" className="input-field" value={rewardDetail} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRewardDetail(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Fondo</label>
                    <input type="color" value={bgColor} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBgColor(e.target.value)} className="w-full h-10 rounded-lg cursor-pointer" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Texto</label>
                    <input type="color" value={textColor} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTextColor(e.target.value)} className="w-full h-10 rounded-lg cursor-pointer" />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button onClick={back} className="btn-secondary">Atrás</button>
                  <button onClick={next} className="btn-primary">Vista Previa</button>
                </div>
              </div>
              <div className="hidden lg:block">
                <DigitalPassCard
                  businessName="Tu Negocio"
                  programName={programName || 'Nueva Tarjeta'}
                  customerName="Cliente Preview"
                  currentValue={Math.min(3, goalValue - 1)}
                  goalValue={goalValue}
                  rewardDetail={rewardDetail || 'Premio'}
                  programType={selectedTemplate?.programType || 'visits'}
                  bgColor={bgColor}
                  textColor={textColor}
                  animated={false}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Final preview */}
        {currentStep === 3 && (
          <motion.div key="step-3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center max-w-sm mx-auto">
            <h2 className="text-xl font-bold mb-6">¡Todo listo para lanzar!</h2>
            <DigitalPassCard
              businessName="Tu Negocio"
              programName={programName}
              customerName="Cliente Real"
              currentValue={0}
              goalValue={goalValue}
              rewardDetail={rewardDetail}
              programType={selectedTemplate?.programType || 'visits'}
              bgColor={bgColor}
              textColor={textColor}
              animated={true}
            />
            <div className="flex gap-3 justify-center mt-8">
              <button onClick={back} className="btn-secondary">Editar</button>
              <button onClick={handleCreate} className="btn-primary">Crear Tarjeta</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
