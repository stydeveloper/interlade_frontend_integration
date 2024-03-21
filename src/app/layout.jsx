"use client";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ApolloProvider } from "@apollo/client";
import client from "../../apollo-client";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import Navbar2 from "@/components/Navbar2";
import Footer2 from "@/components/Footer2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FilterProvider } from "@/components/FilterProvider";

// import "react-toastify/dist/ReactToastify.css";
// import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "Interlade",
  description: "Digitize Your Bills Of Lading.",
};

export default function RootLayout({ children }) {
  // Define an array of routes where Navbar should not be displayed

  const routesWithoutNavbar = [
    "/login",
    "/forgot-password",
    "/reset-password",
    "/pricing",
    "/signup",
    "/public-url",
  ];

  const routesWithNavbar2 = ["/pricing"];

  const pathname = usePathname();

  // Check if the current route is in the array of routes without Navbar
  const hideNavbar = routesWithoutNavbar.includes(pathname);
  // const showNavbar2 = routesWithNavbar2.includes(pathname);

  // Render the spinner if loading is true

  return (
    <html lang="en">
      <ApolloProvider client={client}>
        <FilterProvider>
          <body className={inter.className}>
            {!hideNavbar && <Navbar />}
            {/* {showNavbar2 && <Navbar2 />} */}
            <div className={`h-full ${!hideNavbar ? "pt-14" : ""}`}>
              {children}
            </div>
            <ToastContainer style={{ marginTop: "40px" }} />
            {/* {showNavbar2 && <Footer2 />} */}
          </body>
        </FilterProvider>
      </ApolloProvider>
    </html>
  );
}
