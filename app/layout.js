


import "./globals.css";

import { AuthProvider } from "./context/auth_context";
import { ToastContainer } from "react-toastify";
import ClientWrapper from "./components/ClientWrapper";
import { DataProvider } from "./context/data_context";
import { ReduxProvider } from "./redux/ReduxProvider";




export const metadata = {
  title: "VapeHub - Multi-vendor Vape Store",
  description: "Multi-vendor vape e-commerce platform with premium vaping products",
  icons: {
    icon: [
      { url: '/images/logo.png' },
      { url: '/images/logo.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/logo.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/images/logo.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/images/logo.png', sizes: '192x192', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
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
      </body>
    </html>
  );
}
