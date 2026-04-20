'use client';

import { use, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Users, Eye, Gift, Star, QrCode, Share2, Settings, Pause, X, Save } from 'lucide-react';
import Link from 'next/link';
import { demoPrograms, demoMemberships } from '@/lib/demo/data';
import { DigitalPassCard } from '@/components/features/pass/DigitalPassCard';
import { getProgramTypeLabel } from '@/lib/utils';
import type { LoyaltyProgram } from '@/lib/types';

export default function ProgramDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const initialProgram = demoPrograms.find(p => p.id === id) || demoPrograms[0];
  
  // State for live editing
  const [isEditing, setIsEditing] = useState(false);
  const [program, setProgram] = useState<LoyaltyProgram>(initialProgram);
  
  const members = demoMemberships.filter(m => m.programId === program.id);
  const totalVisits = members.reduce((s, m) => s + m.totalVisits, 0);
  const totalRedemptions = members.reduce((s, m) => s + m.rewardsRedeemed, 0);

  const handleSave = () => {
    // In a real app, this would be an API call
    setIsEditing(false);
  };

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto pb-24">
      <Link href="/app/programs" className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] mb-6 transition-colors">
        <ArrowLeft size={14} />
        Volver a programas
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <motion.div
            className="card-surface p-6 relative overflow-hidden"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="badge badge-brand">{getProgramTypeLabel(program.programType)}</span>
              <span className="badge badge-success">Activo</span>
            </div>
            
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Nombre del Programa</label>
                  <input type="text" className="input-field font-bold text-xl" value={program.name} onChange={e => setProgram({...program, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Recompensa</label>
                  <input type="text" className="input-field" value={program.rewardDetail} onChange={e => setProgram({...program, rewardDetail: e.target.value})} />
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-2">{program.name}</h1>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">{program.description || 'Sin descripción'}</p>
                <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <Gift size={14} className="text-[var(--color-brand)]" />
                  <span>Recompensa: <span className="font-medium text-[var(--color-text)]">{program.rewardDetail}</span></span>
                </div>
              </>
            )}
          </motion.div>

          {/* Stats */}
          {!isEditing && (
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
          )}

          {/* Actions */}
          {!isEditing && (
            <div className="card-surface p-5">
              <h3 className="text-sm font-semibold mb-3">Acciones</h3>
              <div className="flex flex-wrap gap-2">
                <button className="btn-primary text-sm"><QrCode size={14} /> Ver QR</button>
                <button className="btn-secondary text-sm"><Share2 size={14} /> Compartir link</button>
                <button className="btn-ghost text-sm" onClick={() => setIsEditing(true)}><Settings size={14} /> Editar diseño y reglas</button>
                <button className="btn-ghost text-sm text-amber-400"><Pause size={14} /> Pausar</button>
              </div>
            </div>
          )}

          {/* Program config */}
          <div className="card-surface p-5">
            <h3 className="text-sm font-semibold mb-4">Configuración del Programa</h3>
            
            {isEditing ? (
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Meta ({program.programType === 'visits' ? 'Visitas' : 'Puntos'})</label>
                    <input type="number" min={1} className="input-field" value={program.goalValue} onChange={e => setProgram({...program, goalValue: Number(e.target.value)})} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Cooldown (Minutos)</label>
                    <input type="number" min={0} className="input-field" value={program.visitCooldownMinutes} onChange={e => setProgram({...program, visitCooldownMinutes: Number(e.target.value)})} />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-[var(--color-border-subtle)]">
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Color Principal del Pase</label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={program.passBgColor} onChange={e => setProgram({...program, passBgColor: e.target.value})} className="w-8 h-8 rounded shrink-0 cursor-pointer border border-[var(--color-border)]" />
                      <input type="text" className="input-field text-sm py-1.5" value={program.passBgColor} onChange={e => setProgram({...program, passBgColor: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Color de Texto del Pase</label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={program.passTextColor} onChange={e => setProgram({...program, passTextColor: e.target.value})} className="w-8 h-8 rounded shrink-0 cursor-pointer border border-[var(--color-border)]" />
                      <input type="text" className="input-field text-sm py-1.5" value={program.passTextColor} onChange={e => setProgram({...program, passTextColor: e.target.value})} />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 flex gap-3 justify-end border-t border-[var(--color-border-subtle)]">
                  <button className="btn-ghost" onClick={() => { setProgram(initialProgram); setIsEditing(false); }}>
                    <X size={15} /> Cancelar
                  </button>
                  <button className="btn-primary" onClick={handleSave}>
                    <Save size={15} /> Guardar cambios
                  </button>
                </div>
              </div>
            ) : (
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
                  <p className="text-xs text-[var(--color-text-muted)] mb-1">Inscripción</p>
                  <p className="capitalize">{program.enrollmentMode}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right — Pass preview */}
        <div>
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Vista previa del pase</p>
              {isEditing && (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-brand)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-brand)]"></span>
                </span>
              )}
            </div>
            <DigitalPassCard
              businessName="Café Origen"
              programName={program.name || 'Nombre del Programa'}
              customerName="Cliente Demo"
              currentValue={Math.min(3, Math.max(1, program.goalValue - 1))}
              goalValue={program.goalValue || 5}
              rewardDetail={program.rewardDetail || 'Tu recompensa'}
              programType={program.programType}
              bgColor={program.passBgColor}
              textColor={program.passTextColor}
              animated={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
