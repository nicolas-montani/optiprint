import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import { LanguageProvider } from "@/lib/language-context"
import LanguageSwitcher from "@/components/language-switcher"
import { DynamicMetadata } from "./metadata"

const vectora = localFont({
  src: '../public/Vectora LT Light Regular/Vectora LT Light Regular.ttf',
  display: 'swap',
  variable: '--font-vectora',
})

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
      <body className={vectora.className}>
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
