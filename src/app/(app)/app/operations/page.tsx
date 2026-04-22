'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  User, 
  Star, 
  Gift, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ChevronRight,
  History,
  Phone,
  Mail,
  Zap
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { DemoCustomerRepository, DemoMembershipRepository, DemoProgramRepository, DemoVisitRepository, DemoRewardRepository, DemoRedemptionRepository, DemoAuditRepository } from '@/lib/repositories/demo-repository';
import { LoyaltyService } from '@/lib/services/loyalty-service';
import { MembershipWithDetails, Customer } from '@/lib/types';
import { cn } from '@/lib/utils';
import { DigitalPassCard } from '@/components/features/pass/DigitalPassCard';

export default function OperationsPage() {
  const { business } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerMemberships, setCustomerMemberships] = useState<MembershipWithDetails[]>([]);
  const [selectedMembership, setSelectedMembership] = useState<MembershipWithDetails | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Repositories & Service
  const customerRepo = new DemoCustomerRepository();
  const membershipRepo = new DemoMembershipRepository();
  const programRepo = new DemoProgramRepository();
  const visitRepo = new DemoVisitRepository();
  const rewardRepo = new DemoRewardRepository();
  const redemptionRepo = new DemoRedemptionRepository();
  const auditRepo = new DemoAuditRepository();

  const loyaltyService = new LoyaltyService(
    programRepo,
    membershipRepo,
    visitRepo,
    rewardRepo,
    redemptionRepo,
    auditRepo
  );

  useEffect(() => {
    if (searchQuery.length >= 3) {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = async () => {
    const results = await customerRepo.search(searchQuery);
    setSearchResults(results);
  };

  const handleSelectCustomer = async (customer: Customer) => {
    setSelectedCustomer(customer);
    setSearchResults([]);
    setSearchQuery('');
    
    // Load memberships
    const memberships = await membershipRepo.getByCustomer(customer.id);
    const enriched = await Promise.all(memberships.map(async m => {
      const program = await programRepo.getById(m.programId);
      const rewards = await rewardRepo.getByMembership(m.id);
      return { ...m, customer, program: program!, rewards };
    }));
    
    setCustomerMemberships(enriched);
    if (enriched.length > 0) {
      setSelectedMembership(enriched[0]);
    }
  };

  const handleRecordVisit = async () => {
    if (!selectedMembership) return;
    setIsProcessing(true);
    setFeedback(null);

    const result = await loyaltyService.recordVisit(
      selectedMembership.id,
      useAppStore.getState().locations[0]?.id || 'loc_01',
      'staff_01'
    );

    if (result.success) {
      setFeedback({ type: 'success', message: result.message });
      // Refresh data
      handleSelectCustomer(selectedCustomer!);
    } else {
      setFeedback({ type: 'error', message: result.message });
    }
    setIsProcessing(false);
  };

  const handleRedeem = async () => {
    if (!selectedMembership) return;
    setIsProcessing(true);
    setFeedback(null);

    const result = await loyaltyService.redeemReward(
      selectedMembership.id,
      useAppStore.getState().locations[0]?.id || 'loc_01',
      'staff_01'
    );

    if (result.success) {
      setFeedback({ type: 'success', message: result.message });
      // Refresh data
      handleSelectCustomer(selectedCustomer!);
    } else {
      setFeedback({ type: 'error', message: result.message });
    }
    setIsProcessing(false);
  };

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto h-[calc(100vh-64px)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Terminal de Operaciones</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Búsqueda rápida y registro de lealtad para staff.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-brand-subtle)]/30 border border-[var(--color-border-subtle)] text-[var(--color-brand)] text-xs font-medium">
          <Zap size={14} />
          Terminal Activa: {business?.name || 'Demo Business'}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 flex-1 overflow-hidden">
        {/* Left Column: Search & Selection */}
        <div className="lg:col-span-4 flex flex-col gap-6 overflow-hidden">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[var(--color-text-muted)]">
              <Search size={18} />
            </div>
            <input
              type="text"
              className="input-field pl-10 h-12 text-base"
              placeholder="Nombre, teléfono o email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            {/* Search Results Dropdown */}
            <AnimatePresence>
              {searchResults.length > 0 && (
                <motion.div
                  className="absolute z-50 top-full left-0 right-0 mt-2 bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] rounded-xl shadow-2xl overflow-hidden max-h-[300px] overflow-y-auto"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {searchResults.map((customer) => (
                    <button
                      key={customer.id}
                      className="w-full p-4 flex items-center gap-3 hover:bg-[var(--color-bg-tertiary)] transition-colors text-left border-b border-[var(--color-border-subtle)] last:border-0"
                      onClick={() => handleSelectCustomer(customer)}
                    >
                      <div className="w-10 h-10 rounded-full bg-[var(--color-brand-subtle)] flex items-center justify-center font-bold text-[var(--color-brand)]">
                        {customer.fullName.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{customer.fullName}</p>
                        <p className="text-xs text-[var(--color-text-muted)] truncate">{customer.phone || customer.email}</p>
                      </div>
                      <ChevronRight size={16} className="text-[var(--color-text-muted)]" />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {selectedCustomer ? (
              <motion.div 
                className="card-surface p-5 border-[var(--color-brand)]/20"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold">Cliente Seleccionado</h3>
                  <button 
                    className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-brand)]"
                    onClick={() => { setSelectedCustomer(null); setSelectedMembership(null); }}
                  >
                    Cambiar
                  </button>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full gradient-brand p-0.5 shadow-lg">
                    <div className="w-full h-full rounded-full bg-[var(--color-bg-primary)] flex items-center justify-center font-bold text-xl">
                      {selectedCustomer.fullName.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{selectedCustomer.fullName}</h4>
                    <div className="flex flex-col gap-1 mt-1">
                      {selectedCustomer.phone && <p className="text-xs text-[var(--color-text-muted)] flex items-center gap-1.5"><Phone size={12} /> {selectedCustomer.phone}</p>}
                      {selectedCustomer.email && <p className="text-xs text-[var(--color-text-muted)] flex items-center gap-1.5"><Mail size={12} /> {selectedCustomer.email}</p>}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">Programas Activos</p>
                  {customerMemberships.map((m: MembershipWithDetails) => (
                    <button
                      key={m.id}
                      className={cn(
                        "w-full p-3 rounded-xl border text-left transition-all",
                        selectedMembership?.id === m.id 
                          ? "bg-[var(--color-brand-subtle)]/40 border-[var(--color-brand)]/30 ring-1 ring-[var(--color-brand)]/20 shadow-sm"
                          : "border-[var(--color-border-subtle)] hover:border-[var(--color-brand)]/20"
                      )}
                      onClick={() => setSelectedMembership(m)}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-semibold text-sm">{m.program.name}</p>
                        <span className="text-[10px] bg-[var(--color-bg-primary)] px-2 py-0.5 rounded-full border border-[var(--color-border-subtle)]">
                          {m.program.programType === 'visits' ? 'Visitas' : 'Puntos'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[var(--color-text-secondary)]">Progreso: {m.currentVisits}/{m.program.goalValue}</span>
                        {m.rewards.some((r: any) => r.status === 'available') && (
                          <span className="flex items-center gap-1 text-emerald-400 font-bold animate-pulse">
                            <Gift size={12} /> ¡Canje listo!
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-50 border-2 border-dashed border-[var(--color-border-subtle)] rounded-2xl">
                <div className="w-16 h-16 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center mb-4">
                  <User size={32} className="text-[var(--color-text-muted)]" />
                </div>
                <p className="text-sm font-medium">Busca un cliente para iniciar</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">Escribe su nombre, número o escanea su pase</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Dynamic Terminal */}
        <div className="lg:col-span-8 flex flex-col overflow-hidden">
          {selectedMembership ? (
            <div className="h-full grid md:grid-cols-2 gap-8 overflow-hidden">
              {/* Pass Preview & Rewards */}
              <div className="flex flex-col gap-6 overflow-y-auto pr-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Previsualización de Membresía</h3>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                    <CheckCircle2 size={14} /> Sincronizado
                  </div>
                </div>
                <DigitalPassCard
                  businessName={business?.name || 'Tu Negocio'}
                  programName={selectedMembership.program.name}
                  customerName={selectedCustomer?.fullName || 'Cliente'}
                  currentValue={selectedMembership.currentVisits}
                  goalValue={selectedMembership.program.goalValue}
                  rewardDetail={selectedMembership.program.rewardDetail}
                  programType={selectedMembership.program.programType}
                  bgColor={selectedMembership.program.passBgColor}
                  textColor={selectedMembership.program.passTextColor}
                  animated={true}
                  rewardAvailable={selectedMembership.rewards.some(r => r.status === 'available')}
                />

                <div className="card-surface p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <History size={16} className="text-[var(--color-brand)]" />
                    <h3 className="text-sm font-semibold">Historial del Cliente</h3>
                  </div>
                  {/* Internal Activity for this membership */}
                  <div className="space-y-3 opacity-60">
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-[var(--color-border-subtle)]">
                      <span>Última visita</span>
                      <span className="font-medium">{selectedMembership.lastVisitAt ? new Date(selectedMembership.lastVisitAt).toLocaleDateString() : 'Nunca'}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-[var(--color-border-subtle)]">
                      <span>Total visitas</span>
                      <span className="font-medium">{selectedMembership.totalVisits}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span>Recompensas canjeadas</span>
                      <span className="font-medium">{selectedMembership.rewardsRedeemed}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Terminal */}
              <div className="flex flex-col gap-6">
                <div className="flex-1 flex flex-col gap-4">
                  <h3 className="text-sm font-semibold">Panel de Control</h3>
                  
                  {/* Feedback Message */}
                  <AnimatePresence>
                    {feedback && (
                      <motion.div 
                        className={cn(
                          "p-4 rounded-xl flex items-start gap-3",
                          feedback.type === 'success' ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
                        )}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                      >
                        {feedback.type === 'success' ? <CheckCircle2 size={18} className="shrink-0 mt-0.5" /> : <AlertCircle size={18} className="shrink-0 mt-0.5" />}
                        <p className="text-sm font-medium">{feedback.message}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="grid gap-4 mt-2">
                    <button
                      className="group relative h-24 bg-[var(--color-bg-secondary)] hover:bg-[var(--color-brand)] border border-[var(--color-border-subtle)] hover:border-[var(--color-brand)] rounded-2xl overflow-hidden transition-all flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                      onClick={handleRecordVisit}
                      disabled={isProcessing}
                    >
                      <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-subtle)] flex items-center justify-center text-[var(--color-brand)] group-hover:bg-white/20 group-hover:text-white transition-colors">
                        {isProcessing ? <Loader2 size={24} className="animate-spin" /> : <Star size={24} />}
                      </div>
                      <div className="text-left group-hover:text-white">
                        <p className="text-lg font-bold">Registrar Visita</p>
                        <p className="text-xs opacity-60">+1 sello en el pase</p>
                      </div>
                    </button>

                    <button
                      className={cn(
                        "group relative h-24 overflow-hidden transition-all flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50 disabled:grayscale",
                        selectedMembership.rewards.some(r => r.status === 'available')
                          ? "bg-pink-500 text-white border-transparent shadow-lg shadow-pink-500/20"
                          : "bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] cursor-not-allowed"
                      )}
                      onClick={handleRedeem}
                      disabled={isProcessing || !selectedMembership.rewards.some(r => r.status === 'available')}
                    >
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center",
                        selectedMembership.rewards.some(r => r.status === 'available') ? "bg-white/20" : "bg-[var(--color-bg-primary)]"
                      )}>
                        {isProcessing ? <Loader2 size={24} className="animate-spin" /> : <Gift size={24} />}
                      </div>
                      <div className="text-left">
                        <p className="text-lg font-bold">Canjear Premio</p>
                        <p className="text-xs opacity-80">
                          {selectedMembership.rewards.some(r => r.status === 'available') ? '¡Listo para entregar!' : 'Aún no disponible'}
                        </p>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-[var(--color-brand-subtle)]/20 border border-[var(--color-brand)]/10 rounded-2xl">
                  <p className="text-[10px] font-bold text-[var(--color-brand)] uppercase tracking-wider mb-2">Instrucciones Staff</p>
                  <ul className="text-xs text-[var(--color-text-secondary)] space-y-2 list-disc pl-4">
                    <li>Verifica que el nombre coincida con el cliente en mostrador.</li>
                    <li>Registra la visita después del consumo/pago.</li>
                    <li>Si el botón de canje brilla en rosa, puedes entregar el beneficio.</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 opacity-30">
              <Star size={48} className="text-[var(--color-text-muted)] mb-4" />
              <h2 className="text-xl font-bold">Operación en Espera</h2>
              <p className="text-sm max-w-xs mt-2">Selecciona un cliente de la lista de la izquierda para ver su panel de control y pases disponibles.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
