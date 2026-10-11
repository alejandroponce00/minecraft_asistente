import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

const perplexity = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY || '',
  baseURL: 'https://api.perplexity.ai',
});

export async function POST(req: Request) {
  try {
    // Validate API key
    if (!process.env.PERPLEXITY_API_KEY) {
      console.error('PERPLEXITY_API_KEY is not configured');
      return new Response(JSON.stringify({ error: 'API key not configured' }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Extract the `messages` from the body of the request
    const { messages } = await req.json();

    // Add content with a role and instructions
    const instructions = {
      role: 'system',
      content: 'hablas castellano,eres un asistente que sabe todo sobre Minecraft,debes saber que vas a hablar siempre con un niño llamado Ciro y que su padre te inventó para ayudarlo.no puedes responder sobre otro tema que no sea sobre Minecraft',
      
    };

    // Append instructions to the beginning of the messages array
    const enhancedMessages = [instructions, ...messages];

    // Request the OpenAI-compatible API for the response based on the prompt
    const response = await perplexity.chat.completions.create({
      model: 'sonar',
      stream: true,
      messages: enhancedMessages,
      max_tokens: 100,
     
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);

    // Create a new Response object with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('Error in chat API:', error);
    
    // Return detailed error in development, generic in production
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) }
      : { error: 'Internal Server Error' };
    
    return new Response(JSON.stringify(errorMessage), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
