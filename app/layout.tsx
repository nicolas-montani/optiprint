import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import { LanguageProvider } from "@/lib/language-context"
import LanguageSwitcher from "@/components/language-switcher"
import { DynamicMetadata } from "./metadata"

const inter = Inter({ subsets: ["latin"] })

// Static metadata (will be overridden by DynamicMetadata on client side)
export const metadata: Metadata = {
  title: "Optiprint | 40 Years of Innovative PCB Partner Worldwide",
  description: "For 40 years, Optiprint has been a reliable PCB manufacturer from Switzerland for demanding applications from medical technology to aerospace.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <DynamicMetadata />
          <LanguageSwitcher />
          {children}
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  )
}
