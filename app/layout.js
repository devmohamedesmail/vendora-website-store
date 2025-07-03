


import "./globals.css";

import { AuthProvider } from "./context/auth_context";
import { ToastContainer } from "react-toastify";
import ClientWrapper from "./components/ClientWrapper";
import { DataProvider } from "./context/data_context";
import { ReduxProvider } from "./redux/ReduxProvider";




export const metadata = {
  title: "Vape Website",
  description: "Multi-vendor vape e-commerce platform",
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
