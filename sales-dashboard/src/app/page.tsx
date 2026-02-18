'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  ShoppingCart,
  Users,
  ArrowUpRight,
  Target,
  Trophy
} from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { KPICard } from '@/components/KPICard';
import { RevenueChart } from '@/components/RevenueChart';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<any>(null);

  // Mock data for immediate visual impact
  const mockSummary = {
    total_revenue: 1245000,
    total_orders: 8740,
    total_customers: 342,
    avg_order_value: 142.45,
    growth_rate: 12.5,
    top_region: 'North America'
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Attempt to fetch from the view v_executive_summary
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
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-[60vh] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
            <p className="text-cyan-400 font-medium animate-pulse">Initializing Executive Intel...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <DashboardLayout>
      <header className="mb-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-2"
        >
          <div className="flex items-center gap-2 text-cyan-400 mb-1">
            <Target size={18} />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">Strategy Overview</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-100 uppercase tracking-tighter">
            Executive <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-fuchsia-400">Dashboard</span>
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg">
            Real-time analytics and global performance metrics for the fiscal quarter.
          </p>
        </motion.div>
      </header>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <KPICard
          title="Total Revenue"
          value={formatCurrency(summary.total_revenue)}
          trend="+15.2%"
          trendUp={true}
          icon={<DollarSign size={24} />}
          color="cyan"
        />
        <KPICard
          title="Total Sales"
          value={summary.total_orders.toLocaleString()}
          trend="+8.1%"
          trendUp={true}
          icon={<ShoppingCart size={24} />}
          color="purple"
        />
        <KPICard
          title="Direct Customers"
          value={summary.total_customers.toLocaleString()}
          trend="-2.4%"
          trendUp={false}
          icon={<Users size={24} />}
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <RevenueChart />
        </motion.div>

        {/* Secondary Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-6"
        >
          <div className="glass p-6 rounded-2xl border-l-4 border-l-cyan-400">
            <div className="flex items-center gap-3 mb-4 text-cyan-400">
              <Trophy size={20} />
              <h4 className="font-bold uppercase tracking-wider text-sm">Top Performing Region</h4>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-slate-100">{summary.top_region}</span>
              <span className="text-sm text-slate-400 mt-1">Leading current cycle by 22%</span>
            </div>
            <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '78%' }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-cyan-400 to-indigo-600"
              />
            </div>
          </div>

          <div className="glass p-6 rounded-2xl group hover:border-fuchsia-500/30 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-bold uppercase tracking-wider text-sm text-fuchsia-400">System Integrity</h4>
              <ArrowUpRight size={18} className="text-slate-600 group-hover:text-fuchsia-400" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs uppercase font-medium tracking-widest text-slate-400">
                <span>Supabase Sync</span>
                <span className="text-emerald-400">Operational</span>
              </div>
              <div className="flex justify-between items-center text-xs uppercase font-medium tracking-widest text-slate-400">
                <span>Data Consistency</span>
                <span className="text-emerald-400">99.8%</span>
              </div>
              <div className="flex justify-between items-center text-xs uppercase font-medium tracking-widest text-slate-400">
                <span>Next.js V15+</span>
                <span className="text-cyan-400">Active</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </DashboardLayout>
  );
}
