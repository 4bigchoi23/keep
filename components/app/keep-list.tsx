'use client';

// import Link from 'next/link';

import type { Session } from 'next-auth';

import KeepItem from '@/components/app/keep-item';

export default function KeepList({
  session,
  keeps,
}: {
  session?: Session | null;
  keeps?: {
    id?: number,
    userId?: string | null,
    title?: string | null,
    description?: string | null,
    url?: string | null,
    image?: string | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    user?: {
      nick?: string | null,
      photo?: string | null,
    },
  }[];
}) {
  return(
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {!keeps?.length ? (
          <div className="md:col-span-2 lg:col-span-3">
            <div className="text-center p-5">
              <div className="text-8xl">🤷</div>
              <div className="text-3xl my-4 underline underline-offset-10 decoration-2 decoration-wavy">Oops!</div>
              <div className="text-2xl my-4 underline underline-offset-10 decoration-2 decoration-wavy">There&apos;s nothing here!</div>
            </div>
          </div>
        ) : (
          keeps.map((keep) => {
            return(
              <div key={keep.id}>
                <KeepItem session={session} keep={keep} />
              </div>
            )
          })
        )
      }
    </div>
  );
}
