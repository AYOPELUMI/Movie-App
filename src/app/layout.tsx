"use client"

import "./globals.css";
import queryClient from "@/lib/react-query-client";
import { QueryClientProvider } from "react-query";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </html>
  );
}
