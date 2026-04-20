'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push('/onboarding'), 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="absolute inset-0 gradient-radial-hero" />
      <div className="absolute inset-0 gradient-mesh opacity-30" />

      <motion.div
        className="relative w-full max-w-[400px]"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center">
              <span className="text-base font-extrabold text-white/90">D</span>
            </div>
            <span className="text-xl font-bold tracking-tight">
              De<span className="text-[var(--color-brand)]">Vuelta</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Crea tu cuenta</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">
            14 días gratis. Sin tarjeta de crédito.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card-surface p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Nombre completo</label>
            <input type="text" className="input-field" placeholder="Tu nombre" defaultValue="Carlos Mendoza" required />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Email del negocio</label>
            <input type="email" className="input-field" placeholder="tu@negocio.com" required />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Contraseña</label>
            <input type="password" className="input-field" placeholder="Mínimo 8 caracteres" required />
          </div>

          <p className="text-xs text-[var(--color-text-muted)]">
            Al crear tu cuenta, aceptas nuestros{' '}
            <a href="#" className="text-[var(--color-brand)] hover:underline">Términos de Servicio</a> y{' '}
            <a href="#" className="text-[var(--color-brand)] hover:underline">Política de Privacidad</a>.
          </p>

          <button type="submit" className="btn-primary w-full justify-center !py-2.5" disabled={loading}>
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>Crear cuenta <ArrowRight size={15} /></>
            )}
          </button>

          <div className="text-center pt-2">
            <p className="text-xs text-[var(--color-text-muted)]">
              🎯 Modo demo — Serás redirigido al onboarding
            </p>
          </div>
        </form>

        <p className="text-center text-sm text-[var(--color-text-secondary)] mt-6">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-[var(--color-brand)] font-medium hover:underline">
            Inicia sesión
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
