'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { demoBusiness } from '@/lib/demo/data';
import { DigitalPassCard } from '@/components/features/pass/DigitalPassCard';

export default function BrandSettingsPage() {
  const [name, setName] = useState(demoBusiness.name);
  const [primaryColor, setPrimaryColor] = useState(demoBusiness.primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(demoBusiness.secondaryColor || '#f0e6d3');

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto">
      <Link href="/app/settings" className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] mb-6 transition-colors">
        <ArrowLeft size={14} /> Volver a configuración
      </Link>

      <h1 className="text-2xl font-bold tracking-tight mb-2">Marca y diseño</h1>
      <p className="text-sm text-[var(--color-text-secondary)] mb-8">Personaliza la identidad visual de tu negocio y pases digitales.</p>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="card-surface p-6 space-y-4">
            <h3 className="text-sm font-semibold">Identidad del negocio</h3>
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Nombre del negocio</label>
              <input type="text" className="input-field" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Logo</label>
              <div className="border border-dashed border-[var(--color-border)] rounded-xl p-8 text-center">
                <p className="text-sm text-[var(--color-text-muted)]">Arrastra tu logo aquí o haz clic para subir</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">PNG, SVG — Máx. 2MB</p>
              </div>
            </div>
          </div>

          <div className="card-surface p-6 space-y-4">
            <h3 className="text-sm font-semibold">Colores del pase</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Color principal</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border border-[var(--color-border)]" />
                  <input type="text" className="input-field flex-1" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Color secundario</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={secondaryColor} onChange={e => setSecondaryColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border border-[var(--color-border)]" />
                  <input type="text" className="input-field flex-1" value={secondaryColor} onChange={e => setSecondaryColor(e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          <button className="btn-primary"><Save size={15} /> Guardar cambios</button>
        </div>

        <div>
          <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-4">Vista previa del pase</p>
          <DigitalPassCard
            businessName={name}
            programName="Programa Demo"
            customerName="Cliente Demo"
            currentValue={3}
            goalValue={5}
            rewardDetail="Recompensa de ejemplo"
            programType="visits"
            bgColor={primaryColor}
            textColor={secondaryColor}
            animated={false}
          />
        </div>
      </div>
    </div>
  );
}
