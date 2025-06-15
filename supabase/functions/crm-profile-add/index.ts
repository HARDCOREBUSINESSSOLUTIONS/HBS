
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Supabase client using the service role key
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

const AIRTABLE_API_KEY = Deno.env.get('AIRTABLE_API_KEY');
const AIRTABLE_BASE_ID = Deno.env.get('AIRTABLE_BASE_ID');
const AIRTABLE_TABLE_NAME = Deno.env.get('AIRTABLE_TABLE_ID') || 'UserProfiles';

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const profileData = await req.json();
    console.log("Received profile data for processing:", profileData);

    // First, save to Supabase as a backup and for in-app use
    const { error: supabaseError } = await supabase
      .from('crm_profiles')
      .insert({ ...profileData, last_session: new Date().toISOString() })
      .select()
      .single();

    if (supabaseError) {
      console.error('Supabase insert error:', supabaseError);
      if (supabaseError.code === '23505') { // unique_violation
          return new Response(JSON.stringify({ error: 'A profile with this email already exists.' }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 409,
          });
      }
      // Log the error but continue to Airtable sync
      console.error("Failed to save to Supabase, proceeding with Airtable sync.", supabaseError);
    }

    // Now, forward to Airtable
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      const errorMsg = "Airtable integration is not fully configured in environment variables.";
      console.error(errorMsg);
      return new Response(JSON.stringify({ error: errorMsg }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      });
    }

    const airtableFields = { ...profileData };
    // Airtable 'long text' field expects a string, not an array.
    if (Array.isArray(airtableFields.desired_outcomes)) {
      airtableFields.desired_outcomes = airtableFields.desired_outcomes.join('\n');
    }

    const airtablePayload = {
      records: [{
        fields: { ...airtableFields, last_session: new Date().toISOString() }
      }]
    };

    const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

    const response = await fetch(airtableUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(airtablePayload),
    });

    const responseBody = await response.json();

    if (!response.ok) {
      console.error('Airtable API Error:', responseBody);
      return new Response(JSON.stringify({ error: 'Airtable mapping failed – check field names/types, see logs for details.', details: responseBody }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: response.status,
      });
    }
    
    console.log("Successfully synced data to Airtable:", responseBody);
    return new Response(JSON.stringify(responseBody), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (err) {
    console.error('Function error:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
