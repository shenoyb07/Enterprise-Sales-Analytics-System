'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  ShoppingCart,
  Users,
  Target,
  Trophy,
  ArrowUpRight,
  Activity,
  Zap,
  Globe,
  PieChart as PieChartIcon
} from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { KPICard } from '@/components/KPICard';
import { RevenueChart } from '@/components/RevenueChart';
import { TopProducts } from '@/components/TopProducts';
import { RecentTransactions } from '@/components/RecentTransactions';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<any>(null);

  const mockSummary = {
    total_revenue: 1245000,
    total_orders: 8740,
    total_customers: 342,
    avg_order_value: 142.45,
    growth_rate: 12.5,
    top_region: 'North America',
    active_now: 154,
    conversion_rate: '3.2%'
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        if (!supabase) throw new Error("Supabase client not initialized");

        const { data, error } = await supabase
          .from('v_executive_summary')
          .select('*')
          .single();

        if (error) throw error;
        setSummary(data);
      } catch (err) {
        console.warn("Supabase connection failed, using mock data for demo.");
        setSummary(mockSummary);
      } finally {
        setTimeout(() => setLoading(false), 800); // Small delay for aesthetic transition
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-[70vh] items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="h-20 w-20 border-2 border-cyan-400/20 rounded-full" />
              <div className="absolute top-0 left-0 h-20 w-20 border-t-2 border-cyan-400 rounded-full animate-spin" />
              <div className="absolute inset-4 bg-cyan-400/10 rounded-full animate-pulse blur-sm" />
            </div>
            <div className="text-center group">
              <p className="text-cyan-400 font-black uppercase tracking-[0.4em] text-sm mb-2">Syncing Nexus</p>
              <p className="text-slate-500 font-medium text-xs">Accessing global data streams...</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <DashboardLayout>
      {/* Dynamic Header */}
      <header className="mb-12 relative">
        <div className="absolute -top-24 -left-20 w-64 h-64 bg-cyan-500/10 blur-[100px] -z-10" />
        <div className="absolute -top-24 -right-20 w-64 h-64 bg-fuchsia-500/10 blur-[100px] -z-10" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center gap-2 text-cyan-400">
              <div className="h-1 w-8 bg-cyan-400 rounded-full" />
              <span className="text-xs font-black uppercase tracking-[0.3em] neon-text-cyan">Strategic Intel</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-100 uppercase tracking-tighter leading-none">
              Command <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-fuchsia-400">Center</span>
            </h1>
            <p className="text-slate-400 max-w-xl text-lg font-medium">
              Enterprise-grade performance monitoring and market analytics for the 2026 fiscal cycle.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex gap-4 p-2 glass rounded-2xl border-white/5"
          >
            <div className="flex flex-col px-4 py-2 border-r border-white/5">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Active Sessions</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xl font-black text-slate-100">{summary.active_now}</span>
              </div>
            </div>
            <div className="flex flex-col px-4 py-2">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Efficiency</span>
              <div className="flex items-center gap-2">
                <Activity size={14} className="text-cyan-400 " />
                <span className="text-xl font-black text-slate-100">{summary.conversion_rate}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <KPICard
          title="Consolidated Revenue"
          value={formatCurrency(summary.total_revenue)}
          trend="+18.4%"
          trendUp={true}
          icon={<DollarSign size={24} />}
          color="cyan"
        />
        <KPICard
          title="Total Transactions"
          value={summary.total_orders.toLocaleString()}
          trend="+12.1%"
          trendUp={true}
          icon={<ShoppingCart size={24} />}
          color="purple"
        />
        <KPICard
          title="Customer Base"
          value={summary.total_customers.toLocaleString()}
          trend="+5.6%"
          trendUp={true}
          icon={<Users size={24} />}
          color="green"
        />
        <KPICard
          title="Growth Velocity"
          value="24.8%"
          trend="+2.4%"
          trendUp={true}
          icon={<Zap size={24} />}
          color="cyan"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Main Analytics Hub */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-8 flex flex-col gap-8"
        >
          <RevenueChart />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TopProducts />
            <div className="glass rounded-2xl p-6 glass-hover">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-lg font-bold text-slate-100 uppercase tracking-wider">Market Share</h4>
                  <p className="text-sm text-slate-400">Competitive landscape</p>
                </div>
                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                  <PieChartIcon size={20} />
                </div>
              </div>
              <div className="flex items-center justify-center py-8">
                <div className="relative h-48 w-48">
                  <svg viewBox="0 0 36 36" className="h-full w-full rotate-[-90deg]">
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-white/5" strokeWidth="3" />
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-cyan-400/80" strokeWidth="3" strokeDasharray="65, 100" strokeLinecap="round" />
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-fuchsia-400/60" strokeWidth="3" strokeDasharray="25, 100" strokeDashoffset="-65" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-slate-100">84%</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Dominance</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-cyan-400" />
                  <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Core Market (65%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-fuchsia-400" />
                  <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Emerging (25%)</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Intelligence Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-4 flex flex-col gap-8"
        >
          <RecentTransactions />

          <div className="glass p-6 rounded-2xl border-l-4 border-l-cyan-400 animate-float">
            <div className="flex items-center gap-3 mb-4 text-cyan-400">
              <Trophy size={20} className="neon-text-cyan" />
              <h4 className="font-bold uppercase tracking-wider text-sm">Optimal Territory</h4>
            </div>
            <div className="flex flex-col mb-4">
              <span className="text-3xl font-black text-slate-100 uppercase tracking-tighter">{summary.top_region}</span>
              <span className="text-sm text-slate-400 mt-1 font-medium">Leading industry benchmarks by <span className="text-cyan-400">14.2%</span></span>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                  <span>Quota Achievement</span>
                  <span>92%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '92%' }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-cyan-400 to-indigo-600 shadow-[0_0_10px_rgba(34,211,238,0.4)]"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-white/5 p-3 rounded-xl">
                <Globe size={14} className="text-indigo-400" />
                <span>Expanding into EMEA region next quarter</span>
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl group hover:border-fuchsia-500/30 transition-all duration-500">
            <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col">
                <h4 className="font-bold uppercase tracking-wider text-sm text-fuchsia-400">Subsystem Health</h4>
                <p className="text-[10px] text-slate-500 mt-1">Operational status of core services</p>
              </div>
              <Activity size={18} className="text-slate-600 group-hover:text-fuchsia-400 group-hover:rotate-12 transition-all" />
            </div>
            <div className="space-y-4">
              <HealthStatusItem label="Data Nexus Sync" status="Optimized" value="99.9%" />
              <HealthStatusItem label="AI Inference Engine" status="Live" value="24ms" />
              <HealthStatusItem label="Stream Analytics" status="Active" value="Real-time" />
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Latency</span>
                <span className="text-cyan-400 font-mono text-xs">12ms avg</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

const HealthStatusItem = ({ label, status, value }: { label: string, status: string, value: string }) => (
  <div className="flex justify-between items-center group/item cursor-default">
    <div className="flex flex-col">
      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 group-hover/item:text-slate-200 transition-colors">{label}</span>
      <span className="text-[9px] text-emerald-400/80 font-medium uppercase tracking-tighter">{status}</span>
    </div>
    <span className="text-xs font-black text-slate-300 group-hover/item:text-cyan-400 transition-colors">{value}</span>
  </div>
);

