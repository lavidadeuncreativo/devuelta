'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Eye, Gift, Star, QrCode, Share2, Settings, Pause, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { demoPrograms, demoMemberships } from '@/lib/demo/data';
import { DigitalPassCard } from '@/components/features/pass/DigitalPassCard';
import { getProgramTypeLabel, getProgressPercentage } from '@/lib/utils';

export default function ProgramDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const program = demoPrograms.find(p => p.id === id) || demoPrograms[0];
  const members = demoMemberships.filter(m => m.programId === program.id);
  const totalVisits = members.reduce((s, m) => s + m.totalVisits, 0);
  const totalRedemptions = members.reduce((s, m) => s + m.rewardsRedeemed, 0);

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto">
      <Link href="/app/programs" className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] mb-6 transition-colors">
        <ArrowLeft size={14} />
        Volver a programas
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <motion.div
            className="card-surface p-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="badge badge-brand">{getProgramTypeLabel(program.programType)}</span>
              <span className="badge badge-success">Activo</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">{program.name}</h1>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">{program.description}</p>
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
              <Gift size={14} className="text-[var(--color-brand)]" />
              <span>Recompensa: <span className="font-medium text-[var(--color-text)]">{program.rewardDetail}</span></span>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { icon: Users, label: 'Miembros', value: members.length, color: 'var(--color-brand)' },
              { icon: Eye, label: 'Visitas', value: totalVisits, color: '#f59e0b' },
              { icon: Gift, label: 'Canjes', value: totalRedemptions, color: '#ec4899' },
              { icon: Star, label: 'Activos', value: members.filter(m => m.status === 'active').length, color: '#6366f1' },
            ].map((s, i) => (
              <motion.div key={i} className="card-surface p-4 text-center" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.05 }}>
                <div className="w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center" style={{ background: `${s.color}15` }}>
                  <s.icon size={14} style={{ color: s.color }} />
                </div>
                <p className="text-xl font-bold">{s.value}</p>
                <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Actions */}
          <div className="card-surface p-5">
            <h3 className="text-sm font-semibold mb-3">Acciones</h3>
            <div className="flex flex-wrap gap-2">
              <button className="btn-primary text-sm"><QrCode size={14} /> Ver QR</button>
              <button className="btn-secondary text-sm"><Share2 size={14} /> Compartir link</button>
              <button className="btn-ghost text-sm"><Settings size={14} /> Editar</button>
              <button className="btn-ghost text-sm text-amber-400"><Pause size={14} /> Pausar</button>
            </div>
          </div>

          {/* Program config */}
          <div className="card-surface p-5">
            <h3 className="text-sm font-semibold mb-4">Configuración</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-[var(--color-text-muted)] mb-1">Tipo</p>
                <p>{getProgramTypeLabel(program.programType)}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-muted)] mb-1">Meta</p>
                <p>{program.goalValue} {program.programType === 'visits' ? 'visitas' : 'puntos'}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-muted)] mb-1">Cooldown</p>
                <p>{program.visitCooldownMinutes > 0 ? `${program.visitCooldownMinutes} minutos` : 'Sin restricción'}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-muted)] mb-1">Múltiples recompensas</p>
                <p>{program.allowMultipleRewards ? 'Sí' : 'No'}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-muted)] mb-1">Inscripción</p>
                <p className="capitalize">{program.enrollmentMode}</p>
              </div>
            </div>
            {program.terms && (
              <div className="mt-4 pt-4 border-t border-[var(--color-border-subtle)]">
                <p className="text-xs text-[var(--color-text-muted)] mb-1">Términos</p>
                <p className="text-sm text-[var(--color-text-secondary)]">{program.terms}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right — Pass preview */}
        <div>
          <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-4">Vista previa del pase</p>
          <DigitalPassCard
            businessName="Café Origen"
            programName={program.name}
            customerName="Cliente Demo"
            currentValue={Math.min(3, program.goalValue - 1)}
            goalValue={program.goalValue}
            rewardDetail={program.rewardDetail}
            programType={program.programType}
            bgColor={program.passBgColor}
            textColor={program.passTextColor}
            animated={true}
          />
        </div>
      </div>
    </div>
  );
}
