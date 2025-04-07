"use client";
import type React from "react"
import { Inter } from "next/font/google"
import Provider from "@/components/Provider"

const inter = Inter({ subsets: ["latin"] })


export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Provider>
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
              <main className="min-h-screen w-full justify-between">{children}</main>
      </body>
    </html>
    </Provider>
  )
}