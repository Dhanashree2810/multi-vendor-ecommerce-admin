import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div
      className={cn(
        "min-h-screen bg-background font-sans antialiased flex flex-col h-[100dvh]",
        poppins.variable
      )}
    >
      <main>{children}</main>
    </div>
  );
}
