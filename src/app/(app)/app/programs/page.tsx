'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plus, Star, Users, Eye, Gift, ArrowUpRight } from 'lucide-react';
import { demoProgramStats } from '@/lib/demo/data';
import { getProgramTypeLabel } from '@/lib/utils';

export default function ProgramsPage() {
  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Programas</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Gestiona tus programas de lealtad activos.
          </p>
        </div>
        <Link href="/app/programs/new" className="btn-primary">
          <Plus size={16} />
          Crear programa
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {demoProgramStats.map((prog, i) => (
          <motion.div
            key={prog.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Link href={`/app/programs/${prog.id}`} className="card-interactive p-6 block h-full">
              <div className="flex items-center justify-between mb-4">
                <span className="badge badge-brand">{getProgramTypeLabel(prog.programType)}</span>
                <span className="badge badge-success">Activo</span>
              </div>

              <h3 className="text-lg font-semibold mb-1">{prog.name}</h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-5 line-clamp-2">{prog.description}</p>

              <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] mb-5">
                <Gift size={14} className="text-[var(--color-brand)]" />
                <span>{prog.rewardDetail}</span>
              </div>

              <div className="grid grid-cols-4 gap-3 pt-4 border-t border-[var(--color-border-subtle)]">
                <div>
                  <p className="text-lg font-bold">{prog.totalMembers}</p>
                  <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Miembros</p>
                </div>
                <div>
                  <p className="text-lg font-bold">{prog.activeMembers}</p>
                  <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Activos</p>
                </div>
                <div>
                  <p className="text-lg font-bold">{prog.totalVisits}</p>
                  <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Visitas</p>
                </div>
                <div>
                  <p className="text-lg font-bold">{prog.totalRedemptions}</p>
                  <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Canjes</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
