// 'use client';

// import Link from 'next/link';
// import { SessionProvider } from "next-auth/react";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800">
      <div className="section text-center">
        &copy; {(new Date().getFullYear())}. KEEP. All rights reserved.
      </div>
    </footer>
  );
}
