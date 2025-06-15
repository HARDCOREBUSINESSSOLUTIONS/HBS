
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
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Terminal } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

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
        ai_stack: [],
        keywords: [],
        tags: [],
        newsletter_opt_in: false,
    });
    const [resendLoading, setResendLoading] = useState(false);
    const [submissionError, setSubmissionError] = useState<any>(null);

    useEffect(() => {
        if (!authLoading && !user) {
            toast.error("Authentication required. Redirecting.");
            navigate('/');
        }
        if (user) {
            setProfile(p => ({ ...p, email: user.email }));
        }
    }, [user, authLoading, navigate]);

    const handleResendVerification = async () => {
        if (!user?.email) return;
        setResendLoading(true);
        const { error } = await supabase.auth.resend({
            type: 'signup',
            email: user.email,
        });
        if (error) {
            toast.error(`Failed to resend: ${error.message}`);
        } else {
            toast.success("Verification email sent! Check your inbox.");
        }
        setResendLoading(false);
    };

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setProfile(prev => ({ ...prev, [id]: value }));
    };

    const handleTagsChange = (field: keyof Tables<'crm_profiles'>) => (value: string[]) => {
        setProfile(prev => ({...prev, [field]: value}));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmissionError(null);
        
        if (!profile.email || !profile.name) {
            toast.error('TARGET IDENTIFICATION FAILURE. Name and email are mandatory.');
            return;
        }

        const submissionData = { ...profile, user_id: user?.id };
        toast.info('TRANSMITTING PROFILE DATA...');
        
        try {
            const { data, error } = await supabase.functions.invoke('crm-profile-add', {
                body: submissionData,
            });

            if (error) {
                setSubmissionError({ message: error.message, context: error.context });
                throw new Error(error.message);
            }

            if (data.error) {
                setSubmissionError(data.details || data.error);
                throw new Error(data.error);
            }

            toast.success('PROFILE ACQUIRED & SYNCED. Intel logged to Airtable.');
            navigate('/'); // Redirect to home after successful submission
        } catch (error: any) {
            toast.error('Airtable mapping failed – check field names/types, see logs for details.');
            console.error("Error submitting profile:", error);
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

                {user && !user.email_confirmed_at && (
                    <Alert className="mb-8 border-hardcore-pink/50 text-white bg-deep-black/50">
                        <Terminal className="h-4 w-4 text-hardcore-pink" />
                        <AlertTitle className="text-hardcore-pink uppercase">Verification Pending</AlertTitle>
                        <AlertDescription className="flex items-center justify-between text-gray-300">
                            Your profile is not yet active. Please check your inbox and click the verification link.
                            <Button 
                                onClick={handleResendVerification} 
                                disabled={resendLoading}
                                variant="outline"
                                size="sm"
                                className="ml-4 bg-transparent hover:bg-hardcore-pink/20 border-hardcore-pink/50"
                            >
                                {resendLoading ? 'Sending...' : 'Resend Verification'}
                            </Button>
                        </AlertDescription>
                    </Alert>
                )}

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
                            <Label htmlFor="industry">Industry</Label>
                            <Input id="industry" type="text" value={profile.industry || ''} onChange={handleFieldChange} placeholder="e.g., SaaS, E-commerce" />
                        </div>
                        <div>
                          <Label htmlFor="workflow_stage">Current Stage</Label>
                          <Select onValueChange={(value) => setProfile(prev => ({...prev, workflow_stage: value}))} value={profile.workflow_stage || ''}>
                              <SelectTrigger id="workflow_stage">
                                  <SelectValue placeholder="Select your current workflow stage" />
                              </SelectTrigger>
                              <SelectContent>
                                  <SelectItem value="discovery">Discovery / Idea</SelectItem>
                                  <SelectItem value="mvp">MVP / Prototyping</SelectItem>
                                  <SelectItem value="scaling">Scaling / Growth</SelectItem>
                                  <SelectItem value="optimization">Optimization</SelectItem>
                                  <SelectItem value="enterprise">Enterprise</SelectItem>
                              </SelectContent>
                          </Select>
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
                        <div>
                          <Label htmlFor="ai_stack">Current AI Stack</Label>
                          <MultiTagInput value={profile.ai_stack as string[] || []} onChange={handleTagsChange('ai_stack')} placeholder="e.g., OpenAI API, LangChain" />
                        </div>
                        <div>
                          <Label htmlFor="tags">Tags</Label>
                          <MultiTagInput value={profile.tags as string[] || []} onChange={handleTagsChange('tags')} placeholder="e.g., B2B, enterprise" />
                        </div>
                        <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 border-hardcore-pink/30">
                            <Checkbox
                                id="newsletter_opt_in"
                                checked={profile.newsletter_opt_in}
                                onCheckedChange={(checked) => setProfile(prev => ({...prev, newsletter_opt_in: !!checked}))}
                            />
                            <div className="space-y-1 leading-none">
                                <Label htmlFor="newsletter_opt_in">
                                    Authorize intel briefings (Join Newsletter)
                                </Label>
                            </div>
                        </div>
                         <HardcoreButton type="submit" className="w-full">
                            Submit Profile
                        </HardcoreButton>
                         {submissionError && (
                            <Alert variant="destructive" className="mt-4">
                                <Terminal className="h-4 w-4" />
                                <AlertTitle>Submission Error</AlertTitle>
                                <AlertDescription>
                                     <p>Check your field names and types in Airtable. See the error log for details.</p>
                                    <pre className="mt-2 w-full whitespace-pre-wrap break-all rounded-md bg-slate-950 p-4 font-mono text-sm text-white">
                                        {JSON.stringify(submissionError, null, 2)}
                                    </pre>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="mt-2 bg-transparent hover:bg-hardcore-pink/20"
                                        onClick={() => navigator.clipboard.writeText(JSON.stringify(submissionError, null, 2))}
                                    >
                                        Copy Error Log
                                    </Button>
                                </AlertDescription>
                            </Alert>
                        )}
                    </form>
                    <CrmSummary profile={profile} />
                </div>
            </div>
        </div>
    );
};

export default ProfileSetup;
