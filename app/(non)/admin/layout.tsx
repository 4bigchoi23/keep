// import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from "@/auth";

import { AppSidebar } from "@/components/non/admin/app-sidebar"
import { SiteHeader } from "@/components/non/admin/site-header"
import { SiteFooter } from "@/components/non/admin/site-footer"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default async function AdminLayout({
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
            <SiteFooter />
          </SidebarInset>
        </SidebarProvider>
      </main>
    </>
  );
}
