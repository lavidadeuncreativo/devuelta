'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  QrCode, Star, BarChart3, Smartphone,
  CreditCard, Zap, Users, TrendingUp,
  Coffee, Scissors, Sparkles, UtensilsCrossed,
  ShoppingBag, Dumbbell, PawPrint, Croissant,
  ArrowRight, Check, ChevronDown, Gift,
  Shield, Clock, Globe,
} from 'lucide-react';
import Link from 'next/link';
import { DigitalPassCard } from '@/components/features/pass/DigitalPassCard';

// ── Shared animation helpers ──

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

function SectionTitle({ badge, title, subtitle, centered = true }: {
  badge?: string; title: string; subtitle?: string; centered?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className={centered ? 'text-center max-w-2xl mx-auto mb-16' : 'mb-12'}>
      {badge && (
        <motion.p
          className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-brand)] mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          {badge}
        </motion.p>
      )}
      <motion.h2
        className="text-3xl sm:text-4xl font-bold tracking-tight text-balance"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="mt-4 text-lg text-[var(--color-text-secondary)] leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

// ── Problem Section ──

export function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const problems = [
    { icon: CreditCard, text: 'Las tarjetas físicas se pierden, se olvidan o terminan en la basura.' },
    { icon: Smartphone, text: 'Desarrollar una app propia es caro, lento y nadie la descarga.' },
    { icon: Users, text: 'Sin un sistema, no sabes quiénes son tus clientes frecuentes ni cómo retenerlos.' },
  ];

  return (
    <section ref={ref} className="py-24 sm:py-32 relative">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <SectionTitle
          badge="El problema"
          title="Tus mejores clientes se van y no puedes hacer nada."
          subtitle="El 65% de las ventas de un negocio local vienen de clientes recurrentes. Pero sin un sistema digital, los pierdes sin saberlo."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((item, i) => (
            <motion.div
              key={i}
              className="card-surface p-6 flex flex-col items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-11 h-11 rounded-xl bg-red-500/10 flex items-center justify-center">
                <item.icon size={20} className="text-red-400" />
              </div>
              <p className="text-[var(--color-text-secondary)] leading-relaxed text-[0.9375rem]">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── How It Works ──

export function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const steps = [
    {
      number: '01',
      icon: Star,
      title: 'Crea tu programa',
      description: 'Elige entre sellos, puntos o recompensas fijas. Personaliza la meta, la recompensa y el diseño del pase.',
    },
    {
      number: '02',
      icon: QrCode,
      title: 'Comparte tu QR',
      description: 'Genera un QR o link único. Tus clientes se registran en segundos y guardan el pase en su wallet.',
    },
    {
      number: '03',
      icon: BarChart3,
      title: 'Mide resultados',
      description: 'Ve quién regresa, cuántas recompensas se redimen y cómo crece la retención de tu negocio.',
    },
  ];

  return (
    <section ref={ref} id="como-funciona" className="py-24 sm:py-32 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-radial-brand opacity-40" />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-10">
        <SectionTitle
          badge="Cómo funciona"
          title="De cero a tu primer programa en 5 minutos."
          subtitle="No necesitas conocimientos técnicos. Solo elige, personaliza y comparte."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="relative"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Connector line (desktop only) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] right-[-2rem] h-px bg-gradient-to-r from-[var(--color-border)] to-transparent" />
              )}

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] mb-5 relative">
                  <step.icon size={24} className="text-[var(--color-brand)]" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--color-brand)] text-[10px] font-bold text-black flex items-center justify-center">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Use Cases Section ──

export function UseCasesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const cases = [
    { icon: Coffee, label: 'Cafeterías', example: '5 cafés → 1 gratis', color: '#f0e6d3' },
    { icon: Scissors, label: 'Barberías', example: '4 cortes → 30% desc.', color: '#e2e8f0' },
    { icon: Sparkles, label: 'Spas', example: 'Puntos → facial gratis', color: '#d4c5f9' },
    { icon: UtensilsCrossed, label: 'Restaurantes', example: '8 visitas → postre gratis', color: '#fcd34d' },
    { icon: Croissant, label: 'Panaderías', example: '6 visitas → caja gratis', color: '#f5deb3' },
    { icon: Dumbbell, label: 'Fitness', example: '10 clases → 1 gratis', color: '#7dd3fc' },
    { icon: ShoppingBag, label: 'Tiendas', example: 'Puntos → descuento', color: '#a5b4fc' },
    { icon: PawPrint, label: 'Veterinarias', example: '5 consultas → baño gratis', color: '#86efac' },
  ];

  return (
    <section ref={ref} id="casos" className="py-24 sm:py-32 relative">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <SectionTitle
          badge="Para todo tipo de negocio"
          title="Un programa de lealtad para cada giro."
          subtitle="DeVuelta funciona para cualquier negocio con recurrencia. Elige tu plantilla y empieza hoy."
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {cases.map((item, i) => (
            <motion.div
              key={i}
              className="card-interactive p-5 text-center group"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${item.color}12` }}
              >
                <item.icon size={22} style={{ color: item.color }} />
              </div>
              <p className="text-sm font-semibold mb-1">{item.label}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{item.example}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Pass Demo Section ──

export function PassDemoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 gradient-radial-brand opacity-30" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionTitle
              badge="Pase digital"
              title="Tu programa de lealtad, directo en el celular de tus clientes."
              subtitle="Un pase digital elegante que se actualiza automáticamente con cada visita. Sin apps, sin descargas, sin fricción."
              centered={false}
            />

            <div className="space-y-4 mt-4">
              {[
                'Se guarda en Apple Wallet o Google Wallet',
                'Se actualiza en tiempo real con cada visita',
                'Personalizable con tu marca y colores',
                'Notificaciones push cuando hay recompensa',
                'QR único por cada cliente',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                >
                  <div className="w-6 h-6 rounded-full bg-[var(--color-brand)]/15 flex items-center justify-center shrink-0">
                    <Check size={13} className="text-[var(--color-brand)]" />
                  </div>
                  <span className="text-sm text-[var(--color-text-secondary)]">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="relative max-w-xs mx-auto lg:max-w-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="absolute -inset-6 rounded-[2rem]"
              style={{ background: 'radial-gradient(ellipse at center, oklch(0.65 0.18 165 / 0.06), transparent 70%)' }}
            />
            <DigitalPassCard
              businessName="Café Origen"
              programName="Café de Vuelta"
              customerName="Sofía Hernández"
              currentValue={4}
              goalValue={5}
              rewardDetail="Bebida gratis a tu elección"
              programType="visits"
              bgColor="#1a1a2e"
              textColor="#f0e6d3"
              animated={true}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Benefits Section ──

export function BenefitsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const benefits = [
    { icon: TrendingUp, title: 'Más visitas repetidas', description: 'Los programas de lealtad aumentan la frecuencia de compra hasta un 35%.', color: 'var(--color-brand)' },
    { icon: Zap, title: 'Operación ultra simple', description: 'Tu staff registra visitas en 3 segundos desde un panel diseñado para mostrador.', color: '#f59e0b' },
    { icon: Shield, title: 'Sin app, sin fricción', description: 'Tus clientes no necesitan descargar nada. Todo va directo a su wallet.', color: '#6366f1' },
    { icon: BarChart3, title: 'Datos accionables', description: 'Entiende quién regresa, qué programa funciona mejor y dónde mejorar.', color: '#ec4899' },
    { icon: Clock, title: 'Listo en minutos', description: 'Elige una plantilla, personaliza y comparte tu QR. Sin configuración técnica.', color: '#14b8a6' },
    { icon: Globe, title: 'Escala sin límite', description: 'Multi-sucursal, multi-programa, multi-staff. Crece sin cambiar de plataforma.', color: '#f97316' },
  ];

  return (
    <section ref={ref} id="beneficios" className="py-24 sm:py-32 relative">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <SectionTitle
          badge="Beneficios"
          title="Todo lo que necesitas para fidelizar, nada que estorbe."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, i) => (
            <motion.div
              key={i}
              className="card-surface p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="w-11 h-11 rounded-xl mb-4 flex items-center justify-center"
                style={{ background: `${item.color}15` }}
              >
                <item.icon size={20} style={{ color: item.color }} />
              </div>
              <h3 className="text-base font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Testimonial Section ──

export function TestimonialSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const testimonials = [
    {
      quote: 'Desde que usamos DeVuelta, nuestros clientes preguntan por sus sellos cada vez que vienen. La tasa de retorno subió más de un 30%.',
      name: 'Laura Espinoza',
      role: 'Fundadora de Café Ritual',
      initials: 'LE',
    },
    {
      quote: 'Lo más valioso es la simplicidad. Mi equipo aprendió a usarlo en minutos y los clientes siempre guardan el pase en su celular.',
      name: 'Andrés Figueroa',
      role: 'Dueño de Barbería Figueroa',
      initials: 'AF',
    },
    {
      quote: 'Antes usábamos tarjetas físicas y era un desastre. Con DeVuelta tenemos todo organizado y además se ve increíble.',
      name: 'Mariana Costa',
      role: 'Gerente de Studio Beauty',
      initials: 'MC',
    },
  ];

  return (
    <section ref={ref} className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 gradient-radial-brand opacity-20" />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-10">
        <SectionTitle
          badge="Testimonios"
          title="Negocios que ya transformaron su retención."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="card-surface p-6 flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed flex-1 mb-5">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border-subtle)]">
                <div className="w-9 h-9 rounded-full gradient-brand flex items-center justify-center text-xs font-bold text-white/90">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Pricing CTA Section ──

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="precios" className="py-24 sm:py-32 relative">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 text-center">
        <SectionTitle
          badge="Precios"
          title="Empieza gratis. Escala cuando quieras."
          subtitle="Prueba DeVuelta sin compromiso durante 14 días. Sin tarjeta de crédito."
        />

        <motion.div
          className="card-surface p-8 sm:p-10 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-brand)] to-transparent" />

          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-brand)] mb-2">Pro</p>
          <div className="flex items-baseline justify-center gap-1 mb-1">
            <span className="text-4xl font-bold">$499</span>
            <span className="text-[var(--color-text-muted)]">MXN/mes</span>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] mb-8">por sucursal • facturación mensual</p>

          <div className="grid sm:grid-cols-2 gap-3 text-left mb-8 max-w-md mx-auto">
            {[
              'Programas ilimitados',
              'Clientes ilimitados',
              'Staff ilimitado',
              'Apple & Google Wallet',
              'Analytics avanzados',
              'Branding personalizado',
              'Soporte prioritario',
              'QR & links compartibles',
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <Check size={14} className="text-[var(--color-brand)] shrink-0" />
                <span className="text-sm text-[var(--color-text-secondary)]">{f}</span>
              </div>
            ))}
          </div>

          <Link href="/signup" className="btn-primary text-base !py-3 !px-8 mx-auto">
            Comenzar prueba gratis
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ── FAQ Section ──

export function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const faqs = [
    {
      q: '¿Mis clientes necesitan descargar una app?',
      a: 'No. El pase digital se guarda directamente en Apple Wallet o Google Wallet, que ya vienen instalados en todos los smartphones.',
    },
    {
      q: '¿Cómo se registra una visita?',
      a: 'Tu staff ingresa al panel y en 3 clics registra la visita. También puede escanear el QR del cliente desde el panel.',
    },
    {
      q: '¿Puedo personalizar el diseño del pase?',
      a: 'Sí. Puedes elegir colores, agregar tu logo y personalizar el mensaje de bienvenida y los términos del programa.',
    },
    {
      q: '¿Funciona para múltiples sucursales?',
      a: 'Sí. DeVuelta es multi-sucursal desde el primer día. Puedes asignar staff y ver analytics por ubicación.',
    },
    {
      q: '¿Qué pasa si un cliente pierde su teléfono?',
      a: 'Los datos están seguros en la nube. El cliente puede volver a agregar su pase desde el link original y todo su progreso estará intacto.',
    },
    {
      q: '¿Puedo cancelar en cualquier momento?',
      a: 'Sí. Sin contratos, sin letra chica. Puedes cancelar tu suscripción cuando quieras sin penalización.',
    },
  ];

  return (
    <section ref={ref} className="py-24 sm:py-32">
      <div className="max-w-2xl mx-auto px-6 sm:px-10">
        <SectionTitle
          badge="Preguntas frecuentes"
          title="¿Tienes dudas? Aquí las resolvemos."
        />

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer, index, isInView }: {
  question: string; answer: string; index: number; isInView: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="card-surface overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.05 + index * 0.06 }}
    >
      <button
        className="w-full flex items-center justify-between p-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-sm font-medium pr-4">{question}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={16} className="text-[var(--color-text-muted)] shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="px-5 pb-5 text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Final CTA ──

export function FinalCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 gradient-radial-brand opacity-30" />

      <div className="relative max-w-3xl mx-auto px-6 sm:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl gradient-brand mb-6 glow-brand">
            <Gift size={24} className="text-white/90" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-balance">
            Convierte visitas en clientes frecuentes.
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] mb-8 max-w-lg mx-auto">
            Empieza hoy con una prueba gratis de 7 días.
            Sin tarjeta de crédito. Sin compromiso.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/signup" className="btn-primary text-base !py-3 !px-8 group">
              Comenzar gratis
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/login" className="btn-secondary !py-3 !px-6">
              Ya tengo cuenta
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Footer ──

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-subtle)] py-12">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center">
              <span className="text-xs font-extrabold text-white/90">D</span>
            </div>
            <span className="text-sm font-bold tracking-tight">
              De<span className="text-[var(--color-brand)]">Vuelta</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            {['Privacidad', 'Términos', 'Contacto'].map(link => (
              <a key={link} href="#" className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors">
                {link}
              </a>
            ))}
          </div>

          <p className="text-xs text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} DeVuelta. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}


