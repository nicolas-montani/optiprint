import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Optiprint | 40 Jahre innovativer PCB-Partner weltweit",
  description: "Seit 40 Jahren ist Optiprint zuverlässiger Leiterplattenhersteller aus der Schweiz für anspruchsvolle Anwendungen von der Medizintechnik bis zur Raumfahrt.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de">
       <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
