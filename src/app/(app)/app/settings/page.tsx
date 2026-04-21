'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Palette, MapPin, Users, Settings as SettingsIcon } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { getBusinessTypeLabel } from '@/lib/utils';

export default function SettingsPage() {
  const { business, locations, users } = useAppStore();

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Configuración</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Gestiona tu negocio, marca, sucursales y equipo.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { href: '/app/settings/brand', icon: Palette, label: 'Marca y diseño', desc: 'Logo, colores y personalización del pase', color: 'var(--color-brand)' },
          { href: '/app/settings/locations', icon: MapPin, label: 'Sucursales', desc: `${locations.length} sucursales configuradas`, color: '#f59e0b' },
          { href: '/app/settings/team', icon: Users, label: 'Equipo', desc: `${users.length} miembros del equipo`, color: '#6366f1' },
          { href: '#', icon: SettingsIcon, label: 'General', desc: 'Datos del negocio, timezone, moneda', color: '#ec4899' },
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
            <Link href={item.href} className="card-interactive p-6 block">
              <div className="w-11 h-11 rounded-xl mb-4 flex items-center justify-center" style={{ background: `${item.color}15` }}>
                <item.icon size={20} style={{ color: item.color }} />
              </div>
              <h3 className="text-base font-semibold mb-1">{item.label}</h3>
              <p className="text-sm text-[var(--color-text-muted)]">{item.desc}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Business info preview */}
      {business && (
        <motion.div
          className="card-surface p-6 mt-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-sm font-semibold mb-4">Información del negocio</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-[var(--color-text-muted)] mb-1">Nombre</p>
              <p className="font-medium">{business.name}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)] mb-1">Tipo de negocio</p>
              <p className="font-medium">{getBusinessTypeLabel(business.businessType)}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)] mb-1">Email</p>
              <p className="font-medium">{business.contactEmail}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)] mb-1">Teléfono</p>
              <p className="font-medium">{business.contactPhone}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)] mb-1">Zona horaria</p>
              <p className="font-medium">{business.timezone}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)] mb-1">Suscripción</p>
              <span className="badge badge-success">Activa</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
