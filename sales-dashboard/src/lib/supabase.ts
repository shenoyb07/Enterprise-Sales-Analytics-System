import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://eewdshfqsdqphwetvzwu.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only initialize if key is present to prevent runtime crash
export const supabase = supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
