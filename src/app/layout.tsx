import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto, Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ['latin'],
})

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ['latin'],
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SeekerDev",
  description: "Portfolio of John Albert Seeker - Full Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} ${raleway.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
