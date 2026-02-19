'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, TrendingUp } from 'lucide-react';

const products = [
    { name: 'Quantum Series X1', category: 'Hardware', revenue: '$142,500', growth: '+12%', rating: 4.8 },
    { name: 'Neural Link Hub', category: 'Software', revenue: '$98,200', growth: '+8%', rating: 4.9 },
    { name: 'Cyber Sentinel Pro', category: 'Security', revenue: '$85,400', growth: '+24%', rating: 4.7 },
    { name: 'Vortex Cloud Suite', category: 'SaaS', revenue: '$76,900', growth: '+15%', rating: 4.6 },
];

export const TopProducts = () => {
    return (
        <div className="glass rounded-2xl p-6 glass-hover">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h4 className="text-lg font-bold text-slate-100 uppercase tracking-wider">Top Products</h4>
                    <p className="text-sm text-slate-400">Highest grossing inventory</p>
                </div>
                <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                    <ShoppingBag size={20} />
                </div>
            </div>

            <div className="space-y-4">
                {products.map((product, index) => (
                    <motion.div
                        key={product.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-white/10">
                                <span className="text-xs font-bold text-slate-400">{index + 1}</span>
                            </div>
                            <div>
                                <h5 className="text-sm font-bold text-slate-100">{product.name}</h5>
                                <p className="text-xs text-slate-500">{product.category}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-bold text-emerald-400">{product.revenue}</div>
                            <div className="flex items-center gap-1 justify-end">
                                <TrendingUp size={10} className="text-cyan-400" />
                                <span className="text-[10px] text-slate-400 font-medium">{product.growth}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
