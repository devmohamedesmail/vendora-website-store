'use client'
import Navbar from '../../components/user_components/navbar'
import Custom_Input from '../../custom/custom_input'
import Custom_button from '../../custom/custom_button'
import Footer from '../../components/user_components/footer'
import BottomNavbar from '../../components/user_components/bottom_navbar'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import { FcGoogle } from "react-icons/fc"
import { FaApple } from "react-icons/fa"
import Link from 'next/link'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth_context'

export default function Login_Page() {
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('login')
  const { t } = useTranslation()
  const router = useRouter()
  const { handle_login , handle_register } = useContext(AuthContext)
  // Dummy login/register functions for demo


  const loginFormik = useFormik({
    initialValues: { 
      email: '', 
      password: '' ,
      
    },
    validationSchema: Yup.object({
      email: Yup.string().email(t('auth.invalidEmail')).required(t('auth.required')),
      password: Yup.string().required(t('auth.required')),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true)
        const res = await handle_login(values.email, values.password)
        if (res) {
          toast.success(t('auth.loginSuccess'))
          // Check user type from response and redirect accordingly
          // If type is not available, default to user dashboard
          if(res.type === 'vendor') {
            router.push('/vendor/')
          } else {
            router.push('/front/account')
          }
        }
       
      } catch (err) {
        toast.error(t('auth.loginFailed'))
      } finally {
        setLoading(false)
      }
    },
  })

  const registerFormik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: Yup.object({
      name: Yup.string().required(t('auth.required')),
      email: Yup.string().email(t('auth.invalidEmail')).required(t('auth.required')),
      password: Yup.string().min(6, t('auth.min6')).required(t('auth.required')),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true)
        const res = await handle_register(values.name, values.email, values.password)    
        if (res) {
          toast.success(t('auth.registerSuccess'))
          // Check user type from response and redirect accordingly
          // If type is not available, default to user dashboard
          if(res.type === 'vendor') {
            router.push('/vendor/')
          } else {
            router.push('/front/account')
          }
        }
      } catch (err) {
        toast.error(t('auth.registerFailed'))
      } finally {
        setLoading(false)
      }
    },
  })

  // Dummy social login handlers
  const handleGoogleLogin = () => toast.info(t('auth.googleLoginSoon'))
  const handleAppleLogin = () => toast.info(t('auth.appleLoginSoon'))

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-5">
        <div className="w-full md:w-2/3 lg:w-1/3 mx-auto mt-12 p-8 bg-white/90 shadow-2xl rounded-3xl my-12">
          <div className="flex justify-center gap-5 mb-10 bg-gray-100 py-2 px-2 rounded-xl">
            <button
              className={`px-5 py-2 flex-1 transition-all duration-300 rounded-xl text-lg font-semibold ${activeTab === 'login' ? 'bg-main text-white shadow' : 'bg-white text-main'}`}
              onClick={() => setActiveTab('login')}
            >
              {t('auth.login')}
            </button>
            <button
              className={`px-5 py-2 flex-1 transition-all duration-300 rounded-xl text-lg font-semibold ${activeTab === 'register' ? 'bg-main text-white shadow' : 'bg-white text-main'}`}
              onClick={() => setActiveTab('register')}
            >
              {t('auth.register')}
            </button>
          </div>

          {/* Social Login */}
          <div className="flex flex-col gap-3 mb-8">
            <Link href="http://localhost:1337/api/connect/google"

              className="flex items-center justify-center gap-3 w-full py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition font-semibold text-gray-700 shadow-sm"
            >
              <FcGoogle size={22} /> {t('auth.loginWithGoogle')}
            </Link>
            <button
              onClick={handleAppleLogin}
              className="flex items-center justify-center gap-3 w-full py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition font-semibold text-gray-700 shadow-sm"
            >
              <FaApple size={22} /> {t('auth.loginWithApple')}
            </button>
          </div>

          <div className="relative flex items-center mb-8">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-gray-400 font-semibold">{t('auth.or')}</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="text-center text-2xl font-semibold">
            {activeTab === 'login' && (
              <form onSubmit={loginFormik.handleSubmit}>
                <h1 className="text-xl font-bold text-center mb-5 text-indigo-700">{t('auth.login')}</h1>
                <Custom_Input
                  type="email"
                  name="email"
                  value={loginFormik.values.email}
                  onChange={loginFormik.handleChange}
                  label={t('auth.email')}
                  error={loginFormik.touched.email && loginFormik.errors.email}
                />
                <Custom_Input
                  type="password"
                  name="password"
                  value={loginFormik.values.password}
                  onChange={loginFormik.handleChange}
                  label={t('auth.password')}
                  error={loginFormik.touched.password && loginFormik.errors.password}
                />
                <div className="flex justify-end mb-4">
                  <a href="#" className="text-indigo-600 hover:underline text-sm">{t('auth.forgotPassword')}</a>
                </div>
                {loading
                  ? <span className="loading loading-spinner loading-xs"></span>
                  : <Custom_button type="submit" title={t('auth.login')} />
                }
              </form>
            )}

            {activeTab === 'register' && (
              <form onSubmit={registerFormik.handleSubmit}>
                <h1 className="text-xl font-bold text-center mb-5 text-indigo-700">{t('auth.register')}</h1>
                <Custom_Input
                  type="text"
                  name="name"
                  value={registerFormik.values.name}
                  onChange={registerFormik.handleChange}
                  label={t('auth.name')}
                  error={registerFormik.touched.name && registerFormik.errors.name}
                />
                <Custom_Input
                  type="email"
                  name="email"
                  value={registerFormik.values.email}
                  onChange={registerFormik.handleChange}
                  label={t('auth.email')}
                  error={registerFormik.touched.email && registerFormik.errors.email}
                />
                <Custom_Input
                  type="password"
                  name="password"
                  value={registerFormik.values.password}
                  onChange={registerFormik.handleChange}
                  label={t('auth.password')}
                  error={registerFormik.touched.password && registerFormik.errors.password}
                />
                {loading
                  ? <span className="loading loading-spinner loading-xs"></span>
                  : <Custom_button type="submit" title={t('auth.register')} />
                }
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <BottomNavbar />
    </div>
  )
}