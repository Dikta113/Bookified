"use client";

import React, {useEffect, useRef} from 'react';

type Msg = { role: 'assistant' | 'user'; content: string };

export default function Transcript({ messages, currentMessage, currentUserMessage }: { messages: Msg[]; currentMessage?: string; currentUserMessage?: string }){
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, currentMessage, currentUserMessage]);

  const isEmpty = !messages || messages.length === 0;

  if (isEmpty) {
    return (
      <div className="transcript-container">
        <div className="transcript-empty text-center">
          <div className="transcript-empty-icon text-[#663820] text-4xl">🎤</div>
          <div className="transcript-empty-text font-semibold text-lg mt-4">No conversation yet</div>
          <div className="transcript-empty-hint text-sm text-[#666] mt-2">Click the mic button above to start talking</div>
        </div>
      </div>
    )
  }

  return (
    <div className="transcript-container">
      <div ref={containerRef} className="transcript-messages space-y-4 max-h-[60vh] overflow-auto p-2">
        {messages.map((m, idx) => {
          const isUser = m.role === 'user';
          return (
            <div key={idx} className={`transcript-message ${isUser ? 'transcript-message-user' : 'transcript-message-assistant'} flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`transcript-bubble ${isUser ? 'transcript-bubble-user' : 'transcript-bubble-assistant'} max-w-[80%] p-3 rounded-lg relative`}>
                <div>{m.content}</div>
              </div>
            </div>
          )
        })}

        {/* streaming assistant message */}
        {currentMessage && (
          <div className="transcript-message transcript-message-assistant flex justify-start">
            <div className="transcript-bubble transcript-bubble-assistant max-w-[80%] p-3 rounded-lg relative">
              <span>{currentMessage}</span>
              <span className="transcript-cursor inline-block ml-1">▌</span>
            </div>
          </div>
        )}

        {/* streaming user message */}
        {currentUserMessage && (
          <div className="transcript-message transcript-message-user flex justify-end">
            <div className="transcript-bubble transcript-bubble-user max-w-[80%] p-3 rounded-lg relative text-white bg-[#663820]">
              <span>{currentUserMessage}</span>
              <span className="transcript-cursor inline-block ml-1">▌</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
