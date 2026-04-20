import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toLocaleString();
}

export function formatCurrency(amount: number, currency = 'MXN'): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Ahora';
  if (minutes < 60) return `Hace ${minutes}m`;
  if (hours < 24) return `Hace ${hours}h`;
  if (days < 7) return `Hace ${days}d`;
  if (days < 30) return `Hace ${Math.floor(days / 7)} sem`;
  return date.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function generatePassSerial(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = 'DV-';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export function getProgressPercentage(current: number, goal: number): number {
  return Math.min(Math.round((current / goal) * 100), 100);
}

export function getBusinessTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    cafeteria: 'Cafetería',
    barberia: 'Barbería',
    spa: 'Spa & Bienestar',
    restaurante: 'Restaurante',
    panaderia: 'Panadería',
    fitness: 'Fitness & Gym',
    tienda: 'Tienda',
    veterinaria: 'Veterinaria',
    estudio_tatuaje: 'Estudio de Tatuaje',
    otro: 'Otro',
  };
  return labels[type] || type;
}

export function getProgramTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    visits: 'Visitas / Sellos',
    points: 'Puntos por compra',
    fixed_reward: 'Recompensa fija',
  };
  return labels[type] || type;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active: 'text-emerald-400',
    draft: 'text-amber-400',
    paused: 'text-orange-400',
    archived: 'text-zinc-500',
    completed: 'text-blue-400',
    expired: 'text-red-400',
    available: 'text-emerald-400',
    redeemed: 'text-blue-400',
    trial: 'text-amber-400',
  };
  return colors[status] || 'text-zinc-400';
}
