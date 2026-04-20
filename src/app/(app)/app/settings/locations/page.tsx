'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Plus, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { demoLocations } from '@/lib/demo/data';

export default function LocationsSettingsPage() {
  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto">
      <Link href="/app/settings" className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] mb-6 transition-colors">
        <ArrowLeft size={14} /> Volver a configuración
      </Link>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sucursales</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">{demoLocations.length} sucursales configuradas.</p>
        </div>
        <button className="btn-primary"><Plus size={16} /> Agregar sucursal</button>
      </div>
      <div className="space-y-4">
        {demoLocations.map((loc, i) => (
          <motion.div key={loc.id} className="card-surface p-5 flex items-center gap-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <div className="w-11 h-11 rounded-xl bg-amber-500/15 flex items-center justify-center shrink-0">
              <MapPin size={18} className="text-amber-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold">{loc.name}</h3>
              <p className="text-sm text-[var(--color-text-muted)]">{loc.address}, {loc.city}</p>
            </div>
            <span className="badge badge-success">Activa</span>
            <button className="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]"><MoreHorizontal size={16} /></button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
