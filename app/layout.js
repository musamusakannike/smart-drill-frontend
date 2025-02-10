import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/contexts/ToastContext";
import React from "react"; // Import React

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata = {
  metadataBase: new URL("https://smartdrill.vercel.app"),
  title: {
    default: "SmartDrill - Your Academic Success Companion",
    template: "%s | SmartDrill",
  },
  description:
    "Smart Drill is your ultimate companion for academic success at the University of Ilorin. This user-friendly app provides students with access to a vast repository of past questions across various courses, empowering them to prepare effectively for exams and enhance their learning experience.",
  keywords: [
    "SmartDrill",
    "University of Ilorin",
    "Past Questions",
    "Exam Preparation",
    "Academic Success",
  ],
  authors: [{ name: "SmartDrill Team" }],
  creator: "SmartDrill",
  publisher: "SmartDrill",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "SmartDrill - Your Academic Success Companion",
    description:
      "Access past questions and prepare effectively for exams at the University of Ilorin",
    url: "https://smartdrill.vercel.app",
    siteName: "SmartDrill",
    images: [
      {
        url: "https://smartdrill.vercel.app/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartDrill - Your Academic Success Companion",
    description:
      "Access past questions and prepare effectively for exams at the University of Ilorin",
    images: ["https://smartdrill.vercel.com/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
