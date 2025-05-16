// import Link from 'next/link';
import { redirect } from 'next/navigation';

import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

import SettingsNav from '@/components/app/settings-nav';

export default async function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) {
    redirect('/');
    return <main className="central">Oops!</main>;
  }

  return (
    <>
      <div className="section">
        <div className="my-5">
          <div className="flex flex-col sm:flex-row gap-8">
            <div className="flex-1 sm:flex-none sm:min-w-[250px]">
              <SettingsNav session={session} />
            </div>
            <div className="flex-1">
              <SessionProvider>
                {children}
              </SessionProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}