import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Link to QR — Generate Custom QR Codes Instantly",
  description:
    "Create custom QR codes with your own colors and logo. Download as PNG or SVG. Free, fast, and no sign-up required.",
  openGraph: {
    title: "Link to QR — Generate Custom QR Codes Instantly",
    description:
      "Create custom QR codes with your own colors and logo. Download as PNG or SVG. Free, fast, and no sign-up required.",
    url: "https://linktoqr.dazzelr.tech",
    siteName: "Link to QR",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Link to QR — Generate Custom QR Codes Instantly",
    description:
      "Create custom QR codes with your own colors and logo. Download as PNG or SVG.",
  },
  metadataBase: new URL("https://linktoqr.dazzelr.tech"),
  keywords: ["QR code", "QR generator", "custom QR code", "QR code with logo", "free QR code"],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoFlex.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
