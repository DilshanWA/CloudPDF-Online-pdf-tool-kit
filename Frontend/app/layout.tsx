import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import  Header  from "@/components/Header";
import { Analytics } from "@vercel/analytics/next"
import MaintenancePage from "@/components/ui/maintenance";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    default: "CloudPDF- Free PDF Converter Online",
    template: "%s | PDF Converter",
  },
  description:
    "Convert PDF files online for free. Fast, secure, no signup required. Supports Word, Excel, JPG, PNG and more.",
  keywords: [
    "pdf converter",
    "pdf to word",
    "pdf to excel",
    "free pdf converter",
  ],
  authors: [{ name: "Dilshan" }],
  creator: "Dilshan",

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cloudpdf.app",
    title: "Free PDF Converter",
    description: "Convert PDF files online for free.",
    siteName: "PDF Converter",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Free PDF Converter",
    description: "Convert PDF files online for free.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  alternates: {
    canonical: "https://cloudpdf.app",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main> 
        <Analytics />
      </body>
    </html>
  );
}