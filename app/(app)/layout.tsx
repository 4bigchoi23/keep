// import type { Metadata } from 'next';
// export const metadata: Metadata = {
//   title: "",
//   description: "",
// };

import Header from '@/components/app/header';
import Footer from '@/components/app/footer';

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}
