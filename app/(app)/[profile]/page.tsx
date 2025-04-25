// import Link from 'next/link';
import KeepList from '@/components/app/keep-list';
import KeepMock from '@/components/app/keep-mock';
import KeepNumber from '@/components/app/keep-number';
import KeepSearch from '@/components/app/keep-search';
import KeepPagination from '@/components/app/keep-pagination';

import {
  LucideCircleUser,
  LucideMail,
  LucideEarth,
} from "lucide-react";

import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Suspense } from 'react';
import { PrismaClient } from '@/prisma/client';
const prisma = new PrismaClient();

export default async function Profile({
  params,
  searchParams,
} : {
  params: Promise<{ profile: string }>;
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const session = await auth();
  const { profile } = await params;

  const username = profile;
  const userinfo = await prisma.user.findFirst({
    select: {
      nick: true,
      email: true,
      bio: true,
      url: true,
      photo: true,
    },
    where: {
      AND: {
        username: username ?? null,
        NOT: { 
          username: null,
        },
      },
    },
  });

  const search = await searchParams;
  const query = search?.query || '';
  const currentPage = Number(search?.page) || 1;

  const itemsCount = 12;
  const pagesCount = 2;
  const totalItems = await prisma.keep.count({
    where: {
      AND: [
        {
          user: {
            username: `${username}`,
          },
        },
      ],
      OR: [
        {
          title: {
            contains: `${query}`,
          },
        },
        {
          description: {
            contains: `${query}`,
          },
        },
        {
          url: {
            contains: `${query}`,
          },
        }
      ],
    },
  });
  const totalPages = Math.ceil(totalItems / itemsCount);

  const keeps = await prisma.keep.findMany({
    skip: (currentPage - 1) * itemsCount,
    take: itemsCount,
    include: {
      user: {
        select: {
          nick: true,
          photo: true,
        },
      },
    },
    where: {
      AND: [
        {
          user: {
            username: `${username}`,
          },
        },
      ],
      OR: [
        {
          title: {
            contains: `${query}`,
          },
        },
        {
          description: {
            contains: `${query}`,
          },
        },
        {
          url: {
            contains: `${query}`,
          },
        }
      ],
    },
    orderBy: [
      {
        id: 'desc',
      },
    ],
  });

  return (
    <>
      <div className="border-b bg-linear-[130deg,var(--accent),var(--primary-foreground),var(--accent)]">
        <div className="relative m-auto -mb-10 size-28">
          <div className="absolute -top-8 overflow-hidden size-full rounded-full bg-muted flex justify-center items-center bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${userinfo?.photo ?? '/pfimg.svg'})` }}></div>
        </div>
        <div className="section text-center">
          <div className="my-5 text-4xl">
            {username ?? 'johndoe'}&apos;s profile
          </div>
          <div className="text-sm/5 text-neutral-500">
            {userinfo?.bio || 'Bio, Bio, Bio!'}
          </div>
          <hr className="my-5" />
          <div className="my-5 md:flex gap-5 justify-center items-center">
            {(!userinfo || userinfo?.nick) && (
              <div className="flex gap-2 justify-center items-center">
                <div><LucideCircleUser size={16} /></div>
                <div>{userinfo?.nick ?? 'John Doe'}</div>
              </div>
            )}
            {(!userinfo || userinfo?.email) && session && (
              <div className="flex gap-2 justify-center items-center">
                <div><LucideMail size={16} /></div>
                <div>{userinfo?.email ?? 'mail@john.doe'}</div>
              </div>
            )}
            {(!userinfo || userinfo?.url) && (
              <div className="flex gap-2 justify-center items-center">
                <div><LucideEarth size={16} /></div>
                <div>{userinfo?.url ?? 'https://john.doe'}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="section">
        <div className="my-5">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
              <div>
                <KeepNumber count={totalItems} />
              </div>
              <div>
                <KeepSearch placeholder="Search..." />
              </div>
            </div>
            <div>
              <SessionProvider>
                <Suspense key={query + currentPage} fallback={<KeepMock count={itemsCount} />}>
                  <KeepList session={session} keeps={keeps} />
                </Suspense>
              </SessionProvider>
            </div>
            <div className="my-2">
              <KeepPagination totalPages={totalPages} pagesCount={pagesCount} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
