import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lewbekntklairdkqxjnd.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_von0lLPBEsGsaN2r8pPIyg_MAlxu9oU';

export const ordersClient = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
