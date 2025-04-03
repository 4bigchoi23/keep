import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "KEEP",
  description: "Keep your bookmark!",
};

import "../globals.css";
import { Toaster } from "@/components/ui/sonner"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <div id="app">
          {children}
        </div>

        <Toaster 
          position="top-center" 
          toastOptions={{
            classNames: {
              toast: 'font-body',
            },
          }} 
        />
      </body>
    </html>
  );
}
