


import "./globals.css";

import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import ClientWrapper from "./components/ClientWrapper";
import { DataProvider } from "./context/DataContext";





export const metadata = {
  title: "Queue App",
  description: "Queue App",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
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
      </body>
    </html>
  );
}
