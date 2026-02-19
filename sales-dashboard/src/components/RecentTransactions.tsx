'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, CircleDollarSign } from 'lucide-react';

const transactions = [
    { id: '#ORD-8821', customer: 'Alex Rivera', amount: '$1,299.00', status: 'Completed', time: '2 mins ago' },
    { id: '#ORD-8822', customer: 'Sarah Chen', amount: '$850.45', status: 'Processing', time: '15 mins ago' },
    { id: '#ORD-8823', customer: 'James Wilson', amount: '$2,400.00', status: 'Completed', time: '1 hr ago' },
    { id: '#ORD-8824', customer: 'Elena Gomez', amount: '$120.00', status: 'Completed', time: '2 hrs ago' },
    { id: '#ORD-8825', customer: 'Marcus Knight', amount: '$3,150.00', status: 'Pending', time: '3 hrs ago' },
];

export const RecentTransactions = () => {
    return (
        <div className="glass rounded-2xl p-6 glass-hover h-full">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h4 className="text-lg font-bold text-slate-100 uppercase tracking-wider">Live Feed</h4>
                    <p className="text-sm text-slate-400">Real-time transaction log</p>
                </div>
                <div className="p-2 bg-fuchsia-500/10 rounded-lg text-fuchsia-400">
                    <Clock size={20} />
                </div>
            </div>

            <div className="space-y-1">
                {transactions.map((tx, index) => (
                    <motion.div
                        key={tx.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all duration-300"
                    >
                        <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-slate-200">{tx.customer}</span>
                                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-tighter">{tx.id}</span>
                                </div>
                                <span className="text-[10px] text-slate-500">{tx.time}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-black text-slate-100 font-mono">{tx.amount}</span>
                            <div className={`
                                px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider
                                ${tx.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' :
                                    tx.status === 'Processing' ? 'bg-amber-500/10 text-amber-400' :
                                        'bg-slate-500/10 text-slate-400'}
                            `}>
                                {tx.status}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <button className="w-full mt-6 py-2 rounded-xl border border-white/5 text-xs font-bold text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all uppercase tracking-widest">
                View Full Audit Log
            </button>
        </div>
    );
};
