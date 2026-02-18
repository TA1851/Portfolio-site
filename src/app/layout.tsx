import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProviders from "@/components/providers/ThemeProvider";
import MouseStalker from "@/components/common/MouseStalker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: 'My Portfolio',
    template: '%s | My Portfolio'
  },
  description: 'My personal website and blog',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'My Portfolio',
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
        className={`${inter.variable} font-sans antialiased text-white`}
      >
        <ThemeProviders>
          <MouseStalker />
          {children}
        </ThemeProviders>
      </body>
    </html>
  );
}
