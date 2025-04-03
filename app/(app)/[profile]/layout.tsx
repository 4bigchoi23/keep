// import Link from 'next/link';
import Header from '@/components/app/header';
import Footer from '@/components/app/footer';

export default async function ProfileLayout({
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
