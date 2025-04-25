// import Link from 'next/link';
import Header from '@/components/app/header';
import Footer from '@/components/app/footer';
import KeepDash from "@/components/app/keep-dash";
import KeepForm from "@/components/app/keep-form";
import KeepList from '@/components/app/keep-list';
import KeepMock from '@/components/app/keep-mock';
import KeepNumber from '@/components/app/keep-number';
import KeepSearch from '@/components/app/keep-search';
import KeepPagination from '@/components/app/keep-pagination';

import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Suspense } from 'react';
import { PrismaClient } from '@/prisma/client';
const prisma = new PrismaClient();

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const session = await auth();
  const search = await props.searchParams;
  const query = search?.query || '';
  const currentPage = Number(search?.page) || 1;
  
  const itemsCount = 12;
  const pagesCount = 2;
  const totalItems = await prisma.keep.count({
    where: {
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
          username: true,
        },
      },
    },
    where: {
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
      <Header />
      <main>
        <div className="section">
          <div className="my-5">
            {!session ? (
              <KeepDash />
            ) : (
              <KeepForm />
            )}
          </div>

          <div className="my-5">
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
                <div className="lg:col-span-2">
                  <KeepNumber count={totalItems} />
                </div>
                <div className="">
                  <KeepSearch placeholder="Search..." />
                </div>
              </div>
              <div>
                <SessionProvider>
                  <Suspense key={query + currentPage} fallback={<KeepMock count={itemsCount} />}>
                    <KeepList keeps={keeps} session={session} />
                  </Suspense>
                </SessionProvider>
              </div>
              <div className="my-2">
                <KeepPagination totalPages={totalPages} pagesCount={pagesCount} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
