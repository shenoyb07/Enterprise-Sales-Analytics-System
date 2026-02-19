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
    Search,
    ChevronDown,
    Command
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    return (
        <div className="min-h-screen text-slate-100 selection:bg-cyan-500/30 overflow-x-hidden">
            <AnimatedBackground />

            {/* Top Navigation */}
            <nav className="sticky top-0 z-50 glass border-b border-white/5 py-3 px-6 md:px-12 flex items-center justify-between">
                <div className="flex items-center gap-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 group cursor-pointer"
                    >
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400 via-indigo-500 to-fuchsia-600 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)] group-hover:scale-110 transition-transform">
                            <Command size={20} className="text-white" />
                        </div>
                        <span className="text-2xl font-black uppercase tracking-tighter">Vortex <span className="text-cyan-400 neon-text-cyan">OS</span></span>
                    </motion.div>

                    <div className="hidden lg:flex items-center gap-1">
                        <NavLink href="/" icon={<LayoutDashboard size={16} />} label="Overview" active={pathname === '/'} />
                        <NavLink href="/management" icon={<TrendingUp size={16} />} label="Management" active={pathname === '/management'} />
                        <NavLink href="#" icon={<Users size={16} />} label="Entities" active={false} />
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div className="hidden md:flex items-center glass rounded-xl px-4 py-2 border-white/5 group focus-within:border-cyan-500/50 transition-all bg-white/5">
                        <Search size={16} className="text-slate-500 group-focus-within:text-cyan-400" />
                        <input
                            type="text"
                            placeholder="Search data..."
                            className="bg-transparent border-none focus:outline-none text-xs px-3 w-40 lg:w-64 text-slate-100 placeholder:text-slate-600"
                        />
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-white/10 bg-white/5">
                            <span className="text-[10px] font-bold text-slate-500">⌘K</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 border-l border-white/10 pl-8">
                        <button className="relative p-2 text-slate-400 hover:text-cyan-400 transition-colors group">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-fuchsia-500 shadow-[0_0_8px_rgba(217,70,239,0.8)] border-2 border-[#020617]" />
                        </button>

                        <div className="flex items-center gap-3 pl-4 border-l border-white/5 cursor-pointer group">
                            <div className="flex flex-col items-end hidden sm:flex">
                                <span className="text-xs font-black text-slate-200">System Admin</span>
                                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Online</span>
                            </div>
                            <div className="h-10 w-10 rounded-xl glass border-white/20 p-0.5 group-hover:border-cyan-400/50 transition-colors">
                                <img
                                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=0f172a"
                                    alt="User"
                                    className="h-full w-full rounded-[10px]"
                                />
                            </div>
                            <ChevronDown size={14} className="text-slate-500 group-hover:text-cyan-400 transition-colors" />
                        </div>
                    </div>
                </div>
            </nav>

            <main className="relative p-6 md:p-12 max-w-[1600px] mx-auto">
                {children}
            </main>

            <footer className="mt-20 border-t border-white/5 py-10 px-12 glass">
                <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Command size={18} className="text-cyan-400" />
                        <span className="text-sm font-bold text-slate-400">© 2026 Vortex Intelligence Systems. All rights reserved.</span>
                    </div>
                    <div className="flex gap-8">
                        {['Privacy', 'TOS', 'Security', 'Status'].map(item => (
                            <a key={item} href="#" className="text-xs font-bold text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-widest">{item}</a>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
};

const NavLink = ({ icon, label, href, active = false }: { icon: React.ReactNode, label: string, href: string, active?: boolean }) => (
    <Link
        href={href}
        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 group
            ${active ? 'text-cyan-400 bg-cyan-400/10' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
    >
        <span className={`${active ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`}>{icon}</span>
        {label}
    </Link>
);

