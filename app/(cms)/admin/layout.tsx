// import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from "@/auth";

import { AppSidebar } from "@/components/cms/app-sidebar"
import { SiteHeader } from "@/components/cms/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session?.user?.role !== 'admin') {
    redirect('/');
    return <main className="central">Oops!</main>;
  }

  return (
    <>
      <main>
        <SidebarProvider>
          <AppSidebar variant="inset" />
          <SidebarInset>
            <SiteHeader />
            <div>
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </main>
    </>
  );
}
