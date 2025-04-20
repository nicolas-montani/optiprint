import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Optiprint AG - 40 Jahre Jubiläum",
  description: "Wir feiern 40 Jahre Innovation und Qualität in der Leiterplattenherstellung",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
