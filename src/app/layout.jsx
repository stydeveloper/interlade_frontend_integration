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
  // Define an array of routes where Navbar should not be displayed
  const routesWithoutNavbar = ["/login", "/forgot-password", "/reset-password"];
  const pathname = usePathname();

  // Check if the current route is in the array of routes without Navbar
  const hideNavbar = routesWithoutNavbar.includes(pathname);

  console.log("pathname");
  return (
    <html lang="en">
      <ApolloProvider client={client}>
        <body className={inter.className}>
          {!hideNavbar && <Navbar />}
          

          <div className={`h-full ${!hideNavbar ? "pt-14" : ""}`}>
            {children}
          </div>
        </body>
      </ApolloProvider>
    </html>
  );
}
