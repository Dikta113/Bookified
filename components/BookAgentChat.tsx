"use client";

import React, { useState } from 'react';
import Transcript from './Transcript';

type Message = { id: string; role: 'book' | 'user'; text: string };

export default function BookAgentChat({ bookId }: { bookId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<string | undefined>(undefined);
  const [currentUserMessage, setCurrentUserMessage] = useState<string | undefined>(undefined);

  const sendQuery = async (q: string) => {
    if (!q) return;
    const userMsg: Message = { id: String(Date.now()) + '-u', role: 'user', text: q };
    setMessages((m) => [...m, userMsg]);
    setCurrentUserMessage(undefined);
    setLoading(true);

    // show streaming placeholder
    setCurrentMessage('');

    try {
      const res = await fetch('/api/book-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId, query: q })
      });
      const data = await res.json();
      const bookReply = data?.success && data.results?.length ? String(data.results[0].content || data.results[0]) : 'I could not find anything relevant.';

      // simulate streaming by gradually revealing text (quickly)
      let idx = 0;
      const interval = setInterval(() => {
        idx += 10;
        setCurrentMessage(bookReply.slice(0, idx));
        if (idx >= bookReply.length) {
          clearInterval(interval);
          setMessages((m) => [...m, { id: String(Date.now()) + '-b', role: 'book', text: bookReply }]);
          setCurrentMessage(undefined);
        }
      }, 20);
    } catch (e) {
      setCurrentMessage(undefined);
      setMessages((m) => [...m, { id: String(Date.now()) + '-b', role: 'book', text: 'Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Transcript messages={messages.map(m => ({ role: m.role === 'book' ? 'assistant' : 'user', content: m.text }))} currentMessage={currentMessage} currentUserMessage={currentUserMessage} />

      <div className="mt-4 flex gap-2">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ask about this book..." className="flex-1 p-2 border rounded" />
        <button disabled={loading} onClick={() => { sendQuery(query); setQuery(''); }} className="px-4 py-2 bg-[#663820] text-white rounded">Ask</button>
      </div>
    </div>
  );
}
