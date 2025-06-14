
import React from 'react';
import { Tables } from '@/integrations/supabase/types';

interface CrmSummaryProps {
  profile: Partial<Tables<'crm_profiles'>>;
}

const CrmSummary: React.FC<CrmSummaryProps> = ({ profile }) => {
  if (!profile.name) {
    return null;
  }

  const renderList = (items: string[] | undefined | null) => items && items.length > 0 ? items.join(', ') : 'N/A';

  return (
    <div className="mt-12 p-6 border border-hardcore-pink/50 rounded-lg bg-deep-black/50 shadow-lg shadow-hardcore-pink/10">
      <h3 className="font-heading text-2xl text-hardcore-pink uppercase">New Profile Acquired</h3>
      <div className="mt-4 font-mono text-gray-300 space-y-2 text-sm">
        <p>
          <span className="text-hardcore-pink/80">TARGET:</span> {profile.name || '...'}
        </p>
        <p>
          <span className="text-hardcore-pink/80">AFFILIATION:</span> {profile.business_name || '...'} ({profile.industry || '...'})
        </p>
        <p>
          <span className="text-hardcore-pink/80">PAIN:</span> {renderList(profile.pain_points)}
        </p>
         <p>
          <span className="text-hardcore-pink/80">ARSENAL:</span> {renderList(profile.current_tools)}
        </p>
        <p>
          <span className="text-hardcore-pink/80">OBJECTIVE:</span> {renderList(profile.desired_outcomes)}
        </p>
         <p>
          <span className="text-hardcore-pink/80">STAGE:</span> {profile.workflow_stage || '...'}
        </p>
         <p>
          <span className="text-hardcore-pink/80">KEYWORDS:</span> {renderList(profile.keywords)}
        </p>
      </div>
       <p className="mt-4 text-xs text-center text-gray-500 italic">
          Profile data compiled. Ready for insertion into Supabase / export to Airtable.
        </p>
    </div>
  );
};

export default CrmSummary;
