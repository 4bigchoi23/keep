import { NextRequest, NextResponse } from 'next/server';
// import { auth } from "@/auth";
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

    const u = new URL(q);
    if (['www.youtube.com', 'youtu.be'].includes(u?.host ?? '')) {
      // const session = await auth();

      let v = '';
      switch (u?.host) {
        case 'www.youtube.com':
          v = u?.searchParams?.get('v') ?? '';
          break;
        case 'youtu.be':
          v = u?.pathname?.split('/')?.[1] ?? '';
          break;
      }

      if (v && process.env.GOOGLE_TOKEN) {
        const tube = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${v}&key=${process.env.GOOGLE_TOKEN}`);
        const json = await tube.json();
        const snippet = json?.items?.[0]?.snippet;

        title = snippet?.title ?? title;
        description = snippet?.description ?? description;
        image = snippet?.thumbnails?.maxres?.url 
          ?? snippet?.thumbnails?.standard?.url 
          ?? snippet?.thumbnails?.high?.url 
          ?? snippet?.thumbnails?.medium?.url 
          ?? snippet?.thumbnails?.default?.url 
          ?? image;
      }
    }
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
