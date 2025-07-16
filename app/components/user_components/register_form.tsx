import React from 'react'
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi"
import CustomInput from '../../custom/custom_input'
import Link from 'next/link'

export default function Register_Form({ registerFormik, showRegisterPassword, setShowRegisterPassword, t, loading, setActiveTab }: any) {
  return (
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
        className="w-full bg-gradient-to-r from-main to-main/80 text-white py-3 px-6 rounded-xl font-semibold hover:from-second hover:to-second/90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
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
  )
}
