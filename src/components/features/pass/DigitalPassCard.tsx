'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Star, Gift, QrCode, ChevronRight, Check, Sparkles } from 'lucide-react';
import { cn, getProgressPercentage } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface DigitalPassCardProps {
  businessName: string;
  programName: string;
  customerName?: string;
  currentValue: number;
  goalValue: number;
  rewardDetail: string;
  programType: 'visits' | 'points' | 'fixed_reward';
  bgColor?: string;
  textColor?: string;
  rewardAvailable?: boolean;
  className?: string;
  showQR?: boolean;
  animated?: boolean;
  compact?: boolean;
}

export function DigitalPassCard({
  businessName,
  programName,
  customerName,
  currentValue,
  goalValue,
  rewardDetail,
  programType,
  bgColor = '#1a1a2e',
  textColor = '#f0e6d3',
  rewardAvailable = false,
  className,
  showQR = true,
  animated = true,
  compact = false,
}: DigitalPassCardProps) {
  const progress = getProgressPercentage(currentValue, goalValue);
  const isVisitType = programType === 'visits';
  const stamps = isVisitType ? Array.from({ length: goalValue }, (_, i) => i < currentValue) : [];

  return (
    <motion.div
      className={cn(
        'relative overflow-hidden select-none',
        compact ? 'rounded-2xl' : 'rounded-3xl',
        className
      )}
      style={{ background: bgColor, color: textColor }}
      initial={animated ? { opacity: 0, y: 20, scale: 0.95 } : false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Ambient light effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 70% -10%, ${textColor}11 0%, transparent 70%)`,
        }}
      />

      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className={cn('relative z-10', compact ? 'p-5' : 'p-6 sm:p-8')}>
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.15em] mb-1"
              style={{ color: `${textColor}88` }}
            >
              {businessName}
            </p>
            <h3 className={cn(
              'font-semibold tracking-tight',
              compact ? 'text-lg' : 'text-xl sm:text-2xl'
            )}>
              {programName}
            </h3>
          </div>

          {/* Reward status badge */}
          <AnimatePresence>
            {rewardAvailable && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                style={{
                  background: `${textColor}18`,
                  border: `1px solid ${textColor}30`,
                }}
              >
                <Gift size={13} />
                Recompensa
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Customer name */}
        {customerName && (
          <p
            className="text-sm font-medium mb-5"
            style={{ color: `${textColor}99` }}
          >
            {customerName}
          </p>
        )}

        {/* Stamps grid (for visit-type programs) */}
        {isVisitType && goalValue <= 12 && (
          <div className="mb-6">
            <div className={cn(
              'grid gap-2',
              goalValue <= 5 ? 'grid-cols-5' :
              goalValue <= 8 ? 'grid-cols-4' :
              'grid-cols-6'
            )}>
              {stamps.map((filled, i) => (
                <motion.div
                  key={i}
                  className={cn(
                    'aspect-square rounded-xl flex items-center justify-center transition-all duration-300',
                    compact ? 'rounded-lg' : 'rounded-xl'
                  )}
                  style={{
                    background: filled ? `${textColor}20` : `${textColor}08`,
                    border: `1px solid ${filled ? `${textColor}35` : `${textColor}12`}`,
                  }}
                  initial={animated ? { opacity: 0, scale: 0.5 } : false}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: animated ? 0.1 + i * 0.06 : 0, duration: 0.4 }}
                >
                  <AnimatePresence mode="wait">
                    {filled ? (
                      <motion.div
                        key="filled"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      >
                        <Star
                          size={compact ? 16 : 20}
                          fill={textColor}
                          color={textColor}
                          className="drop-shadow-sm"
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty"
                        style={{ color: `${textColor}25` }}
                      >
                        <Star size={compact ? 14 : 18} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Points / progress display (for points-type programs) */}
        {!isVisitType && (
          <div className="mb-6">
            <div className="flex items-end justify-between mb-3">
              <div>
                <motion.span
                  className={cn(
                    'font-bold tracking-tight',
                    compact ? 'text-3xl' : 'text-4xl'
                  )}
                  initial={animated ? { opacity: 0 } : false}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <AnimatedCounter value={currentValue} animated={animated} />
                </motion.span>
                <span className="text-sm ml-1" style={{ color: `${textColor}66` }}>
                  / {goalValue} pts
                </span>
              </div>
              <span
                className="text-sm font-semibold"
                style={{ color: `${textColor}88` }}
              >
                {progress}%
              </span>
            </div>

            {/* Progress bar */}
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ background: `${textColor}10` }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: textColor }}
                initial={animated ? { width: 0 } : false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              />
            </div>
          </div>
        )}

        {/* Reward detail */}
        <div
          className={cn(
            'flex items-center gap-3 rounded-xl',
            compact ? 'p-3' : 'p-4'
          )}
          style={{
            background: rewardAvailable ? `${textColor}15` : `${textColor}06`,
            border: `1px solid ${rewardAvailable ? `${textColor}25` : `${textColor}08`}`,
          }}
        >
          <div
            className={cn(
              'flex items-center justify-center rounded-lg shrink-0',
              compact ? 'w-8 h-8' : 'w-10 h-10'
            )}
            style={{
              background: rewardAvailable ? `${textColor}20` : `${textColor}10`,
            }}
          >
            {rewardAvailable ? (
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Sparkles size={compact ? 16 : 20} />
              </motion.div>
            ) : (
              <Gift size={compact ? 16 : 20} style={{ color: `${textColor}60` }} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="text-xs font-medium uppercase tracking-wider mb-0.5"
              style={{ color: `${textColor}60` }}
            >
              {rewardAvailable ? 'Recompensa disponible' : 'Tu siguiente recompensa'}
            </p>
            <p className={cn('font-semibold truncate', compact ? 'text-sm' : 'text-base')}>
              {rewardDetail}
            </p>
          </div>
          {rewardAvailable && (
            <ChevronRight size={18} style={{ color: `${textColor}50` }} />
          )}
        </div>

        {/* QR Code area */}
        {showQR && (
          <div className="mt-5 pt-5" style={{ borderTop: `1px solid ${textColor}10` }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <QrCode size={16} style={{ color: `${textColor}40` }} />
                <span className="text-xs font-medium" style={{ color: `${textColor}40` }}>
                  DV-X8K4M2P9
                </span>
              </div>
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ background: `${textColor}10` }}
              >
                <QrCode size={28} style={{ color: `${textColor}50` }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reward available celebration effect */}
      <AnimatePresence>
        {rewardAvailable && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: `radial-gradient(circle at 50% 100%, ${textColor}08 0%, transparent 50%)`,
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Animated Counter Component ──

function AnimatedCounter({ value, animated }: { value: number; animated: boolean }) {
  const [displayValue, setDisplayValue] = useState(animated ? 0 : value);

  useEffect(() => {
    if (!animated) {
      setDisplayValue(value);
      return;
    }
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.round(start + (value - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value, animated]);

  return <>{displayValue}</>;
}
