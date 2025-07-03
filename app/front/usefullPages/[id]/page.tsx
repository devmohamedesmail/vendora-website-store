'use client'
import React, { useContext } from 'react'
import { DataContext } from '../../../context/data_context'
import Navbar from '../../../components/user_components/Navbar';
// import Footer from '../../../components/Footer';
// import BottomNavbar from '../../../components/BottomNavbar';

function usefullPages({ params }: any) {
  const { pages } = useContext(DataContext)
  // Find the page with the matching id
  const page = pages?.find((p: any) => String(p.id) === String(params.id));

  if (!page) {
    return <div className="text-center text-gray-500 py-10">Page not found.</div>;
  }
  console.log(page)
  return (

    <>
      <Navbar />
      <div className="max-w-2xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-4 text-indigo-700">{page.title}</h1>

        {Array.isArray(page.content) && page.content.map((para, idx) => (
          <p key={idx} >
            {para.children && para.children.map((child, cidx) => child.text).join('')}
          </p>
        ))}
      </div>
       {/* <Footer /> */}
      {/* <BottomNavbar /> */} 

    </>
  )
}

export default usefullPages