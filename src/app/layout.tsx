"use client"

import "./globals.css";
import queryClient from "@/lib/react-query-client";
import { QueryClientProvider } from "react-query";
import { Geist_Mono, DM_Sans } from 'next/font/google'


const mona = DM_Sans({ subsets: ['latin'], variable: "--font-mona-sans", })
const gest = Geist_Mono({ subsets: ['latin'], variable: "--font-geist-mono", })
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mona.variable} ${gest.variable}`}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </html>
  );
}
