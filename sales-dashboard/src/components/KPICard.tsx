'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface KPICardProps {
    title: string;
    value: string;
    trend?: string;
    trendUp?: boolean;
    icon: React.ReactNode;
    color: 'cyan' | 'purple' | 'green';
}

export const KPICard = ({ title, value, trend, trendUp, icon, color }: KPICardProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const colorStyles = {
        cyan: 'border-cyan-500/20 shadow-cyan-500/5 text-cyan-400',
        purple: 'border-fuchsia-500/20 shadow-fuchsia-500/5 text-fuchsia-400',
        green: 'border-emerald-500/20 shadow-emerald-500/5 text-emerald-400',
    };

    const iconStyles = {
        cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        purple: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
        green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: 'preserve-3d',
            }}
            className={cn(
                "glass glass-hover relative flex flex-col gap-6 rounded-2xl p-6 overflow-hidden",
                colorStyles[color]
            )}
        >
            <div
                style={{ transform: 'translateZ(50px)' }}
                className="flex items-start justify-between"
            >
                <div className="flex flex-col gap-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{title}</p>
                    <h3 className="text-3xl font-black tracking-tighter text-slate-100">{value}</h3>
                </div>
                <div className={cn("rounded-xl p-3 border", iconStyles[color])}>
                    {icon}
                </div>
            </div>

            {trend && (
                <div
                    style={{ transform: 'translateZ(30px)' }}
                    className="flex items-center justify-between"
                >
                    <div className="flex items-center gap-1.5">
                        <span className={cn(
                            "flex items-center gap-0.5 text-[10px] font-black px-2 py-0.5 rounded-full border",
                            trendUp
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        )}>
                            {trendUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                            {trend}
                        </span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Growth</span>
                    </div>
                </div>
            )}

            {/* Subtle Gradient Glow */}
            <div className={cn(
                "absolute -bottom-10 -right-10 w-32 h-32 blur-3xl rounded-full -z-10 opacity-30",
                color === 'cyan' && "bg-cyan-500",
                color === 'purple' && "bg-fuchsia-500",
                color === 'green' && "bg-emerald-500"
            )} />
        </motion.div>
    );
};

