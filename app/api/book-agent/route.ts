import { NextResponse } from 'next/server';
import { searchBook } from '@/lib/actions/search.actions';

export async function POST(request: Request) {
  try {
    const { bookId, query } = await request.json();

    if (!bookId || !query) {
      return NextResponse.json({ success: false, error: 'Missing bookId or query' }, { status: 400 });
    }

    const results = await searchBook(bookId, query, 5);

    return NextResponse.json({ success: true, results });
  } catch (e) {
    console.error('book-agent error', e);
    return NextResponse.json({ success: false, error: e instanceof Error ? e.message : 'Unknown' }, { status: 500 });
  }
}
