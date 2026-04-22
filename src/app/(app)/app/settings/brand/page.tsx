'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import Link from 'next/link';
import { demoBusiness } from '@/lib/demo/data';
import { DigitalPassCard } from '@/components/features/pass/DigitalPassCard';

import { useAppStore } from '@/lib/store';

export default function BrandSettingsPage() {
  const { business, setBusiness } = useAppStore();
  
  const [name, setName] = useState(business?.name || demoBusiness.name);
  const [primaryColor, setPrimaryColor] = useState(business?.primaryColor || '#7c3aed');
  const [secondaryColor, setSecondaryColor] = useState(business?.secondaryColor || '#ffffff');
  const [logoUrl, setLogoUrl] = useState<string | undefined>(business?.logoUrl);
  const [stampIconUrl, setStampIconUrl] = useState<string | undefined>(undefined);

  const handleSave = () => {
    if (!business) return;
    setBusiness({
      ...business,
      name,
      primaryColor,
      secondaryColor,
      logoUrl,
      updatedAt: new Date().toISOString()
    });
    alert('Cambios guardados localmente.');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      setter(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto">
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
              <input type="text" className="input-field" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Logo del pase</label>
                {logoUrl ? (
                  <div className="relative border border-[var(--color-border)] rounded-xl aspect-square flex items-center justify-center bg-[var(--color-bg-secondary)] overflow-hidden group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
                    <button onClick={() => setLogoUrl(undefined)} className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <label className="border border-dashed border-[var(--color-border)] rounded-xl aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-[var(--color-brand)] hover:bg-[var(--color-brand)]/5 transition-colors">
                    <Upload size={18} className="text-[var(--color-text-muted)] mb-2" />
                    <span className="text-xs text-[var(--color-text-secondary)]">Subir logo</span>
                    <input type="file" accept="image/png, image/jpeg, image/svg+xml" className="hidden" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleImageUpload(e, setLogoUrl)} />
                  </label>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Ícono de sellos (Opcional)</label>
                {stampIconUrl ? (
                  <div className="relative border border-[var(--color-border)] rounded-xl aspect-square flex items-center justify-center bg-[var(--color-bg-secondary)] overflow-hidden group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={stampIconUrl} alt="Stamp" className="w-1/2 h-1/2 object-contain" />
                    <button onClick={() => setStampIconUrl(undefined)} className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <label className="border border-dashed border-[var(--color-border)] rounded-xl aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-[var(--color-brand)] hover:bg-[var(--color-brand)]/5 transition-colors">
                    <Upload size={18} className="text-[var(--color-text-muted)] mb-2" />
                    <span className="text-xs text-[var(--color-text-secondary)]">Subir ícono</span>
                    <input type="file" accept="image/png, image/svg+xml" className="hidden" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleImageUpload(e, setStampIconUrl)} />
                  </label>
                )}
              </div>
            </div>
            <p className="text-xs text-[var(--color-text-muted)]">Recomendamos PNG transparente o SVG. Tamaño máximo 2MB.</p>
          </div>

          <div className="card-surface p-6 space-y-4">
            <h3 className="text-sm font-semibold">Colores del pase</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Color principal (Fondo)</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={primaryColor} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrimaryColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border border-[var(--color-border)] shrink-0" />
                  <input type="text" className="input-field flex-1 text-sm" value={primaryColor} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrimaryColor(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Color secundario (Texto)</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={secondaryColor} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSecondaryColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border border-[var(--color-border)] shrink-0" />
                  <input type="text" className="input-field flex-1 text-sm" value={secondaryColor} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSecondaryColor(e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          <button onClick={handleSave} className="btn-primary w-full sm:w-auto"><Save size={15} /> Guardar cambios</button>
        </div>

        <div>
          <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-4">Vista previa del pase</p>
          <div className="sticky top-24">
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
              animated={true}
              logoUrl={logoUrl}
              stampIconUrl={stampIconUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
