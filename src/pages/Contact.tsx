
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import HardcoreButton from "@/components/HardcoreButton";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  message: z.string().optional(),
  zapierWebhookUrl: z.string().url({ message: "Please enter a valid Zapier Webhook URL." }),
});

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      zapierWebhookUrl: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    console.log("Triggering Zapier webhook:", values.zapierWebhookUrl);

    try {
      await fetch(values.zapierWebhookUrl, {
        method: 'POST',
        mode: 'no-cors', // Important for client-side webhook calls to avoid CORS errors
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          message: values.message,
        }),
      });

      toast.success("Request Sent!", {
        description: "Check your Zapier history and Google Sheet to confirm.",
      });
      form.reset({
        zapierWebhookUrl: values.zapierWebhookUrl,
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error triggering Zapier webhook:", error);
      toast.error("Error", {
        description: "Failed to send. Check the webhook URL and console for details.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-heading text-5xl text-white">GET IN TOUCH</h1>
        <p className="mt-4 text-lg text-gray-300">
          Have a project in mind or want to join the hardcore crew? Drop us a line.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="zapierWebhookUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-hardcore-pink uppercase tracking-wider">Zapier Webhook URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://hooks.zapier.com/hooks/catch/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Your Message (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us what you want to build or automate..."
                      className="resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <HardcoreButton type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  SENDING...
                </>
              ) : (
                "SEND IT"
              )}
            </HardcoreButton>
          </form>
        </Form>
        <p className="mt-4 text-center text-sm text-gray-400">
          You'll need to create a Zapier Webhook and paste the URL above. The Zap should add a new row to your Google Sheet.
        </p>
      </div>
    </div>
  );
};

export default Contact;
