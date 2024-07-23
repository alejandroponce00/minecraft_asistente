import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

const perplexity = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY || '',
  baseURL: 'https://api.perplexity.ai',
});

export async function POST(req: Request) {
  try {
    // Extract the `messages` from the body of the request
    const { messages } = await req.json();

    // Add content with a role and instructions
    const instructions = {
      role: 'system',
      content: 'eres un asistente que sabe todo sobre Minecraft,debes saber que vas a hablar siempre con un niño llamado Ciro. no puedes responder sobre otro tema que no sea sobre Minecraft',
    };

    // Append instructions to the beginning of the messages array
    const enhancedMessages = [instructions, ...messages];

    // Request the OpenAI-compatible API for the response based on the prompt
    const response = await perplexity.chat.completions.create({
      model: 'llama-3-sonar-small-32k-chat',
      stream: true,
      messages: enhancedMessages,
      max_tokens: 300,
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);

    // Create a new Response object with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    // Handle errors by returning a response with a suitable status code and message
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
