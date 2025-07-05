import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProviders from "@/components/providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: 'Personal Blog',
    template: '%s | Personal Blog'
  },
  description: 'Personal website and blog',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Personal Blog',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}
      >
        <ThemeProviders>
          {children}
        </ThemeProviders>
      </body>
    </html>
  );
}
