'use client';

import { use, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Users, Eye, Gift, Star, QrCode, Share2, Settings, Pause, X, Save } from 'lucide-react';
import Link from 'next/link';
import { demoPrograms, demoMemberships } from '@/lib/demo/data';
import { DigitalPassCard } from '@/components/features/pass/DigitalPassCard';
import { getProgramTypeLabel } from '@/lib/utils';
import type { LoyaltyProgram } from '@/lib/types';
import { QRCodeSVG } from 'qrcode.react';
import { useAppStore } from '@/lib/store';
import { DemoProgramRepository } from '@/lib/repositories/demo-repository';

export default function ProgramDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { programs, memberships, business } = useAppStore();
  
  const initialProgram = programs.find((p) => p.id === id) || programs[0];
  
  // State for live editing
  const [isEditing, setIsEditing] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [programData, setProgramData] = useState<LoyaltyProgram>(initialProgram);
  
  // Sync state if initialProgram changes (e.g., after a save or load)
  useEffect(() => {
    if (initialProgram) setProgramData(initialProgram);
  }, [initialProgram]);

  const members = memberships.filter(m => m.programId === initialProgram?.id);
  const totalVisits = members.reduce((s, m) => s + m.totalVisits, 0);
  const totalRedemptions = members.reduce((s, m) => s + m.rewardsRedeemed, 0);

  const handleSave = async () => {
    const programRepo = new DemoProgramRepository();
    try {
      await programRepo.update(id, programData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating program:', error);
      alert('Error al guardar los cambios.');
    }
  };

  if (!initialProgram) return <div className="p-8 text-center">Programa no encontrado</div>;

  const currentProgram = isEditing ? programData : initialProgram;
  const businessName = business?.name || 'Tu Negocio';
  const businessSlug = business?.slug || 'demo-business';

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
              <span className="badge badge-brand">{getProgramTypeLabel(currentProgram.programType)}</span>
              <span className="badge badge-success">{currentProgram.status === 'active' ? 'Activo' : currentProgram.status}</span>
            </div>
            
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Nombre del Programa</label>
                  <input type="text" className="input-field font-bold text-xl" value={programData.name} onChange={e => setProgramData({...programData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Recompensa</label>
                  <input type="text" className="input-field" value={programData.rewardDetail} onChange={e => setProgramData({...programData, rewardDetail: e.target.value})} />
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-2">{currentProgram.name}</h1>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">{currentProgram.description || 'Sin descripción'}</p>
                <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <Gift size={14} className="text-[var(--color-brand)]" />
                  <span>Recompensa: <span className="font-medium text-[var(--color-text)]">{currentProgram.rewardDetail}</span></span>
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
                <button className="btn-primary text-sm" onClick={() => setShowQRModal(true)}><QrCode size={14} /> Ver QR</button>
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
                    <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Meta ({programData.programType === 'visits' ? 'Visitas' : 'Puntos'})</label>
                    <input type="number" min={1} className="input-field" value={programData.goalValue} onChange={e => setProgramData({...programData, goalValue: Number(e.target.value)})} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Cooldown (Minutos)</label>
                    <input type="number" min={0} className="input-field" value={programData.visitCooldownMinutes} onChange={e => setProgramData({...programData, visitCooldownMinutes: Number(e.target.value)})} />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-[var(--color-border-subtle)]">
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Color Principal del Pase</label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={programData.passBgColor} onChange={e => setProgramData({...programData, passBgColor: e.target.value})} className="w-8 h-8 rounded shrink-0 cursor-pointer border border-[var(--color-border)]" />
                      <input type="text" className="input-field text-sm py-1.5" value={programData.passBgColor} onChange={e => setProgramData({...programData, passBgColor: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Color de Texto del Pase</label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={programData.passTextColor} onChange={e => setProgramData({...programData, passTextColor: e.target.value})} className="w-8 h-8 rounded shrink-0 cursor-pointer border border-[var(--color-border)]" />
                      <input type="text" className="input-field text-sm py-1.5" value={programData.passTextColor} onChange={e => setProgramData({...programData, passTextColor: e.target.value})} />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 flex gap-3 justify-end border-t border-[var(--color-border-subtle)]">
                  <button className="btn-ghost" onClick={() => { setProgramData(initialProgram); setIsEditing(false); }}>
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
                  <p>{getProgramTypeLabel(currentProgram.programType)}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-muted)] mb-1">Meta</p>
                  <p>{currentProgram.goalValue} {currentProgram.programType === 'visits' ? 'visitas' : 'puntos'}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-muted)] mb-1">Cooldown</p>
                  <p>{currentProgram.visitCooldownMinutes > 0 ? `${currentProgram.visitCooldownMinutes} minutos` : 'Sin restricción'}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-muted)] mb-1">Inscripción</p>
                  <p className="capitalize">{currentProgram.enrollmentMode}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-muted)] mb-1">Creado por</p>
                  <p>{currentProgram.createdBy || 'Sistema'}</p>
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
              businessName={businessName}
              programName={currentProgram.name || 'Nombre del Programa'}
              customerName="Cliente Demo"
              currentValue={Math.min(3, Math.max(1, currentProgram.goalValue - 1))}
              goalValue={currentProgram.goalValue || 5}
              rewardDetail={currentProgram.rewardDetail || 'Tu recompensa'}
              programType={currentProgram.programType}
              bgColor={currentProgram.passBgColor}
              textColor={currentProgram.passTextColor}
              animated={true}
            />
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQRModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQRModal(false)}
            />
            <motion.div
              className="relative bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center"
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
            >
              <button
                className="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                onClick={() => setShowQRModal(false)}
              >
                <X size={20} />
              </button>
              <div className="w-12 h-12 rounded-full gradient-brand mx-auto flex items-center justify-center mb-6">
                <QrCode size={24} className="text-white" />
              </div>
              <h2 className="text-xl font-bold tracking-tight mb-2">Escanea para unirte</h2>
              <p className="text-sm text-[var(--color-text-secondary)] mb-8">
                Muestra este código a tus clientes para que se inscriban en {currentProgram.name}.
              </p>
              <div className="bg-white p-4 rounded-xl inline-block mx-auto mb-6">
                <QRCodeSVG
                  value={`${window.location.origin}/enroll/${businessSlug}/${currentProgram.slug}`}
                  size={200}
                  level="H"
                  includeMargin={false}
                />
              </div>
              <button className="btn-secondary w-full" onClick={() => setShowQRModal(false)}>
                Cerrar
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
