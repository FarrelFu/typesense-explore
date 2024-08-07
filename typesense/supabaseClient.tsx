import { createClient, SupabaseClient } from '@supabase/supabase-js';

//client connect untuk nyambung ke database, saya menggunakan supabase

const supabaseUrl: string = 'https://hvinfbgkidjahyjckkcs.supabase.co';
const supabaseKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2aW5mYmdraWRqYWh5amNra2NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3OTY1NjIsImV4cCI6MjAyOTM3MjU2Mn0.LAyfed_X-PxNx6P-PdX8N3vM_ctE9owYh82PNkQ1LTk';

export const supabase: SupabaseClient = createClient(supabaseUrl,supabaseKey);
