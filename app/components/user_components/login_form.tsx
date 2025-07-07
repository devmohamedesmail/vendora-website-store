import React from 'react'
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi"
import CustomInput from '../../custom/custom_input'
import Link from 'next/link'
export default function Login_Form({ loginFormik, showPassword, setShowPassword, t , loading , setActiveTab }:any) {
    return (
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
    )
}
