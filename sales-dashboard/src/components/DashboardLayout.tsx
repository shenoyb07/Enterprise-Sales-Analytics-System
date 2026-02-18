'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedBackground } from './AnimatedBackground';
import {
    LayoutDashboard,
    TrendingUp,
    Users,
    Settings,
    Bell,
    Search
} from 'lucide-react';

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen text-slate-100 selection:bg-cyan-500/30">
            <AnimatedBackground />

            {/* Top Navigation */}
            <nav className="sticky top-0 z-50 glass border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-600 shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                        <span className="text-xl font-black uppercase tracking-tighter">Vortex <span className="text-cyan-400">Sales</span></span>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        <a href="#" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-2 py-2 border-b-2 border-cyan-400">
                            <LayoutDashboard size={18} /> Dashboard
                        </a>
                        <a href="#" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 py-2 border-b-2 border-transparent">
                            <TrendingUp size={18} /> Analytics
                        </a>
                        <a href="#" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 py-2 border-b-2 border-transparent">
                            <Users size={18} /> Customers
                        </a>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden lg:flex items-center glass rounded-full px-4 py-1.5 border-white/10 group focus-within:border-cyan-500/50 transition-all">
                        <Search size={16} className="text-slate-500 group-focus-within:text-cyan-400" />
                        <input
                            type="text"
                            placeholder="Search metrics..."
                            className="bg-transparent border-none focus:outline-none text-sm px-3 w-48 text-slate-100"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-slate-400 hover:text-cyan-400 transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                        </button>
                        <div className="h-9 w-9 rounded-full glass border-white/20 p-0.5">
                            <img
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                                alt="User"
                                className="h-full w-full rounded-full"
                            />
                        </div>
                        <button className="p-2 text-slate-400 hover:text-cyan-400 transition-colors">
                            <Settings size={20} />
                        </button>
                    </div>
                </div>
            </nav>

            <main className="p-6 md:p-12 max-w-7xl mx-auto">
                {children}
            </main>
        </div>
    );
};
