import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";
import { CartProvider } from "@/contexts/CartContext";
import CartDrawer from "@/components/CartDrawer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Emily Flower - Hoa Sáp Thơm & Gấu Bông Hoa Handmade",
  description:
    "Chuyên cung cấp hoa sáp thơm và gấu bông hoa handmade cao cấp. Món quà tình yêu bền vững cho mọi dịp đặc biệt.",
  keywords: [
    "hoa sáp",
    "hoa sáp thơm",
    "gấu bông hoa",
    "quà tặng",
    "handmade",
    "hoa handmade",
  ],
  authors: [{ name: "Emily Flower" }],
  openGraph: {
    title: "Emily Flower - Hoa Sáp Thơm & Gấu Bông Hoa Handmade",
    description:
      "Chuyên cung cấp hoa sáp thơm và gấu bông hoa handmade cao cấp",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        <SessionProvider>
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
