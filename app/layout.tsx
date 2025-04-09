import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteNavbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { NotificationProvider } from "@/components/providers/notification-provider";
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UniMart",
  description: "Buy and sell items with other university students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={inter.className}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NotificationProvider>
            <Provider>
              <div className="flex min-h-screen flex-col">
                <SiteNavbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </Provider>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
