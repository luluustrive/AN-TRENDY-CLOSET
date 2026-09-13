import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { WishlistProvider } from "@/lib/wishlist-context";
import { ToastProvider } from "@/lib/toast-context";
import { ThemeProvider } from "@/lib/theme-context";
import { StoreSettingsProvider } from "@/lib/store-settings-context";
import { CategoriesProvider } from "@/lib/categories-context";
import ToastContainer from "@/components/ui/ToastContainer";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AN Trendy Closet | Modern Luxury Commerce Bangladesh",
  description:
    "Shop luxury watches, designer bags, beauty cosmetics, fine jewelry, and fashion accessories at AN Trendy Closet. Fast delivery across Bangladesh.",
  keywords: [
    "AN Trendy Closet",
    "Luxury Fashion Bangladesh",
    "Ladies Watches",
    "Handbags",
    "Cosmetics",
    "Jewelry",
    "E-commerce Bangladesh",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <body
        className="min-h-screen flex flex-col justify-between antialiased selection:bg-amber-500 selection:text-white"
        suppressHydrationWarning
      >
        <StoreSettingsProvider>
          <CategoriesProvider>
            <ThemeProvider>
              <ToastProvider>
                <WishlistProvider>
                  <CartProvider>
                    <Header />
                    <main className="flex-grow">{children}</main>
                    <Footer />
                    <ToastContainer />
                  </CartProvider>
                </WishlistProvider>
              </ToastProvider>
            </ThemeProvider>
          </CategoriesProvider>
        </StoreSettingsProvider>
      </body>
    </html>
  );
}
