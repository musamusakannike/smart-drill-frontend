import localFont from "next/font/local";
import "./globals.css";
import { ToastProvider } from "@/contexts/ToastContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Smart Drill",
  description:
    "Smart Drill is your ultimate companion for academic success at the University of Ilorin. This user-friendly app provides students with access to a vast repository of past questions across various courses, empowering them to prepare effectively for exams and enhance their learning experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
