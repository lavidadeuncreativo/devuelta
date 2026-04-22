'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plus, Star, Users, Eye, Gift, ArrowUpRight, X } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { getProgramTypeLabel } from '@/lib/utils';

export default function ProgramsPage() {
  const { programs, memberships, removeProgram } = useAppStore();

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm('¿Estás seguro de que deseas eliminar esta tarjeta? Esta acción no se puede deshacer.')) {
      removeProgram(id);
    }
  };

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tarjetas Recompensa</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Gestiona tus dinámicas de lealtad activas.
          </p>
        </div>
        <Link href="/app/programs/new" className="btn-primary">
          <Plus size={16} />
          Crear Tarjeta
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {programs.map((prog, i) => {
          const progMemberships = memberships.filter(m => m.programId === prog.id);
          const totalMembers = progMemberships.length;
          const activeMembers = progMemberships.filter(m => {
            if (!m.lastVisitAt) return false;
            const date = new Date(m.lastVisitAt);
            const daysAgo = (Date.now() - date.getTime()) / (1000 * 3600 * 24);
            return daysAgo <= 30;
          }).length;
          const totalVisits = progMemberships.reduce((sum, m) => sum + m.totalVisits, 0);
          const totalRedemptions = progMemberships.reduce((sum, m) => sum + m.rewardsEarned, 0);

          return (
            <motion.div
              key={prog.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link href={`/app/programs/${prog.id}`} className="card-interactive p-6 block h-full group relative">
                <button
                  onClick={(e) => handleDelete(e, prog.id)}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
                  aria-label="Eliminar tarjeta"
                >
                  <X size={14} />
                </button>

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
                    <p className="text-lg font-bold">{totalMembers}</p>
                    <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Miembros</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold">{activeMembers}</p>
                    <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Activos</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold">{totalVisits}</p>
                    <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Visitas</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold">{totalRedemptions}</p>
                    <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Canjes</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
