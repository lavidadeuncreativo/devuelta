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

const iconMap: Record<string, React.ElementType> = {
  Coffee, Scissors, Sparkles, UtensilsCrossed, Croissant, Dumbbell, ShoppingBag, PawPrint,
};

const steps = [
  { id: 'type', label: 'Tipo', icon: Star },
  { id: 'template', label: 'Plantilla', icon: Gift },
  { id: 'customize', label: 'Personalizar', icon: Palette },
  { id: 'preview', label: 'Vista previa', icon: Eye },
];

export default function NewProgramPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedType, setSelectedType] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<ProgramTemplate | null>(null);
  const [programName, setProgramName] = useState('');
  const [programDesc, setProgramDesc] = useState('');
  const [goalValue, setGoalValue] = useState(5);
  const [rewardDetail, setRewardDetail] = useState('');
  const [bgColor, setBgColor] = useState('#1a1a2e');
  const [textColor, setTextColor] = useState('#f0e6d3');

  const businessTypes = [
    { type: 'cafeteria', icon: Coffee, color: '#f0e6d3' },
    { type: 'barberia', icon: Scissors, color: '#e2e8f0' },
    { type: 'spa', icon: Sparkles, color: '#d4c5f9' },
    { type: 'restaurante', icon: UtensilsCrossed, color: '#fcd34d' },
    { type: 'panaderia', icon: Croissant, color: '#f5deb3' },
    { type: 'fitness', icon: Dumbbell, color: '#7dd3fc' },
    { type: 'tienda', icon: ShoppingBag, color: '#a5b4fc' },
    { type: 'veterinaria', icon: PawPrint, color: '#86efac' },
  ];

  const handleSelectType = (type: string) => {
    setSelectedType(type);
    const template = programTemplates.find(t => t.businessType === type);
    if (template) {
      setSelectedTemplate(template);
      setProgramName(template.name);
      setProgramDesc(template.description);
      setGoalValue(template.goalValue);
      setRewardDetail(template.rewardDetail);
      setBgColor(template.passBgColor);
      setTextColor(template.passTextColor);
    }
    setCurrentStep(1);
  };

  const next = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const back = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handleCreate = () => {
    // Demo: just navigate back
    router.push('/app/programs');
  };

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] mb-4 transition-colors">
          <ArrowLeft size={14} />
          Volver a programas
        </button>
        <h1 className="text-2xl font-bold tracking-tight">Nuevo programa</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Crea un programa de lealtad en minutos.
        </p>
      </div>

      {/* Step indicators */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((step, i) => (
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
        {/* Step 1: Choose business type */}
        {currentStep === 0 && (
          <motion.div
            key="step-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-semibold mb-2">¿Cuál es tu giro de negocio?</h2>
            <p className="text-sm text-[var(--color-text-secondary)] mb-6">
              Te sugeriremos una plantilla perfecta para tu tipo de negocio.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {businessTypes.map((biz) => (
                <button
                  key={biz.type}
                  onClick={() => handleSelectType(biz.type)}
                  className={cn(
                    'card-interactive p-5 text-center group',
                    selectedType === biz.type && 'border-[var(--color-brand)] bg-[var(--color-brand-subtle)]'
                  )}
                >
                  <div
                    className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ background: `${biz.color}12` }}
                  >
                    <biz.icon size={22} style={{ color: biz.color }} />
                  </div>
                  <p className="text-sm font-medium">{getBusinessTypeLabel(biz.type)}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Template selection */}
        {currentStep === 1 && selectedTemplate && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-semibold mb-2">Tu plantilla sugerida</h2>
            <p className="text-sm text-[var(--color-text-secondary)] mb-6">
              Puedes personalizar todos los detalles en el siguiente paso.
            </p>

            <div className="card-surface p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-subtle)] flex items-center justify-center shrink-0">
                  {iconMap[selectedTemplate.icon] && (() => {
                    const Icon = iconMap[selectedTemplate.icon];
                    return <Icon size={22} className="text-[var(--color-brand)]" />;
                  })()}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{selectedTemplate.name}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-3">{selectedTemplate.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="badge badge-brand">{selectedTemplate.programType === 'visits' ? 'Visitas' : 'Puntos'}</span>
                    <span className="badge badge-muted">Meta: {selectedTemplate.goalValue}</span>
                    <span className="badge badge-muted">{selectedTemplate.rewardDetail}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={back} className="btn-secondary">
                <ArrowLeft size={15} />
                Atrás
              </button>
              <button onClick={next} className="btn-primary">
                Usar esta plantilla
                <ArrowRight size={15} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Customize */}
        {currentStep === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-semibold mb-2">Personaliza tu programa</h2>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                  Ajusta el nombre, la meta y la recompensa a tu negocio.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Nombre del programa</label>
                    <input type="text" className="input-field" value={programName} onChange={e => setProgramName(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Descripción corta</label>
                    <textarea className="input-field !min-h-[80px] resize-none" value={programDesc} onChange={e => setProgramDesc(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">
                      Meta ({selectedTemplate?.programType === 'visits' ? 'visitas' : 'puntos'})
                    </label>
                    <input type="number" className="input-field" value={goalValue} onChange={e => setGoalValue(parseInt(e.target.value) || 1)} min={1} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Recompensa</label>
                    <input type="text" className="input-field" value={rewardDetail} onChange={e => setRewardDetail(e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Color de fondo del pase</label>
                      <div className="flex items-center gap-2">
                        <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border border-[var(--color-border)]" />
                        <input type="text" className="input-field flex-1" value={bgColor} onChange={e => setBgColor(e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Color de texto del pase</label>
                      <div className="flex items-center gap-2">
                        <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border border-[var(--color-border)]" />
                        <input type="text" className="input-field flex-1" value={textColor} onChange={e => setTextColor(e.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={back} className="btn-secondary">
                    <ArrowLeft size={15} />
                    Atrás
                  </button>
                  <button onClick={next} className="btn-primary">
                    Ver vista previa
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>

              {/* Live preview */}
              <div className="hidden lg:block">
                <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-4">Vista previa del pase</p>
                <DigitalPassCard
                  businessName="Tu Negocio"
                  programName={programName || 'Mi Programa'}
                  customerName="Cliente Demo"
                  currentValue={Math.min(3, goalValue - 1)}
                  goalValue={goalValue}
                  rewardDetail={rewardDetail || 'Recompensa'}
                  programType={selectedTemplate?.programType || 'visits'}
                  bgColor={bgColor}
                  textColor={textColor}
                  animated={false}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Final preview */}
        {currentStep === 3 && (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center max-w-md mx-auto">
              <h2 className="text-lg font-semibold mb-2">¡Tu programa está listo!</h2>
              <p className="text-sm text-[var(--color-text-secondary)] mb-8">
                Así se verá el pase digital de tus clientes.
              </p>

              <div className="max-w-sm mx-auto mb-8">
                <DigitalPassCard
                  businessName="Tu Negocio"
                  programName={programName}
                  customerName="Cliente Demo"
                  currentValue={Math.min(3, goalValue - 1)}
                  goalValue={goalValue}
                  rewardDetail={rewardDetail}
                  programType={selectedTemplate?.programType || 'visits'}
                  bgColor={bgColor}
                  textColor={textColor}
                  animated={true}
                />
              </div>

              <div className="flex gap-3 justify-center">
                <button onClick={back} className="btn-secondary">
                  <ArrowLeft size={15} />
                  Editar
                </button>
                <button onClick={handleCreate} className="btn-primary !py-3 !px-6">
                  <Check size={16} />
                  Crear programa
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
