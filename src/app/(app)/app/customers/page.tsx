'use client';

import { motion } from 'framer-motion';
import { Search, UserPlus, Star, Gift, ChevronRight, Users as UsersIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { demoCustomers, demoMemberships, demoPrograms } from '@/lib/demo/data';
import { formatRelativeTime } from '@/lib/utils';

export default function CustomersPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setQuery(search);
    }
  }, [searchParams]);

  const filtered = query
    ? demoCustomers.filter(c =>
        c.fullName.toLowerCase().includes(query.toLowerCase()) ||
        (c.email && c.email.toLowerCase().includes(query.toLowerCase())) ||
        (c.phone && c.phone.includes(query))
      )
    : demoCustomers;

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Clientes</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            {demoCustomers.length} clientes registrados en tu negocio.
          </p>
        </div>
        <button className="btn-primary">
          <UserPlus size={16} />
          Agregar cliente
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
        <input
          type="text"
          className="input-field !pl-9 !py-2.5"
          placeholder="Buscar por nombre, email o teléfono..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      {/* Customer list */}
      <div className="card-surface divide-y divide-[var(--color-border-subtle)]">
        {filtered.map((customer, i) => {
          const mems = demoMemberships.filter(m => m.customerId === customer.id);
          const totalVisits = mems.reduce((s, m) => s + m.totalVisits, 0);
          const rewards = mems.reduce((s, m) => s + m.rewardsEarned, 0);

          return (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: i * 0.02 }}
            >
              <Link
                href={`/app/customers/${customer.id}`}
                className="flex items-center gap-4 px-5 py-4 hover:bg-[var(--color-bg-tertiary)] transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center text-sm font-bold text-[var(--color-text-secondary)] group-hover:bg-[var(--color-brand-subtle)] group-hover:text-[var(--color-brand)] transition-colors">
                  {customer.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{customer.fullName}</p>
                  <p className="text-xs text-[var(--color-text-muted)] truncate">{customer.email || customer.phone}</p>
                </div>
                <div className="hidden sm:flex items-center gap-6 text-xs text-[var(--color-text-muted)]">
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-amber-400" />
                    <span>{totalVisits} visitas</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Gift size={12} className="text-purple-400" />
                    <span>{rewards} recomp.</span>
                  </div>
                  <span>{mems.length} prog.</span>
                </div>
                <ChevronRight size={16} className="text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </motion.div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <UsersIcon size={32} className="mx-auto text-[var(--color-text-muted)] mb-3" />
            <p className="text-sm text-[var(--color-text-secondary)]">No se encontraron clientes</p>
          </div>
        )}
      </div>
    </div>
  );
}
