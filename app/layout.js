import {Inter} from "next/font/google"
import "./globals.css";
import { ToastProvider } from "@/contexts/ToastContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata = {
  title: "Smart Drill",
  description:
    "Smart Drill is your ultimate companion for academic success at the University of Ilorin. This user-friendly app provides students with access to a vast repository of past questions across various courses, empowering them to prepare effectively for exams and enhance their learning experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}`}
      >
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
