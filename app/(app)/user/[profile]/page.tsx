// import Link from 'next/link';
import KeepWrap from "@/components/app/keep-wrap";

import {
  LucideCircleUser,
  LucideMail,
  LucideEarth,
} from "lucide-react";

import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { PrismaClient } from '@/prisma/client';
const prisma = new PrismaClient();

export default async function Profile(props: {
  params: Promise<{ profile: string }>;
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const session = await auth();
  const search = await props.searchParams;
  const query = search?.query || '';
  const page = Number(search?.page) || 1;

  const { profile } = await props.params;
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

  return (
    <>
      <div className="border-b bg-linear-[130deg,var(--accent),var(--primary-foreground),var(--accent)]">
        <div className="relative m-auto -mb-10 size-28">
          <div className="absolute z-11 -top-8 overflow-hidden size-full rounded-full bg-muted flex justify-center items-center bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${userinfo?.photo ?? '/pfimg.svg'})` }}></div>
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
          <SessionProvider>
            <KeepWrap 
              session={session}
              username={username}
              query={query}
              page={page}
              itemsCount={12}
              pagesCount={2}
            />
          </SessionProvider>
        </div>
      </div>
    </>
  );
}
