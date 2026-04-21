'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Plus, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function LocationsSettingsPage() {
  const { locations, addLocation } = useAppStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLocName, setNewLocName] = useState('');
  const [newLocAddress, setNewLocAddress] = useState('');
  const [newLocCity, setNewLocCity] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocName || !newLocAddress) return;
    addLocation({
      businessId: 'biz_1',
      name: newLocName,
      address: newLocAddress,
      city: newLocCity || 'Ciudad de México',
      isActive: true
    });
    setShowAddModal(false);
    setNewLocName('');
    setNewLocAddress('');
    setNewLocCity('');
  };

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto">
      <Link href="/app/settings" className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] mb-6 transition-colors">
        <ArrowLeft size={14} /> Volver a configuración
      </Link>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sucursales</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">{locations.length} sucursales configuradas.</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary"><Plus size={16} /> Agregar sucursal</button>
      </div>
      <div className="space-y-4">
        {locations.map((loc, i) => (
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

      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md card-surface p-6"
            >
              <h2 className="text-xl font-bold mb-4">Nueva Sucursal</h2>
              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nombre</label>
                  <input type="text" className="input-field" placeholder="Ej. Sucursal Centro" value={newLocName} onChange={e => setNewLocName(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Dirección</label>
                  <input type="text" className="input-field" placeholder="Ej. Av. Reforma 222" value={newLocAddress} onChange={e => setNewLocAddress(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Ciudad</label>
                  <input type="text" className="input-field" placeholder="Ej. Ciudad de México" value={newLocCity} onChange={e => setNewLocCity(e.target.value)} />
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary flex-1">Cancelar</button>
                  <button type="submit" className="btn-primary flex-1">Guardar</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
