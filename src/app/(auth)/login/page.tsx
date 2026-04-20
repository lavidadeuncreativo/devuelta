'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Demo mode: skip real auth, redirect to dashboard
    setTimeout(() => {
      router.push('/app/dashboard');
    }, 800);
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
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center">
              <span className="text-base font-extrabold text-white/90">D</span>
            </div>
            <span className="text-xl font-bold tracking-tight">
              De<span className="text-[var(--color-brand)]">Vuelta</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Bienvenido de vuelta</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Ingresa a tu cuenta para gestionar tus programas de lealtad.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card-surface p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">
              Email
            </label>
            <input
              type="email"
              className="input-field"
              placeholder="tu@negocio.com"
              defaultValue="carlos@cafeorigen.mx"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="input-field !pr-10"
                placeholder="••••••••"
                defaultValue="demo1234"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-[var(--color-border)] bg-[var(--color-bg-primary)]" defaultChecked />
              <span className="text-xs text-[var(--color-text-secondary)]">Recordarme</span>
            </label>
            <a href="#" className="text-xs text-[var(--color-brand)] hover:underline">¿Olvidaste tu contraseña?</a>
          </div>

          <button
            type="submit"
            className="btn-primary w-full justify-center !py-2.5"
            disabled={loading}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>Iniciar sesión <ArrowRight size={15} /></>
            )}
          </button>

          {/* Demo notice */}
          <div className="text-center pt-2">
            <p className="text-xs text-[var(--color-text-muted)]">
              🎯 Modo demo — Haz clic en &quot;Iniciar sesión&quot; para explorar
            </p>
          </div>
        </form>

        <p className="text-center text-sm text-[var(--color-text-secondary)] mt-6">
          ¿No tienes cuenta?{' '}
          <Link href="/signup" className="text-[var(--color-brand)] font-medium hover:underline">
            Solicita tu demo
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
