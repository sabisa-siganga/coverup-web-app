import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import SplashScreen from "@/components/SplashScreen/SplashScreen";
import Navbar from "@/components/NavBar/Navbar";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { StoreProvider } from "@/store/StoreProvider";
import Footer from "@/components/Footer/Footer";
// import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cover Up",
  description: "Get covered up and choose from various options",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loading = false;

  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          {loading && <SplashScreen />}

          {!loading && (
            <>
              <Navbar />
              {children}
              <Footer />
            </>
          )}
        </StoreProvider>
      </body>
    </html>
  );
}
