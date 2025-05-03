// 'use client';

// import Link from 'next/link';
import { SessionProvider } from "next-auth/react";
import Keep from "@/components/app/keep";
// import Auth from "@/components/app/auth"; // use client
import Auth from "@/components/app/authenticate"; // use server

export default function Header() {
  return (
    <header className="header">
      <div className="section">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Keep />
          </div>
          <div className="flex gap-2 items-center">
            <SessionProvider>
              <Auth />
            </SessionProvider>
          </div>
        </div>
      </div>
    </header>
  );
}
