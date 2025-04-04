import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://flledracehzjzjggtmnk.supabase.co';

const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsbGVkcmFjZWh6anpqZ2d0bW5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NjYzNDQsImV4cCI6MjA1OTM0MjM0NH0.iT7-KMreZWxtzDyvXiXc48AuY9sZxOHqudJhTo7kBSs';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
