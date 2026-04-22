'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, UserPlus, MoreHorizontal, Shield } from 'lucide-react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { User } from '@/lib/types';

export default function TeamSettingsPage() {
  const { users } = useAppStore();
  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto">
      <Link href="/app/settings" className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] mb-6 transition-colors">
        <ArrowLeft size={14} /> Volver a configuración
      </Link>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Equipo</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">{users.length} miembros del equipo.</p>
        </div>
        <button className="btn-primary"><UserPlus size={16} /> Invitar miembro</button>
      </div>
      <div className="space-y-3">
        {users.map((user: User, i: number) => (
          <motion.div key={user.id} className="card-surface p-5 flex items-center gap-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <div className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center text-sm font-bold text-white/90">
              {user.fullName.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{user.fullName}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{user.email}</p>
            </div>
            <span className={`badge ${user.role === 'business_admin' ? 'badge-brand' : 'badge-muted'}`}>
              <Shield size={10} />
              {user.role === 'business_admin' ? 'Admin' : 'Staff'}
            </span>
            <button className="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]"><MoreHorizontal size={16} /></button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
