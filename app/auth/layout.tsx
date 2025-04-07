"use client";
import type React from "react"
import { Inter } from "next/font/google"
import Provider from "@/components/Provider"
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] })


export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <Provider>
              <main className="min-h-screen w-full justify-between">{children}</main>
    </Provider>
      </body>
    </html>
  </ThemeProvider>
  )
}