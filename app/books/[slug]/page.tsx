import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MicOff, Mic } from "lucide-react";

import { getBookBySlug } from "@/lib/actions/book.actions";
import BookAgentChatWrapper from '@/components/BookAgentChatWrapper';

export default async function BookDetailsPage({ params }: { params: { slug: string } }) {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const { slug } = params;
  const result = await getBookBySlug(slug);

  if (!result.success || !result.data) {
    redirect('/');
  }

  const book = result.data as { title: string; author: string; coverURL?: string; persona?: string };

  return (
    <div className="book-page-container max-w-4xl mx-auto py-12 px-4">

      <Link href="/" className="back-btn-floating">
        <ArrowLeft className="w-5 h-5 text-[#212a3b]" />
      </Link>

      {/* Header card */}
      <section className="vapi-header-card bg-[#f3e4c7] rounded-xl p-6 mb-6 flex items-center gap-6">
        <div className="relative">
          <img src={book.coverURL || '/assets/default-cover.png'} alt={book.title} width={120} height={180} className="rounded shadow-md w-[120px] h-auto object-cover" />

          <button className="vapi-mic-btn absolute -right-4 -bottom-4 w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center shadow-md border">
            <MicOff className="w-6 h-6 text-[#663820]" />
          </button>
        </div>

        <div className="flex-1">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#212a3b]">{book.title}</h1>
          <p className="text-sm text-[#555] mt-1">by {book.author}</p>

          <div className="mt-4 flex items-center gap-3">
            <div className="vapi-status-indicator bg-white px-3 py-1 rounded-full flex items-center gap-2 shadow-sm">
              <span className="vapi-status-dot w-2 h-2 rounded-full bg-gray-400 inline-block" />
              <span className="vapi-status-text text-sm text-[#333]">Ready</span>
            </div>

            <div className="bg-white px-3 py-1 rounded-full shadow-sm text-sm">Voice: {book.persona || 'Daniel'}</div>

            <div className="bg-white px-3 py-1 rounded-full shadow-sm text-sm">0:00/15:00</div>
          </div>
        </div>
      </section>

      {/* Transcript area (client chat) */}
      <section className="transcript-container">
        <BookAgentChatWrapper bookId={book._id} />
      </section>

    </div>
  );
}
