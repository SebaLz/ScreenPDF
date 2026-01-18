import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScreenPDF | Fast, Private Image to PDF Converter",
  description: "Convert your images to a single PDF fully client-side. No uploads, fast and private. Your data never leaves your device.",
  keywords: ["PDF", "Converter", "Images to PDF", "Privacy", "Client-side", "Sebastian Alcaraz", "Portfolio"],
  authors: [{ name: "Sebastian Alcaraz", url: "https://sebastianalcaraz.com" }],
  creator: "Sebastian Alcaraz",
  openGraph: {
    title: "ScreenPDF | Fast, Private Image to PDF Converter",
    description: "Securely convert images to PDF in your browser. No server uploads, 100% private.",
    url: "https://screenpdf.sebastianalcaraz.com",
    siteName: "ScreenPDF",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ScreenPDF | Fast, Private Image to PDF Converter",
    description: "Securely convert images to PDF in your browser. No server uploads, 100% private.",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased h-screen overflow-hidden flex flex-col font-display bg-background-light dark:bg-background-dark text-charcoal-900 dark:text-white">
        {children}
      </body>
    </html>
  );
}
