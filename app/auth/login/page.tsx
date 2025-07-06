'use client'
import Navbar from '../../components/user_components/navbar'
import CustomInput from '../../custom/custom_input'
import Footer from '../../components/user_components/footer'
import BottomNavbar from '../../components/user_components/bottom_navbar'
import React, { useState , useEffect } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import { FcGoogle } from "react-icons/fc"
import { FaApple } from "react-icons/fa"
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi"
import Link from 'next/link'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth_context'
import Login_Welcome from '../../components/user_components/login_welcome'
import { Metadata } from 'next'




















export default function Login_Page() {
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [showRegisterPassword, setShowRegisterPassword] = useState(false)
  const { t } = useTranslation()
  const router = useRouter()
  const { handle_login, handle_register } = useContext(AuthContext)

  const loginFormik = useFormik({
    initialValues: { 
      email: '', 
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email(t('auth.invalidEmail', 'Invalid email address')).required(t('auth.required', 'This field is required')),
      password: Yup.string().required(t('auth.required', 'This field is required')),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true)
        const res = await handle_login(values.email, values.password)
        if (res) {
          toast.success(t('auth.loginSuccess', 'Login successful!'))
          // Check user type from response and redirect accordingly
          if(res.type === 'vendor') {
            router.push('/vendor/')
          } else {
            router.push('/front/account')
          }
        }
      } catch (err) {
        toast.error(t('auth.loginFailed', 'Login failed. Please try again.'))
      } finally {
        setLoading(false)
      }
    },
  })

  const registerFormik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: Yup.object({
      name: Yup.string().required(t('auth.required', 'This field is required')),
      email: Yup.string().email(t('auth.invalidEmail', 'Invalid email address')).required(t('auth.required', 'This field is required')),
      password: Yup.string().min(6, t('auth.min6', 'Password must be at least 6 characters')).required(t('auth.required', 'This field is required')),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true)
        const res = await handle_register(values.name, values.email, values.password)    
        if (res) {
          toast.success(t('auth.registerSuccess', 'Registration successful!'))
          // Check user type from response and redirect accordingly
          if(res.type === 'vendor') {
            router.push('/vendor/')
          } else {
            router.push('/front/account')
          }
        }
      } catch (err) {
        toast.error(t('auth.registerFailed', 'Registration failed. Please try again.'))
      } finally {
        setLoading(false)
      }
    },
  })

  // Social login handlers
  const handleGoogleLogin = () => toast.info(t('auth.googleLoginSoon', 'Google login coming soon!'))
  const handleAppleLogin = () => toast.info(t('auth.appleLoginSoon', 'Apple login coming soon!'))





  // Set document title dynamically
  useEffect(() => {
    document.title = `${t('siteName', 'VapeHub')} - ${t('auth.pageTitle', 'Login')}`
    
    // Set meta description if needed
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', t('auth.pageDescription', 'Login to your VapeHub account to access your dashboard and shop for the best vape products.'))
    }
  }, [t])




  return (
    <>

     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
    
      
    
    
      <Navbar />
      
      {/* Hero Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative container mx-auto px-5 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen gap-12">
          
          {/* Left Side - Welcome Section */}
           <Login_Welcome />

          {/* Right Side - Auth Form */}
          <div className="lg:w-1/2 w-full max-w-md">
            <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl p-8 border border-white/20">
              
              {/* Tab Selector */}
              <div className="flex bg-gray-100 p-1 rounded-2xl mb-8">
                <button
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === 'login' 
                      ? 'bg-white text-indigo-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveTab('login')}
                >
                  {t('auth.login', 'Login')}
                </button>
                <button
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === 'register' 
                      ? 'bg-white text-indigo-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveTab('register')}
                >
                  {t('auth.register', 'Register')}
                </button>
              </div>

              {/* Social Login Section */}
              <div className="space-y-3 mb-6">
                <Link 
                  href="http://localhost:1337/api/connect/google"
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-medium text-gray-700 group"
                >
                  <FcGoogle size={20} />
                  <span className="group-hover:text-gray-900">{t('auth.continueWithGoogle', 'Continue with Google')}</span>
                </Link>
                
                <button
                  onClick={handleAppleLogin}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-medium text-gray-700 group"
                >
                  <FaApple size={20} />
                  <span className="group-hover:text-gray-900">{t('auth.continueWithApple', 'Continue with Apple')}</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center mb-6">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="mx-4 text-sm text-gray-500 bg-white px-2">{t('auth.orContinueWith', 'Or continue with email')}</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              {/* Login Form */}
              {activeTab === 'login' && (
                <form onSubmit={loginFormik.handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('auth.welcomeBack', 'Welcome back!')}</h2>
                    <p className="text-gray-600 mb-6">{t('auth.loginSubtitle', 'Sign in to your account to continue')}</p>
                  </div>

                  <div className="space-y-4">
                    <CustomInput
                      type="email"
                      name="email"
                      value={loginFormik.values.email}
                      onChange={loginFormik.handleChange}
                      label={t('auth.emailAddress', 'Email Address')}
                      placeholder={t('auth.emailPlaceholder', 'Enter your email')}
                      error={loginFormik.touched.email ? loginFormik.errors.email : undefined}
                      icon={FiMail}
                      required
                    />

                    <div className="relative">
                      <CustomInput
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={loginFormik.values.password}
                        onChange={loginFormik.handleChange}
                        label={t('auth.password', 'Password')}
                        placeholder={t('auth.passwordPlaceholder', 'Enter your password')}
                        error={loginFormik.touched.password ? loginFormik.errors.password : undefined}
                        icon={FiLock}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                      <span className="ml-2 text-sm text-gray-600">{t('auth.rememberMe', 'Remember me')}</span>
                    </label>
                    <Link href="/auth/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                      {t('auth.forgotPassword', 'Forgot password?')}
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        {t('auth.signingIn', 'Signing in...')}
                      </div>
                    ) : (
                      t('auth.signIn', 'Sign In')
                    )}
                  </button>

                  <p className="text-center text-sm text-gray-600">
                    {t('auth.noAccount', "Don't have an account?")} {' '}
                    <button
                      type="button"
                      onClick={() => setActiveTab('register')}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      {t('auth.signUpHere', 'Sign up here')}
                    </button>
                  </p>
                </form>
              )}

              {/* Register Form */}
              {activeTab === 'register' && (
                <form onSubmit={registerFormik.handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('auth.createAccount', 'Create Account')}</h2>
                    <p className="text-gray-600 mb-6">{t('auth.registerSubtitle', 'Join our community and start shopping')}</p>
                  </div>

                  <div className="space-y-4">
                    <CustomInput
                      type="text"
                      name="name"
                      value={registerFormik.values.name}
                      onChange={registerFormik.handleChange}
                      label={t('auth.fullName', 'Full Name')}
                      placeholder={t('auth.namePlaceholder', 'Enter your full name')}
                      error={registerFormik.touched.name ? registerFormik.errors.name : undefined}
                      icon={FiUser}
                      required
                    />

                    <CustomInput
                      type="email"
                      name="email"
                      value={registerFormik.values.email}
                      onChange={registerFormik.handleChange}
                      label={t('auth.emailAddress', 'Email Address')}
                      placeholder={t('auth.emailPlaceholder', 'Enter your email')}
                      error={registerFormik.touched.email ? registerFormik.errors.email : undefined}
                      icon={FiMail}
                      required
                    />

                    <div className="relative">
                      <CustomInput
                        type={showRegisterPassword ? "text" : "password"}
                        name="password"
                        value={registerFormik.values.password}
                        onChange={registerFormik.handleChange}
                        label={t('auth.password', 'Password')}
                        placeholder={t('auth.passwordPlaceholder', 'Create a strong password')}
                        error={registerFormik.touched.password ? registerFormik.errors.password : undefined}
                        icon={FiLock}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                      >
                        {showRegisterPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mt-1" required />
                    <span className="ml-2 text-sm text-gray-600">
                      {t('auth.agreeToTerms', 'I agree to the')} {' '}
                      <Link href="/terms" className="text-indigo-600 hover:text-indigo-800 font-medium">
                        {t('auth.termsOfService', 'Terms of Service')}
                      </Link> {' '}
                      {t('auth.and', 'and')} {' '}
                      <Link href="/privacy" className="text-indigo-600 hover:text-indigo-800 font-medium">
                        {t('auth.privacyPolicy', 'Privacy Policy')}
                      </Link>
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        {t('auth.creatingAccount', 'Creating account...')}
                      </div>
                    ) : (
                      t('auth.createAccount', 'Create Account')
                    )}
                  </button>

                  <p className="text-center text-sm text-gray-600">
                    {t('auth.alreadyHaveAccount', 'Already have an account?')} {' '}
                    <button
                      type="button"
                      onClick={() => setActiveTab('login')}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      {t('auth.signInHere', 'Sign in here')}
                    </button>
                  </p>
                </form>
              )}
            </div>

            {/* Additional Info */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                {t('auth.secureLogin', 'Your information is protected with enterprise-grade security')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <BottomNavbar />
    </div>
    </>
   
  )
}