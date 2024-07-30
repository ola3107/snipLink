import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider"
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SnipeLink",
  description: " SnipLink is a powerful URL shortener and QR code generator that transforms long URLs into short, shareable links and creates QR codes with ease. Ideal for marketers, content creators, and businesses, SnipLink helps you enhance your online presence and track link performance with detailed analytics.",
  keywords: "url shortener, qr code generator, link management, link analytics, branded links, custom slugs, domain customization, link tracking, link performance, link management, link shortening, qr code generation, analytics dashboard, user-friendly interface, help and support, real-time notifications",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
