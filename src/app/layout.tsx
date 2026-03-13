import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EF Pro Cycling - Digital Strategy",
  description: "Digital infrastructure and fan engagement strategy for EF Pro Cycling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
