'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Plus, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Location as BranchLocation } from '@/lib/types';
import { useAppStore } from '@/lib/store';

export default function LocationsSettingsPage() {
  const { locations, addLocation, updateLocation, removeLocation } = useAppStore();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: 'Ciudad de México',
    schedule: '',
  });

  const handleOpenModal = (loc?: BranchLocation) => {
    if (loc) {
      setEditingId(loc.id);
      setFormData({
        name: loc.name,
        address: loc.address || '',
        city: loc.city || 'Ciudad de México',
        schedule: loc.schedule || '',
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        address: '',
        city: 'Ciudad de México',
        schedule: '',
      });
    }
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.address) return;

    if (editingId) {
      updateLocation(editingId, formData);
    } else {
      addLocation({
        businessId: 'biz_01',
        ...formData,
        isActive: true
      });
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta sucursal?')) {
      removeLocation(id);
    }
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
        <button onClick={() => handleOpenModal()} className="btn-primary">
          <Plus size={16} /> Agregar sucursal
        </button>
      </div>

      <div className="space-y-4">
        {locations.map((loc: BranchLocation, i: number) => (
          <motion.div key={loc.id} className="card-surface p-5 flex items-center gap-4 group" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <div className="w-11 h-11 rounded-xl bg-amber-500/15 flex items-center justify-center shrink-0">
              <MapPin size={18} className="text-amber-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold">{loc.name}</h3>
              <p className="text-sm text-[var(--color-text-muted)]">{loc.address}, {loc.city}</p>
              {loc.schedule && <p className="text-xs text-[var(--color-brand)] mt-1">{loc.schedule}</p>}
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => handleOpenModal(loc)}
                className="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                <MoreHorizontal size={16} />
              </button>
              <button 
                onClick={() => handleDelete(loc.id)}
                className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
                aria-label="Eliminar sucursal"
              >
                <Plus size={16} className="rotate-45" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md card-surface p-6"
            >
              <h2 className="text-xl font-bold mb-4">{editingId ? 'Editar Sucursal' : 'Nueva Sucursal'}</h2>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Nombre</label>
                  <input type="text" className="input-field" placeholder="Ej. Sucursal Reforma" value={formData.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, name: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Dirección</label>
                  <input type="text" className="input-field" placeholder="Ej. Av. Reforma 222" value={formData.address} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, address: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Horarios</label>
                  <textarea className="input-field !min-h-[80px] resize-none" placeholder="L-V 9:00 - 18:00..." value={formData.schedule} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, schedule: e.target.value})} />
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancelar</button>
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
