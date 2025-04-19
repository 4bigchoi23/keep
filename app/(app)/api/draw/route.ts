import { NextRequest, NextResponse } from 'next/server';
import { JSDOM } from 'jsdom';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const q = decodeURIComponent(url.searchParams.get('q')?.toString() ?? '');

  let title = '';
  let description = '';
  let image = '';

  if (q.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)) {
    const data = await fetch(q, { cache: 'no-store' });
    const html = await data.text();
    const dom = new JSDOM(html);
    const doc = dom?.window?.document;

    title = doc?.querySelector('title')?.textContent ?? '';
    description = doc?.querySelector('meta[property="og:description"]')?.getAttribute('content') ?? '';
    image = doc?.querySelector('meta[property="og:image"]')?.getAttribute('content') ?? '';
  }

  return NextResponse.json(
    {
      title: `${title}`,
      description: `${description}`,
      image: `${image}`,
    },
    { status: 200 }
  );
}
