'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 -z-20 overflow-hidden bg-[#020617]">
            {/* Dynamic Gradients */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute -top-[10%] -left-[10%] h-[60%] w-[60%] rounded-full bg-cyan-500/10 blur-[120px]"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                    x: [0, -100, 0],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute -bottom-[10%] -right-[10%] h-[70%] w-[70%] rounded-full bg-fuchsia-500/10 blur-[120px]"
            />

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
                }}
            />
        </div>
    );
};
