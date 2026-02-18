# Vortex Executive Sales Dashboard

A premium, interactive sales analytics platform built with Next.js, Framer Motion, and Supabase.

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+
- A Supabase project

### 2. Environment Setup
Create a `.env.local` file in this directory and add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Installation & Run
```bash
npm install
npm run dev
```

## 💎 Features
- **3D Interactive KPI Cards**: Real-time tilt effects using Framer Motion.
- **Glassmorphism UI**: High-end enterprise design with neon accents.
- **Animated Charts**: Recharts with draw-on-load animations.
- **Supabase Integration**: Live data connection to `v_executive_summary` view.

## 🔒 Security Note
Environment variables (`.env`, `.env.local`) and `node_modules` are ignored by git to protect your credentials. Never commit your `.env` files to public repositories.
