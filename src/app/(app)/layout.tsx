'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Star, Users, BarChart3,
  Settings, ChevronLeft, ChevronRight, LogOut,
  QrCode, Bell, Search, Menu, X, Megaphone, LucideIcon,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/app/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/app/programs', icon: Star, label: 'Tarjetas' },
  { href: '/app/operations', icon: QrCode, label: 'Operaciones' },
  { href: '/app/customers', icon: Users, label: 'Clientes' },
  { href: '/app/marketing', icon: Megaphone, label: 'Marketing' },
  { href: '/app/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/app/settings', icon: Settings, label: 'Configuración' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { business } = useAppStore();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  const handleSearchKeys = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && globalSearch.trim()) {
      router.push(`/app/customers?search=${encodeURIComponent(globalSearch.trim())}`);
      setMobileOpen(false);
    }
  };

  const primaryColor = business?.primaryColor || '#7c3aed';

  const customStyles = {
    '--color-brand': primaryColor,
    '--color-brand-light': primaryColor + 'e6',
    '--color-brand-dark': primaryColor + 'cc',
    '--color-brand-subtle': primaryColor + '15',
  } as React.CSSProperties;

  return (
    <div className="min-h-screen flex bg-[var(--color-bg-primary)] transition-colors" style={customStyles}>
      {/* Desktop Sidebar */}
      <motion.aside
        className={cn(
          'hidden lg:flex flex-col border-r border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] transition-all duration-300 shrink-0',
          collapsed ? 'w-[72px]' : 'w-[260px]'
        )}
        layout
      >
        {/* Logo */}
        <div className={cn(
          'flex items-center h-16 border-b border-[var(--color-border-subtle)] px-4 shrink-0',
          collapsed && 'justify-center'
        )}>
          <Link href="/app/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center shrink-0">
              <span className="text-sm font-extrabold text-white/90">D</span>
            </div>
            {!collapsed && (
              <motion.span
                className="text-lg font-bold tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                De<span className="text-[var(--color-brand)]">Vuelta</span>
              </motion.span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item: { href: string; icon: LucideIcon; label: string }) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  collapsed && 'justify-center px-0',
                  isActive
                    ? 'bg-[var(--color-brand-subtle)] text-[var(--color-brand-light)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-tertiary)]'
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon size={20} className="shrink-0" />
                {!collapsed && <span>{item.label}</span>}
                {isActive && !collapsed && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] ml-auto" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <div className="border-t border-[var(--color-border-subtle)] p-3">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] transition-colors"
          >
            {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /><span>Colapsar</span></>}
          </button>
        </div>

        {/* User */}
        <div className={cn(
          'border-t border-[var(--color-border-subtle)] p-3',
          collapsed && 'flex justify-center'
        )}>
          <div className={cn(
            'flex items-center gap-3',
            collapsed && 'justify-center'
          )}>
            <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center text-xs font-bold text-white/90 shrink-0">
              CM
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Carlos Mendoza</p>
                <p className="text-xs text-[var(--color-text-muted)] truncate">Café Origen</p>
              </div>
            )}
            {!collapsed && (
              <button 
                onClick={() => router.push('/login')}
                className="p-1.5 rounded-lg hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] transition-colors" 
                title="Cerrar sesión"
              >
                <LogOut size={15} />
              </button>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)]/50 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 shrink-0 sticky top-0 z-30">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} />
          </button>

          {/* Search */}
          <div className="hidden sm:flex items-center gap-2 flex-1 max-w-md">
            <div className="relative w-full">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <input
                type="text"
                placeholder="Buscar clientes, programas..."
                className="input-field !pl-9 !py-2 text-sm !bg-[var(--color-bg-primary)]"
                value={globalSearch}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGlobalSearch(e.target.value)}
                onKeyDown={handleSearchKeys}
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] relative transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--color-brand)]" />
            </button>
            <button className="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] transition-colors">
              <QrCode size={18} />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              className="absolute inset-0 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="absolute left-0 top-0 bottom-0 w-[280px] bg-[var(--color-bg-secondary)] border-r border-[var(--color-border-subtle)] flex flex-col"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              {/* Mobile header */}
              <div className="flex items-center justify-between h-16 border-b border-[var(--color-border-subtle)] px-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
                    <span className="text-sm font-extrabold text-white/90">D</span>
                  </div>
                  <span className="text-lg font-bold tracking-tight">
                    De<span className="text-[var(--color-brand)]">Vuelta</span>
                  </span>
                </div>
                <button
                  className="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)]"
                  onClick={() => setMobileOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Mobile nav */}
              <nav className="flex-1 py-4 px-3 space-y-1">
                {navItems.map((item: { href: string; icon: LucideIcon; label: string }) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                        isActive
                          ? 'bg-[var(--color-brand-subtle)] text-[var(--color-brand-light)]'
                          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-tertiary)]'
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile user */}
              <div className="border-t border-[var(--color-border-subtle)] p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center text-xs font-bold text-white/90">
                    CM
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Carlos Mendoza</p>
                    <p className="text-xs text-[var(--color-text-muted)]">Café Origen</p>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
