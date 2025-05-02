import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "KEEP",
  description: "Keep your bookmark!",
};

import "./globals.css";
import { ThemeProvider } from "@/components/app/theme-provider"
import { Toaster } from "@/components/ui/sonner"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
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
        </ThemeProvider>
      </body>
    </html>
  );
}
