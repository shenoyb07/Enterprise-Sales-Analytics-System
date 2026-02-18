'use client';

import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const data = [
    { name: 'Jan', revenue: 45000, profit: 32000 },
    { name: 'Feb', revenue: 52000, profit: 38000 },
    { name: 'Mar', revenue: 48000, profit: 35000 },
    { name: 'Apr', revenue: 61000, profit: 42000 },
    { name: 'May', revenue: 55000, profit: 39000 },
    { name: 'Jun', revenue: 67000, profit: 48000 },
    { name: 'Jul', revenue: 75000, profit: 55000 },
];

export const RevenueChart = () => {
    return (
        <div className="glass h-[400px] w-full rounded-2xl p-6">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h4 className="text-lg font-bold text-slate-100 uppercase tracking-wider">Revenue Analytics</h4>
                    <p className="text-sm text-slate-400">Monthly performance overview</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                        <span className="text-xs text-slate-400">Revenue</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-fuchsia-400 shadow-[0_0_10px_rgba(217,70,239,0.5)]" />
                        <span className="text-xs text-slate-400">Profit</span>
                    </div>
                </div>
            </div>

            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorProf" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#d946ef" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#d946ef" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis
                        dataKey="name"
                        stroke="rgba(255,255,255,0.3)"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        dy={10}
                    />
                    <YAxis
                        stroke="rgba(255,255,255,0.3)"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(15, 23, 42, 0.9)',
                            borderColor: 'rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            backdropFilter: 'blur(8px)',
                            color: '#f8fafc'
                        }}
                        itemStyle={{ color: '#f8fafc' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#22d3ee"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorRev)"
                        animationDuration={2500}
                    />
                    <Area
                        type="monotone"
                        dataKey="profit"
                        stroke="#d946ef"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorProf)"
                        animationDuration={3000}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
