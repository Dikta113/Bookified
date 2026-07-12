"use client";

import dynamic from 'next/dynamic';
import React from 'react';

const BookAgentChat = dynamic(() => import('./BookAgentChat'), { ssr: false });

export default function BookAgentChatWrapper({ bookId }: { bookId: string }) {
  return <BookAgentChat bookId={bookId} />;
}
