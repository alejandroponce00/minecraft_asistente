'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';
import Fondo from './components/fondo/fondo';
import { FlipWords } from "../app/components/ui/flip-words";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const words = ["Asistente", "Experto", "Sabelotodo"];
  
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Desplazarse al final cuando cambian los mensajes
    messageContainerRef.current?.scrollTo(0, messageContainerRef.current.scrollHeight);
  }, [messages]);

  return (
    <div className='text-center rounded-lg p-4 mx-2.5 '>
      <Fondo />
      <h1 className='text-5xl text-center my-3 text-green-500 font-bold mb-10'>
        <FlipWords words={words} /> <br /> de Minecraft
      </h1>
      
      <h6 className='text-2xl text-center my-3 text-slate-600 mb-10'>
        Hola Ciro, pregúntame algo sobre Minecraft
      </h6>
    
      <div 
        ref={messageContainerRef} 
        className='mb-4 max-h-96 h-full overflow-y-scroll'
      >
        {messages.map((m) => (
          <div 
            key={m.id} 
            className={`p-2 my-2 rounded-md ${m.role === 'user' ? 'bg-blue-200 text-left opacity-60' : 'bg-green-200 text-right opacity-60'}`}
          >
            {m.role === 'user' ? 'YO: ' : 'ASISTENTE: '}
            {m.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className='flex'>
        <input
          value={input}
          placeholder="Pregúntame algo"
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button className='bg-amber-400 text-white px-3 py-2 rounded-md'>
          enviar
        </button>
      </form>
    </div>
  );
}
