"use client";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ApolloProvider } from "@apollo/client";
import client from "../../apollo-client";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "Interlade",
  description: "Digitize Your Bills Of Lading.",
};

export default function RootLayout({ children }) {
  const pathname = usePathname();

  console.log("pathname");
  return (
    <html lang="en">
      <ApolloProvider client={client}>
        <body className={inter.className}>
          {pathname !== "/login" && <Navbar />}

          <div className={`h-full ${pathname !== "/login" ? "pt-14" : ""}`}>
            {children}
          </div>
        </body>
      </ApolloProvider>
    </html>
  );
}
