'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';

const navLinks = [
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#beneficios', label: 'Beneficios' },
  { href: '#casos', label: 'Casos de uso' },
  { href: '#precios', label: 'Precios' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={`
          mx-auto transition-all duration-500
          ${scrolled
            ? 'max-w-5xl mt-3 px-2'
            : 'max-w-full px-0'
          }
        `}>
          <nav className={`
            flex items-center justify-between transition-all duration-500
            ${scrolled
              ? 'glass rounded-2xl px-5 py-3 shadow-lg shadow-black/20'
              : 'bg-transparent px-6 sm:px-10 py-5'
            }
          `}>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
                <span className="text-sm font-extrabold text-white/90">D</span>
              </div>
              <span className="text-lg font-bold tracking-tight">
                De<span className="text-[var(--color-brand)]">Vuelta</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link: { href: string; label: string }) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3.5 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors rounded-lg hover:bg-white/[0.04]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className="btn-ghost text-sm"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/signup"
                className="btn-primary text-sm !py-2 !px-4"
              >
                Pruébalo gratis
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/[0.06] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="absolute top-20 left-4 right-4 bg-[var(--color-bg-secondary)] rounded-2xl border border-[var(--color-border)] p-6 shadow-2xl"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-col gap-1 mb-4">
                {navLinks.map((link: { href: string; label: string }) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="px-4 py-3 text-base font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-white/[0.04] rounded-xl transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="border-t border-[var(--color-border)] pt-4 flex flex-col gap-2">
                <Link href="/login" className="btn-secondary w-full justify-center" onClick={() => setMobileOpen(false)}>
                  Iniciar sesión
                </Link>
                <Link href="/signup" className="btn-primary w-full justify-center" onClick={() => setMobileOpen(false)}>
                  Pruébalo gratis
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
