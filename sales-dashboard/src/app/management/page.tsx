'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Plus,
    UserPlus,
    Package,
    FileUp,
    Save,
    X,
    CheckCircle2,
    History,
    Search,
    ShieldCheck
} from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

export default function ManagementPage() {
    const [activeTab, setActiveTab] = useState<'orders' | 'customers' | 'bulk'>('orders');
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const showSuccess = (msg: string) => {
        setSuccessMessage(msg);
        setTimeout(() => setSuccessMessage(null), 3000);
    };

    return (
        <DashboardLayout>
            <header className="mb-12 relative">
                <div className="absolute -top-24 -left-20 w-64 h-64 bg-cyan-500/10 blur-[100px] -z-10" />

                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col gap-3"
                >
                    <div className="flex items-center gap-2 text-fuchsia-400">
                        <ShieldCheck size={18} />
                        <span className="text-xs font-black uppercase tracking-[0.3em]">Data Management</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-slate-100 uppercase tracking-tighter leading-none">
                        System <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-white to-cyan-400">Control</span>
                    </h1>
                    <p className="text-slate-400 max-w-xl text-lg font-medium">
                        Manual entry, entity management, and bulk data synchronization.
                    </p>
                </motion.div>
            </header>

            {/* Success Toast */}
            {successMessage && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="fixed bottom-12 right-12 z-[100] glass px-6 py-4 rounded-2xl border-emerald-500/50 flex items-center gap-4 bg-emerald-500/10"
                >
                    <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <CheckCircle2 size={24} />
                    </div>
                    <div>
                        <p className="font-bold text-slate-100">Operation Successful</p>
                        <p className="text-xs text-slate-400">{successMessage}</p>
                    </div>
                    <button onClick={() => setSuccessMessage(null)} className="ml-4 text-slate-500 hover:text-white">
                        <X size={18} />
                    </button>
                </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-3 flex flex-col gap-2">
                    <TabButton
                        active={activeTab === 'orders'}
                        icon={<Plus size={18} />}
                        label="New Sales Order"
                        desc="Register new transactions"
                        onClick={() => setActiveTab('orders')}
                    />
                    <TabButton
                        active={activeTab === 'customers'}
                        icon={<UserPlus size={18} />}
                        label="Add Customer"
                        desc="Enroll new enterprise entities"
                        onClick={() => setActiveTab('customers')}
                    />
                    <TabButton
                        active={activeTab === 'bulk'}
                        icon={<FileUp size={18} />}
                        label="Bulk Sync"
                        desc="Upload CSV/JSON streams"
                        onClick={() => setActiveTab('bulk')}
                    />

                    <div className="mt-8 p-6 glass rounded-2xl border-dashed border-white/10">
                        <div className="flex items-center gap-2 text-slate-500 mb-4">
                            <History size={16} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Recent Logs</span>
                        </div>
                        <div className="space-y-4">
                            <LogItem time="Just now" action="System sync" status="Success" />
                            <LogItem time="12m ago" action="Order #8821" status="Created" />
                            <LogItem time="45m ago" action="Client Update" status="Modified" />
                        </div>
                    </div>
                </div>

                {/* Main Action Area */}
                <div className="lg:col-span-9">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass rounded-[32px] p-8 md:p-12 min-h-[600px] relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                            {activeTab === 'orders' && <Plus size={200} />}
                            {activeTab === 'customers' && <UserPlus size={200} />}
                            {activeTab === 'bulk' && <FileUp size={200} />}
                        </div>

                        {activeTab === 'orders' && (
                            <form className="space-y-8 max-w-2xl" onSubmit={(e) => { e.preventDefault(); showSuccess('Order #8826 created successfully'); }}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormGroup label="Customer Association" icon={<Search size={14} />}>
                                        <select className="form-input">
                                            <option>Select Client...</option>
                                            <option>Global Industries</option>
                                            <option>Tech Soft Inc</option>
                                            <option>Zenith Corp</option>
                                        </select>
                                    </FormGroup>
                                    <FormGroup label="Product Category" icon={<Package size={14} />}>
                                        <select className="form-input">
                                            <option>Quantum Series</option>
                                            <option>Neural Net</option>
                                            <option>Cyber Sec</option>
                                        </select>
                                    </FormGroup>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormGroup label="Quantity">
                                        <input type="number" placeholder="1" className="form-input" />
                                    </FormGroup>
                                    <FormGroup label="Unit Price ($)">
                                        <input type="text" placeholder="0.00" className="form-input" />
                                    </FormGroup>
                                </div>
                                <FormGroup label="Internal Notes">
                                    <textarea rows={4} className="form-input pt-4" placeholder="Enter transaction specifics..." />
                                </FormGroup>
                                <button type="submit" className="action-button">
                                    <Save size={18} />
                                    <span>Execute Transaction</span>
                                </button>
                            </form>
                        )}

                        {activeTab === 'customers' && (
                            <form className="space-y-8 max-w-2xl" onSubmit={(e) => { e.preventDefault(); showSuccess('New customer profile registered'); }}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormGroup label="Company Name">
                                        <input type="text" placeholder="e.g. Acme Corp" className="form-input" />
                                    </FormGroup>
                                    <FormGroup label="Email Address">
                                        <input type="email" placeholder="contact@company.com" className="form-input" />
                                    </FormGroup>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormGroup label="Region / Territory">
                                        <select className="form-input">
                                            <option>North America</option>
                                            <option>Europe</option>
                                            <option>Asia Pacific</option>
                                            <option>Latin America</option>
                                        </select>
                                    </FormGroup>
                                    <FormGroup label="Contract Type">
                                        <select className="form-input">
                                            <option>Enterprise</option>
                                            <option>SMB</option>
                                            <option>Partner</option>
                                        </select>
                                    </FormGroup>
                                </div>
                                <button type="submit" className="action-button border-fuchsia-500 hover:bg-fuchsia-500/10">
                                    <UserPlus size={18} />
                                    <span>Register Entity</span>
                                </button>
                            </form>
                        )}

                        {activeTab === 'bulk' && (
                            <div className="flex flex-col items-center justify-center h-[400px] border-4 border-dashed border-white/5 rounded-[40px] group hover:border-cyan-400/30 transition-all duration-500 cursor-pointer">
                                <div className="p-8 rounded-full bg-cyan-400/5 group-hover:bg-cyan-400/10 mb-6 transition-colors">
                                    <FileUp size={64} className="text-slate-500 group-hover:text-cyan-400 group-hover:scale-110 transition-all" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-100 uppercase tracking-tighter mb-2">Drop CSV streams here</h3>
                                <p className="text-slate-500 text-sm font-medium">Or click to browse your local filesystem</p>
                                <div className="mt-8 flex gap-4">
                                    <span className="px-3 py-1 rounded-lg border border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Supports .CSV</span>
                                    <span className="px-3 py-1 rounded-lg border border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Max 250MB</span>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            <style jsx>{`
                .form-input {
                    @apply w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-slate-100 
                    focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-300;
                }
                .action-button {
                    @apply flex items-center gap-3 px-10 py-5 rounded-2xl border border-cyan-400/30 
                    text-white font-black uppercase tracking-widest text-sm hover:bg-cyan-400/10 
                    transition-all duration-300 hover:scale-[1.02] shadow-[0_0_20px_rgba(34,211,238,0.1)];
                }
            `}</style>
        </DashboardLayout>
    );
}

const TabButton = ({ active, icon, label, desc, onClick }: any) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-5 p-5 rounded-2xl transition-all duration-300 text-left
            ${active ? 'glass border-cyan-400/20 bg-cyan-400/5' : 'hover:bg-white/5 opacity-60 hover:opacity-100'}`}
    >
        <div className={`p-3 rounded-xl border ${active ? 'bg-cyan-400 text-white shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'bg-slate-800 text-slate-400 border-white/5'}`}>
            {icon}
        </div>
        <div className="flex flex-col">
            <span className={`text-sm font-black uppercase tracking-tighter ${active ? 'text-slate-100' : 'text-slate-400'}`}>{label}</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest truncate">{desc}</span>
        </div>
    </button>
);

const FormGroup = ({ label, children, icon }: any) => (
    <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
            {icon}
            {label}
        </label>
        {children}
    </div>
);

const LogItem = ({ time, action, status }: any) => (
    <div className="flex justify-between items-center group cursor-help">
        <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-300 group-hover:text-cyan-400 transition-colors">{action}</span>
            <span className="text-[10px] text-slate-600 uppercase font-bold tracking-tighter">{time}</span>
        </div>
        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${status === 'Success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                status === 'Created' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-400/20' :
                    'bg-amber-500/10 text-amber-500 border-amber-500/20'
            }`}>{status}</span>
    </div>
);
