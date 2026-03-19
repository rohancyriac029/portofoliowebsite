import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rohan Cyriac — Developer & AI Enthusiast",
  description: "Full-stack developer and AI enthusiast building elegant and impactful software. Specializing in distributed systems, AI/ML, and modern web development.",
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
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Space+Grotesk:wght@300;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
