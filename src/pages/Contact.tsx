import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import HardcoreButton from "@/components/HardcoreButton";
import MultiTagInput from "@/components/crm/MultiTagInput";
import CrmSummary from "@/components/crm/CrmSummary";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  business_name: z.string().optional(),
  industry: z.string().optional(),
  pain_points: z.array(z.string()).optional(),
  current_tools: z.array(z.string()).optional(),
  desired_outcomes: z.array(z.string()).optional(),
  workflow_stage: z.string().optional(),
  ai_stack: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  newsletter_opt_in: z.boolean().default(false).optional(),
});

type CrmProfile = Tables<'crm_profiles'>;

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [submittedProfile, setSubmittedProfile] = useState<Partial<CrmProfile>>({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      business_name: "",
      industry: "",
      pain_points: [],
      current_tools: [],
      desired_outcomes: [],
      workflow_stage: "",
      ai_stack: [],
      tags: [],
      newsletter_opt_in: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setSubmittedProfile(values); // Optimistically update summary

    try {
      const { data, error } = await supabase.functions.invoke('crm-profile-add', {
        body: values,
      });

      if (error) throw error;

      if (data.error) { // Handle application-level error from function
        throw new Error(data.error);
      }

      toast.success("Profile Acquired", {
        description: "New lead data has been logged to the database.",
      });
      setSubmittedProfile(data); // Update summary with final data from DB
      form.reset(); // Clear form
    } catch (error: any) {
      console.error("Error submitting CRM profile:", error);
      const errorMessage = error.message.includes('A profile with this email already exists')
        ? "A profile with this email already exists."
        : "Failed to submit profile. Check console for details.";

      toast.error("Submission Failed", {
        description: errorMessage,
      });
      // Don't clear summary on error so user can see what they entered
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-heading text-5xl text-white">ACQUIRE INTEL</h1>
        <p className="mt-4 text-lg text-gray-300">
          Feed the machine. We need data to build your domination strategy.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Wick" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Your Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@continental.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="business_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Business Name</FormLabel>
                      <FormControl>
                        <Input placeholder="The Continental" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Industry</FormLabel>
                      <FormControl>
                        <Input placeholder="Hospitality & Security" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            
             <FormField
              control={form.control}
              name="pain_points"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Pain Points</FormLabel>
                  <FormControl>
                    <MultiTagInput 
                      placeholder="e.g. inefficient workflows, high overhead..."
                      value={field.value || []}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="current_tools"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Current Tools / Stack</FormLabel>
                  <FormControl>
                    <MultiTagInput 
                      placeholder="e.g. Slack, Google Sheets, Custom CRM..."
                      value={field.value || []}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="desired_outcomes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Desired Outcomes</FormLabel>
                  <FormControl>
                    <MultiTagInput 
                      placeholder="e.g. automate invoicing, 24/7 customer support..."
                      value={field.value || []}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

             <FormField
              control={form.control}
              name="workflow_stage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Current Stage</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your current workflow stage" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="discovery">Discovery / Idea</SelectItem>
                      <SelectItem value="mvp">MVP / Prototyping</SelectItem>
                      <SelectItem value="scaling">Scaling / Growth</SelectItem>
                      <SelectItem value="optimization">Optimization</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

             <FormField
              control={form.control}
              name="ai_stack"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Current AI Stack</FormLabel>
                  <FormControl>
                    <MultiTagInput 
                      placeholder="e.g. OpenAI API, LangChain, Midjourney..."
                      value={field.value || []}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Tags</FormLabel>
                  <FormControl>
                    <MultiTagInput 
                      placeholder="e.g. B2B, SaaS, high-growth..."
                      value={field.value || []}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

             <FormField
              control={form.control}
              name="newsletter_opt_in"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                   <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-white">
                      Authorize intel briefings (Join Newsletter)
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <HardcoreButton type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  LOGGING INTEL...
                </>
              ) : (
                "SUBMIT FOR ANALYSIS"
              )}
            </HardcoreButton>
          </form>
        </Form>
        <CrmSummary profile={submittedProfile} />
      </div>
    </div>
  );
};

export default Contact;
