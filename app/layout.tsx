import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "./provider";
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', 
});

export const metadata: Metadata = {
  title: "Cuttly",
  description: "A URL shortening service",
  icons: {
    icon: "https://res.cloudinary.com/dr8ubbrmp/image/upload/v1748000628/shoo4vbiqfjyzkmk3hyl.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
