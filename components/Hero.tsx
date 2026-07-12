import Link from "next/link";

export default function Hero() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#f5eadb] rounded-2xl shadow-lg overflow-hidden p-6 md:p-10 flex flex-col md:flex-row items-stretch gap-6">

          {/* Left: heading + description + CTA */}
          <div className="md:w-1/3 flex flex-col justify-center gap-4">
            <h1 className="text-4xl font-bold text-[#2b2b2b]">Your Library</h1>
            <p className="text-[#334155]">Turn your books into a living library — upload PDFs, chat with them by voice, and explore summaries instantly.</p>
            <div>
              <Link href="/root/books/new" className="inline-block mt-2 bg-[#8b5e3c] text-white px-4 py-2 rounded-lg shadow hover:bg-[#7a4f31] transition">Add New Book</Link>
            </div>
          </div>

          {/* Center: illustration */}
          <div className="md:w-1/3 flex items-center justify-center">
            <div className="w-56 h-56 flex items-center justify-center">
              {/* Simple vintage books + globe SVG */}
              <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Vintage books and globe illustration">
                <defs>
                  <linearGradient id="beigeGrad" x1="0" x2="1">
                    <stop offset="0" stopColor="#f9f6f0" />
                    <stop offset="1" stopColor="#efe6d8" />
                  </linearGradient>
                </defs>

                {/* Globe */}
                <g transform="translate(145,45) scale(0.9)">
                  <circle cx="0" cy="0" r="28" fill="#cfe8e2" stroke="#9fbfb6" strokeWidth="2" />
                  <path d="M -28 0 A 28 28 0 0 0 28 0" fill="none" stroke="#9fbfb6" strokeWidth="1" opacity="0.7" />
                  <path d="M 0 -28 A 28 28 0 0 0 0 28" fill="none" stroke="#9fbfb6" strokeWidth="1" opacity="0.7" />
                </g>

                {/* Books stack */}
                <g transform="translate(30,40)">
                  <rect x="0" y="20" width="120" height="18" rx="3" fill="#8b5e3c" />
                  <rect x="6" y="8" width="108" height="18" rx="3" fill="#b77446" />
                  <rect x="12" y="-4" width="96" height="18" rx="3" fill="#e9d5b8" />
                  <rect x="18" y="-16" width="84" height="18" rx="3" fill="#d7b89a" />
                  <rect x="-6" y="36" width="132" height="6" rx="3" fill="url(#beigeGrad)" />

                  {/* book details */}
                  <rect x="4" y="10" width="6" height="10" rx="1" fill="#f3e8de" opacity="0.6" />
                  <rect x="10" y="10" width="6" height="10" rx="1" fill="#f3e8de" opacity="0.4" />
                </g>

              </svg>
            </div>
          </div>

          {/* Right: small white card with 3 steps */}
          <div className="md:w-1/3 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow p-4 w-full max-w-xs">
              <h3 className="text-lg font-semibold text-[#111827] mb-3">Getting started</h3>
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#f3f4f6] font-semibold text-sm">1</div>
                  <div className="text-sm text-[#374151]">Upload a PDF</div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#f3f4f6] font-semibold text-sm">2</div>
                  <div className="text-sm text-[#374151]">Start a voice chat</div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#f3f4f6] font-semibold text-sm">3</div>
                  <div className="text-sm text-[#374151]">Explore summaries & notes</div>
                </li>
              </ol>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
