
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

// Supabase client using the service role key for privileged access
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const profileData = await req.json();
    console.log("Received profile data:", profileData);

    // Insert data into the crm_profiles table
    const { data, error } = await supabase
      .from('crm_profiles')
      .insert({
        ...profileData,
        last_session: new Date().toISOString(), // Set current timestamp for the session
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      // Handle potential duplicate email error gracefully
      if (error.code === '23505') { // unique_violation
          return new Response(JSON.stringify({ error: 'A profile with this email already exists.' }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 409,
          });
      }
      throw error;
    }

    console.log("Successfully inserted data:", data);
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (err) {
    console.error('Function error:', err);
    return new Response(String(err?.message ?? err), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
