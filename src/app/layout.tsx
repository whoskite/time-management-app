import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Time Management App",
  description: "Manage your time effectively with time blocks, tasks, and notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          <header className="border-b">
            <div className="container flex h-16 items-center">
              <h1 className="text-xl font-bold">Time Management App</h1>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}