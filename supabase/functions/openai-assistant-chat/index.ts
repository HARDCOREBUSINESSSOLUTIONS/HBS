
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
    console.log('Function received a request.');
    const formData = await req.formData();
    console.log('Form data parsed.');

    const input = formData.get('input') as string;
    const assistantId = formData.get('assistantId') as string;
    let threadId = formData.get('threadId') as string | null;
    const file = formData.get('file') as File | null;
    console.log(`Input: "${input}", Assistant ID: ${assistantId}, Thread ID: ${threadId}, File: ${file?.name || 'none'}`);

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
      console.log('Creating new thread...');
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

    console.log('Creating run...');
    const run = await openai.beta.threads.runs.create(threadId!, {
      assistant_id: assistantId,
    });
    console.log(`Created run with ID: ${run.id}`);

    let runStatus = await openai.beta.threads.runs.retrieve(threadId!, run.id);
    console.log(`Initial run status: ${runStatus.status}`);

    // Poll for completion with a more robust loop
    while (runStatus.status === 'queued' || runStatus.status === 'in_progress') {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(threadId!, run.id);
      console.log(`Polling... Run status: ${runStatus.status}`);
    }

    if (runStatus.status !== 'completed') {
      console.error(`Run did not complete. Final status: ${runStatus.status}`);
      const errorDetails = runStatus.last_error ? `Details: ${runStatus.last_error.message}` : '';
      throw new Error(`Run failed, was cancelled, or requires action. Status: ${runStatus.status}. ${errorDetails}`);
    }
    
    console.log(`Run ${run.id} completed successfully.`);

    console.log('Fetching thread messages...');
    const threadMessages = await openai.beta.threads.messages.list(threadId!, {
      order: 'desc',
      limit: 20
    });
    console.log(`Found ${threadMessages.data.length} messages in thread.`);

    const lastAssistantMessage = threadMessages.data.find(
      (m) => m.run_id === run.id && m.role === 'assistant'
    );
    
    let assistantResponse = null;
    if (lastAssistantMessage && lastAssistantMessage.content[0]?.type === 'text') {
      assistantResponse = {
        role: 'assistant',
        content: lastAssistantMessage.content[0].text.value.replace(/【\d+†source】/g, ''),
      };
      console.log(`Retrieved assistant response: "${assistantResponse.content.substring(0, 100)}..."`);
    } else {
       console.log("No text response from assistant found for this run.");
       if(lastAssistantMessage) {
         console.log("Last assistant message content:", JSON.stringify(lastAssistantMessage.content));
       }
    }

    const responsePayload = {
      assistantResponse,
      newThreadId: isNewThread ? threadId : null,
    };

    console.log('Sending response to client.');
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
