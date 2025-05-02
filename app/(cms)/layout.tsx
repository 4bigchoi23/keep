// import type { Metadata } from 'next';
// export const metadata: Metadata = {
//   title: "",
//   description: "",
// };

export default async function CMSLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
