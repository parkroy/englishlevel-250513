// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://hpwgjjcfmagalavuhjzk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhwd2dqamNmbWFnYWxhdnVoanprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxMDEwNTksImV4cCI6MjA2MjY3NzA1OX0.A2AsSo-rYYAmHfX-IBkmOfhrFs0qN3uDCi7DfIxBanM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);