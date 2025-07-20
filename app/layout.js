


import "./globals.css";

import { AuthProvider } from "./context/auth_context";
import { ToastContainer } from "react-toastify";
import ClientWrapper from "./components/common/client_wrapper";
import { DataProvider } from "./context/data_context";
import { ReduxProvider } from "./redux/ReduxProvider";
import PWAInstallPrompt from "./components/user_components/pwa_install_prompt";



export const metadata = {
  title: "VapeHub - Multi-vendor Vape Store",
  description: "Multi-vendor vape e-commerce platform with premium vaping products",
  manifest: '/manifest.json',
  metadataBase: new URL("https://yourdomain.com"),
  alternates: {
    canonical: "/",
  },

  keywords: [
    "vape", "vape store", "multi-vendor vape", "e-cigarettes",
    "vape juice", "vape devices", "premium vape", "VapeHub",
  ],

  openGraph: {
    title: "VapeHub - Multi-vendor Vape Store",
    description: "Shop premium vape products from multiple vendors in one place.",
    url: "https://yourdomain.com",
    siteName: "VapeHub",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "VapeHub - Multi-vendor Vape Store",
      },
    ],
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "VapeHub - Multi-vendor Vape Store",
    description: "Explore the best multi-vendor vape e-commerce platform.",
    images: ["/images/og-image.png"],
    creator: "@yourTwitterHandle",
  },

  icons: {
    icon: [
      { url: "/images/logo.png", sizes: "16x16", type: "image/png" },
      { url: "/images/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/images/logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/images/logo.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "manifest", url: "/images/logo.png" },
    ],
  },

  themeColor: "#000000", // or match your dark/light theme
};


export default function RootLayout({ children }) {

  return (
    <html lang="en">
       <head>
        {/* PWA meta tags for all platforms */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6366f1" />
        
        {/* iOS PWA meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Vendora" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* iOS icons */}
        <link rel="apple-touch-icon" href="/images/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo.png" />
        <link rel="apple-touch-startup-image" href="/images/logo.png" />
        
        {/* Prevent zooming on iOS */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
      </head>
      <body
        className={` antialiased`}
      >
        <ReduxProvider>
          <AuthProvider>
            <DataProvider>

              <ClientWrapper>
                {children}
                <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"

                />
              </ClientWrapper>

            </DataProvider>
          </AuthProvider>
        </ReduxProvider>
         {/* <PWAInstallPrompt /> */}
      </body>
    </html>
  );
}
