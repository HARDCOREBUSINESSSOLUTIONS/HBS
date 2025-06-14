
import React from 'react';
import { Tables } from '@/integrations/supabase/types';

interface CrmSummaryProps {
  profile: Partial<Tables<'crm_profiles'>>;
}

const CrmSummary: React.FC<CrmSummaryProps> = ({ profile }) => {
  if (!profile.name) {
    return null;
  }

  const renderList = (items: string[] | undefined | null) => items && items.length > 0 ? `${items.join(', ')}` : '...';
  const renderItem = (item: string | undefined | null) => item || '...';

  // “New Profile: [Name] from [Business], pain points include [tags]; they use [tools] and want [desired outcomes], currently in [stage]. Keywords: [keywords].”
  const summaryText = `New Profile: ${profile.name} from ${profile.business_name || '...'}, pain points include ${renderList(profile.pain_points)}; they use ${renderList(profile.current_tools)} and want ${renderList(profile.desired_outcomes)}, currently in ${renderItem(profile.workflow_stage)}. Keywords: ${renderList(profile.keywords)}.`;

  return (
    <div className="mt-12 p-6 border border-hardcore-pink/50 rounded-lg bg-deep-black/50 shadow-lg shadow-hardcore-pink/10">
      <h3 className="font-heading text-2xl text-hardcore-pink uppercase">Profile Acquired: Analysis</h3>
      <p className="mt-4 font-mono text-gray-300 text-sm italic">
        {summaryText}
      </p>
       <p className="mt-4 text-xs text-center text-gray-500 italic">
          Profile data compiled. Ready for insertion into Supabase / export to Airtable.
        </p>
    </div>
  );
};

export default CrmSummary;
