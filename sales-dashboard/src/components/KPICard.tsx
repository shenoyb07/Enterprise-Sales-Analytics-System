'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

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
        cyan: 'border-cyan-500/20 shadow-cyan-500/10 text-cyan-400',
        purple: 'border-fuchsia-500/20 shadow-fuchsia-500/10 text-fuchsia-400',
        green: 'border-emerald-500/20 shadow-emerald-500/10 text-emerald-400',
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
                "glass relative flex flex-col gap-4 rounded-2xl p-6 transition-colors duration-500",
                colorStyles[color]
            )}
        >
            <div
                style={{ transform: 'translateZ(50px)' }}
                className="flex items-center justify-between"
            >
                <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-slate-400">{title}</p>
                    <h3 className="text-3xl font-bold tracking-tight text-slate-100">{value}</h3>
                </div>
                <div className={cn("rounded-xl p-3 bg-white/5", colorStyles[color])}>
                    {icon}
                </div>
            </div>

            {trend && (
                <div
                    style={{ transform: 'translateZ(30px)' }}
                    className="flex items-center gap-2"
                >
                    <span className={cn(
                        "text-xs font-semibold px-2 py-0.5 rounded-full bg-white/5",
                        trendUp ? "text-emerald-400" : "text-rose-400"
                    )}>
                        {trend}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">vs last month</span>
                </div>
            )}

            {/* Glow Effect */}
            <div className={cn(
                "absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10",
                color === 'cyan' && "bg-cyan-500/20",
                color === 'purple' && "bg-fuchsia-500/20",
                color === 'green' && "bg-emerald-500/20"
            )} />
        </motion.div>
    );
};
