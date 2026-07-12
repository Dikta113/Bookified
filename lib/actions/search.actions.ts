import { searchBookSegments } from './book.actions';

export const searchBook = async (bookId: string, query: string, limit: number = 5) => {
  // Thin wrapper around existing search logic
  const results = await searchBookSegments(bookId, query, limit);
  return results;
};
