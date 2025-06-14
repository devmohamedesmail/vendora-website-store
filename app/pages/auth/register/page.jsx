'use client'
import Footer from '@/app/components/Footer'
import Mobile_Dock from '@/app/components/Mobile_Dock'
import Navbar from '@/app/components/Navbar'
import { AuthContext } from '@/app/context/AuthContext'
import Custom_button from '@/app/custom/Custom_button'
import Custom_input from '@/app/custom/Custom_input'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
export default function page() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { auth, setAuth, login, register, logout } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)



  const handle_register_user = async (e) => {

    try {
      setLoading(true)
      const res = await register(name, email, password)
      if (res.status === 201) {
        toast.success('✅ Registration successful');

        setName('')
        setEmail('')
        setPassword('')
      }
      setLoading(false)

    } catch (error) {
      setLoading(false)

    } finally {
      setLoading(false)
    }


  }



  return (
    <div>
      <Navbar />
      <div className='container m-auto px-5'>
        <div className='flex flex-col justify-center h-screen  items-center   w-full md:w-96 mx-auto  '>
          <h1 className='text-3xl font-bold text-center'>Register</h1>
          <p className='text-center'>Welcome back! Please login to your account.</p>
          <Custom_input type={"text"} value={name} onChange={(e) => setName(e.target.value)} label={"Name"} />
          <Custom_input type={"email"} value={email} onChange={(e) => setEmail(e.target.value)} label={"Email"} />
          <Custom_input type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} label={"Password"} />


          {loading ? <span className="loading loading-spinner loading-xs"></span> : <Custom_button title="Register" onClick={handle_register_user} />}







          <div className='my-5'>
            <p className='text-center'>I have an account? <Link href="/pages/auth/login/" className='text-blue-500'>Login</Link></p>
          </div>

        </div>
      </div>
      <Footer />
      <Mobile_Dock />
    </div>
  )
}
