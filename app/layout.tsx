'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import store from '../store/store';
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Toaster position="top-center" />
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
