
import React, { useState, FormEvent, useEffect } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import HardcoreButton from '@/components/HardcoreButton';
import MultiTagInput from '@/components/crm/MultiTagInput';
import CrmSummary from '@/components/crm/CrmSummary';
import { Tables } from '@/integrations/supabase/types';
import { useAuth } from '@/hooks/useAuth';

const ProfileSetup = () => {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<Partial<Tables<'crm_profiles'>>>({
        name: '',
        email: '',
        business_name: '',
        industry: '',
        pain_points: [],
        current_tools: [],
        desired_outcomes: [],
        workflow_stage: '',
        keywords: [],
        tags: [],
        newsletter_opt_in: false,
    });

    useEffect(() => {
        if (!authLoading && !user) {
            toast.error("Authentication required. Redirecting.");
            navigate('/');
        }
        if (user) {
            setProfile(p => ({ ...p, email: user.email }));
        }
    }, [user, authLoading, navigate]);

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setProfile(prev => ({ ...prev, [id]: value }));
    };

    const handleTagsChange = (field: keyof Tables<'crm_profiles'>) => (value: string[]) => {
        setProfile(prev => ({...prev, [field]: value}));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        if (!profile.email || !profile.name) {
            toast.error('TARGET IDENTIFICATION FAILURE. Name and email are mandatory.');
            return;
        }

        const submissionData = { ...profile, user_id: user?.id };
        toast.info('TRANSMITTING PROFILE DATA...');
        
        try {
            const response = await fetch(`https://cyxufdzkpouwypgxibxo.supabase.co/functions/v1/crm-profile-add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5eHVmZHprcG91d3lwZ3hpYnhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MTA5OTgsImV4cCI6MjA2NTQ4Njk5OH0.HNUTvJvTdWTwTgcLxNdhW-_x47GJP_P-BnGCi5Adx4k`,
                },
                body: JSON.stringify(submissionData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Server error: ${response.status}`);
            }

            const result = await response.json();
            toast.success('PROFILE ACQUIRED. Stand by for analysis.');
            navigate('/'); // Redirect to home after successful submission
        } catch (error: any) {
            toast.error(`Submission failed: ${error.message}`);
        }
    };
    
    if (authLoading) {
        return <div className="bg-deep-black text-white text-center p-24">Loading Authentication...</div>;
    }

    return (
        <div className="bg-deep-black text-white min-h-screen">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h1 className="font-heading text-5xl md:text-6xl text-white uppercase tracking-tighter">Profile Setup</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">Your profile is incomplete. Provide intel to proceed.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" type="text" value={profile.name || ''} onChange={handleFieldChange} placeholder="John Doe" required />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value={profile.email || ''} onChange={handleFieldChange} placeholder="your@email.com" required readOnly={!!user} className={user ? "bg-cyber-indigo/20 border-hardcore-pink/30" : ""} />
                        </div>
                        <div>
                            <Label htmlFor="business_name">Business Name</Label>
                            <Input id="business_name" type="text" value={profile.business_name || ''} onChange={handleFieldChange} placeholder="Acme Corporation" />
                        </div>
                        <div>
                          <Label htmlFor="pain_points">Pain Points</Label>
                          <MultiTagInput value={profile.pain_points || []} onChange={handleTagsChange('pain_points')} placeholder="e.g., slow growth, high costs" />
                        </div>
                        <div>
                          <Label htmlFor="current_tools">Current Tools</Label>
                          <MultiTagInput value={profile.current_tools || []} onChange={handleTagsChange('current_tools')} placeholder="e.g., Slack, Google Sheets" />
                        </div>
                        <div>
                          <Label htmlFor="desired_outcomes">Desired Outcomes</Label>
                          <MultiTagInput value={profile.desired_outcomes || []} onChange={handleTagsChange('desired_outcomes')} placeholder="e.g., automate sales, double leads" />
                        </div>
                         <HardcoreButton type="submit" className="w-full">
                            Submit Profile
                        </HardcoreButton>
                    </form>
                    <CrmSummary profile={profile} />
                </div>
            </div>
        </div>
    );
};

export default ProfileSetup;
