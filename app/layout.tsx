import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/sidebar";

export const metadata: Metadata = {
  title: "Tungsten AI OS",
  description: "Strategic Engagements & Enablement Intelligence Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex h-screen overflow-hidden bg-white">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-gray-50">{children}</main>
      </body>
    </html>
  );
}
