import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { APP_CONFIG } from "@/lib/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Free TOTP Generator | Secure 2FA Authenticator App Online",
    template: "%s | TOTP Generator",
  },
  description: "Generate secure Time-based One-Time Passwords (TOTP) instantly in your browser. A free, private, client-side 2FA authenticator app. Best Google Authenticator alternative for web.",
  keywords: ["totp", "totp generator", "2fa", "two factor authentication", "authenticator app", "google authenticator alternative", "secure token", "client-side totp", "free totp", "online authenticator", "otp"],
  authors: [{ name: "dev-yash", url: "https://github.com/dev-Yashwant" }],
  creator: "dev-yash",
  publisher: "dev-yash",
  metadataBase: new URL(APP_CONFIG.domain),
  openGraph: {
    title: "Free TOTP Generator | Secure 2FA Authenticator App",
    description: "Generate 2FA tokens instantly and securely in your browser. No data leaves your device.",
    url: APP_CONFIG.domain,
    siteName: "TOTP Generator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free TOTP Generator | Secure 2FA Authenticator",
    description: "Generate 2FA tokens instantly and securely in your browser. No data leaves your device.",
    creator: "@dev_yash", // Assuming handle, or generic
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
