
import 'https://deno.land/x/xhr@0.1.0/mod.ts';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import OpenAI from 'npm:openai@^4.104.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY'),
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const input = formData.get('input') as string;
    const assistantId = formData.get('assistantId') as string;
    let threadId = formData.get('threadId') as string | null;
    const file = formData.get('file') as File | null;

    let fileId: string | null = null;
    if (file) {
      console.log(`Uploading file: ${file.name}`);
      const openaiFile = await openai.files.create({
        file: file,
        purpose: 'assistants',
      });
      fileId = openaiFile.id;
      console.log(`File uploaded with ID: ${fileId}`);
    }

    const isNewThread = !threadId;
    if (isNewThread) {
      const thread = await openai.beta.threads.create();
      threadId = thread.id;
      console.log(`Created new thread with ID: ${threadId}`);
    } else {
      console.log(`Using existing thread with ID: ${threadId}`);
    }

    const messageData: OpenAI.Beta.Threads.Messages.MessageCreateParams = {
      role: 'user',
      content: input,
    };
    if (fileId) {
      messageData.attachments = [{ file_id: fileId, tools: [{ type: 'file_search' }] }];
    }
    await openai.beta.threads.messages.create(threadId!, messageData);
    console.log(`Added message to thread: ${input}`);

    const run = await openai.beta.threads.runs.create(threadId!, {
      assistant_id: assistantId,
    });
    console.log(`Created run with ID: ${run.id}`);

    let runStatus = await openai.beta.threads.runs.retrieve(threadId!, run.id);
    while (runStatus.status !== 'completed') {
      await new Promise((resolve) => setTimeout(resolve, 500));
      runStatus = await openai.beta.threads.runs.retrieve(threadId!, run.id);

      if (['failed', 'cancelled', 'expired'].includes(runStatus.status)) {
        throw new Error(`Run failed with status: ${runStatus.status}`);
      }
    }
    console.log(`Run ${run.id} completed.`);

    const threadMessages = await openai.beta.threads.messages.list(threadId!);
    const lastAssistantMessage = threadMessages.data.find(
      (m) => m.run_id === run.id && m.role === 'assistant'
    );
    
    let assistantResponse = null;
    if (lastAssistantMessage && lastAssistantMessage.content[0].type === 'text') {
      assistantResponse = {
        role: 'assistant',
        content: lastAssistantMessage.content[0].text.value.replace(/【\d+†source】/g, ''),
      };
      console.log(`Retrieved assistant response: ${assistantResponse.content}`);
    } else {
       console.log("No text response from assistant.");
    }

    const responsePayload = {
      assistantResponse,
      newThreadId: isNewThread ? threadId : null,
    };

    return new Response(JSON.stringify(responsePayload), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in openai-assistant-chat function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
