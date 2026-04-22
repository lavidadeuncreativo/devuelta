'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { DigitalPassCard } from '@/components/features/pass/DigitalPassCard';

export function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-20 pb-16"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Primary radial gradient */}
        <div className="absolute inset-0 gradient-radial-hero" />
        {/* Mesh gradient accents */}
        <div className="absolute inset-0 gradient-mesh opacity-60" />
        {/* Ambient orb - left */}
        <motion.div
          className="absolute -left-32 top-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, oklch(0.65 0.18 165 / 0.06), transparent 60%)',
          }}
          animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Ambient orb - right */}
        <motion.div
          className="absolute -right-32 bottom-1/4 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, oklch(0.60 0.12 250 / 0.05), transparent 60%)',
          }}
          animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Copy */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)]"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--color-brand)] animate-pulse-brand" />
              <span className="text-xs font-semibold text-[var(--color-text-secondary)] tracking-wide uppercase">
                Fidelización Premium. Sin fricción.
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-balance"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="block text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold tracking-[-0.03em] leading-[1.08]">
                La tarjeta de lealtad que sus
              </span>
              <span className="block text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold tracking-[-0.03em] leading-[1.08] mt-1">
                clientes <span className="font-display italic text-[var(--color-brand)]">amarán</span> cargar.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="mt-6 text-lg sm:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Reemplaza las tarjetas de cartón y las apps estorbosas por un pase digital elegante
              en <span className="text-[var(--color-text)] font-medium">Apple Wallet</span> y{' '}
              <span className="text-[var(--color-text)] font-medium">Google Wallet</span>.
              Fideliza con un solo scan.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href="/signup" className="btn-primary text-base !py-3 !px-6 group">
                Pruébalo gratis 7 días
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a href="#como-funciona" className="btn-secondary !py-3 !px-6">
                <Play size={15} className="text-[var(--color-brand)]" />
                Ver cómo funciona
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.div
              className="mt-10 flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              {/* Avatars stack */}
              <div className="flex -space-x-2">
                {['S', 'M', 'A', 'R'].map((letter, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[var(--color-bg-primary)] flex items-center justify-center text-xs font-bold"
                    style={{
                      background: [
                        'oklch(0.55 0.15 165)',
                        'oklch(0.55 0.12 250)',
                        'oklch(0.60 0.14 80)',
                        'oklch(0.55 0.16 330)',
                      ][i],
                    }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  <span className="text-[var(--color-text)] font-semibold">+200 negocios</span> ya usan DeVuelta
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right — Pass Card Showcase */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Glow behind card */}
            <div className="absolute inset-0 -m-8 rounded-[2rem]"
              style={{
                background: 'radial-gradient(ellipse at center, oklch(0.65 0.18 165 / 0.08), transparent 70%)',
              }}
            />

            {/* Main pass card */}
            <div className="relative max-w-sm mx-auto lg:max-w-none lg:ml-auto lg:mr-0">
              <HeroPassShowcase />
            </div>

            {/* Floating stat cards */}
            <motion.div
              className="absolute -left-4 sm:-left-8 bottom-8 hidden sm:block"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="glass rounded-xl px-4 py-3 flex items-center gap-3 shadow-xl shadow-black/30">
                <div className="w-9 h-9 rounded-lg bg-[var(--color-brand)]/15 flex items-center justify-center">
                  <span className="text-base">☕</span>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-muted)]">Visita registrada</p>
                  <p className="text-sm font-semibold text-[var(--color-brand)]">4 de 5 sellos</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -right-2 sm:-right-6 top-12 hidden sm:block"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className="glass rounded-xl px-4 py-3 flex items-center gap-3 shadow-xl shadow-black/30">
                <div className="w-9 h-9 rounded-lg bg-amber-500/15 flex items-center justify-center">
                  <span className="text-base">🎉</span>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-muted)]">¡Recompensa!</p>
                  <p className="text-sm font-semibold text-amber-400">Bebida gratis</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-bg-primary)] to-transparent" />
    </section>
  );
}

// ── Hero Pass Showcase — Animated transition between states ──

function HeroPassShowcase() {
  const passes = [
    {
      businessName: 'Café Origen',
      programName: 'Café de Vuelta',
      customerName: 'Sofía Hernández',
      currentValue: 4,
      goalValue: 5,
      rewardDetail: 'Bebida gratis a tu elección',
      programType: 'visits' as const,
      bgColor: '#1a1a2e',
      textColor: '#f0e6d3',
    },
    {
      businessName: 'Studio Roma',
      programName: 'Bienestar Premium',
      currentValue: 380,
      goalValue: 500,
      rewardDetail: 'Tratamiento facial de regalo',
      programType: 'points' as const,
      bgColor: '#1e1b2e',
      textColor: '#d4c5f9',
    },
    {
      businessName: 'Barbería Central',
      programName: 'Corte Frecuente',
      customerName: 'Diego Ramírez',
      currentValue: 4,
      goalValue: 4,
      rewardDetail: '30% de descuento',
      programType: 'visits' as const,
      bgColor: '#0f172a',
      textColor: '#e2e8f0',
      rewardAvailable: true,
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % passes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [passes.length]);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.97 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <DigitalPassCard
            {...passes[current]}
            animated={false}
          />
        </motion.div>
      </AnimatePresence>

      {/* Indicators */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {passes.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? 'w-8 bg-[var(--color-brand)]'
                : 'w-1.5 bg-white/20 hover:bg-white/30'
            }`}
            aria-label={`Ver pase ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
