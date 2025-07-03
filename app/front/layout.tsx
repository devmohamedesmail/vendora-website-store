import React from 'react'
import Navbar from '../components/user_components/navbar'
import Footer from '../components/user_components/footer'
import BottomNavbar from '../components/user_components/bottom_navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <Navbar />
        {children}
        <Footer />
        <BottomNavbar />
        </div>
  )
}
