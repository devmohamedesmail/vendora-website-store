'use client'
import Navbar from '../../../components/Navbar'
import Custom_input from '../../../custom/Custom_input'
import Custom_button from '../../../custom/Custom_button'
import Footer from '../../../components/Footer'


import React, { useContext, useState } from 'react'
import {  toast } from 'react-toastify';
import { useTranslation } from 'react-i18next'
import {  useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import BottomNavbar from '../../../components/BottomNavbar'


export default function page() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  // const { auth, setAuth, login, register, logout } = useContext(AuthContext)
  const [activeTab, setActiveTab] = useState('login')
  const { t, i18n } = useTranslation();
  const router = useRouter()




  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email(t('invalid-email')).required(t('required')),
      password: Yup.string().required(t('required')),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true)
        const res = await login(values.email, values.password)
      
        if (res.status === 200) {
          toast.success(t('login-success'));
          setEmail('')
          setPassword('')
        }

        const role = res.user.user.user.role
        if (role === 'admin') {

          router.push('/pages/admin')
        } else if (role === 'subscriber') {
          router.push('/pages/subscriber')
        } else {
      
          router.push('/')
        }
        setLoading(false)
      } catch (err) {
        toast.log(t('login-failed'));
      } finally {
        setLoading(false);
      }
    },
  });






  const registerFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',

    },
    validationSchema: Yup.object({
      name: Yup.string().required(t('required')),
      email: Yup.string().email(t('invalid-email')).required(t('required')),
      password: Yup.string().min(6, t('min-6')).required(t('required')),

    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await register(values.name, values.email, values.password)
        if (res.status === 201) {
          toast.success('✅ Registration successful');
          setName('')
          setEmail('')
          setPassword('')
        }

        setLoading(false)
      } catch (err) {
        toast.error(t('register-failed'));
      } finally {
        setLoading(false);
      }
    },
  });







  








  return (
    <div>
      <Navbar />
      <div className='container m-auto px-5'>



        <div className='w-full md:1/2 lg:w-1/3 m-auto mt-10 p-5  shadow-lg rounded-lg my-10'>
          <div className='flex justify-center gap-5 my-10 bg-gray-200 py-2 px-2 rounded-lg'>
            <button className={`px-5 py-2 flex-1 transition-colors ease-in-out duration-500 rounded-lg ${activeTab === 'login' ? 'bg-black text-white' : 'bg-white text-black'}`} onClick={() => setActiveTab('login')}>{t('login')}</button>
            <button className={`px-5 py-2 flex-1 transition-colors ease-in-out duration-500 rounded-lg ${activeTab === 'register' ? 'bg-black text-white' : 'bg-white text-black'}`} onClick={() => setActiveTab('register')}>{t('register')}</button>
          </div>

          <div className="text-center text-2xl font-semibold">
            {activeTab === 'login' &&
              (
                <form onSubmit={loginFormik.handleSubmit}>
                  <div className='  '>
                    <h1 className='text-xl font-bold text-center mb-3'>{t('login')}</h1>
                    <Custom_input
                      type={"email"}
                      name="email"
                      value={loginFormik.values.email}
                      onChange={loginFormik.handleChange}
                      label={t('email')}
                      error={loginFormik.touched.email && loginFormik.errors.email}
                    />
                    <Custom_input
                      type={"password"}
                      name="password"
                      value={loginFormik.values.password}
                      onChange={loginFormik.handleChange}
                      label={t('password')}
                      error={loginFormik.touched.password && loginFormik.errors.password}
                    />

                    {loading ? <Custom_spinner /> : <Custom_button type='submit' title={t('login')} />}

                  </div>
                </form>
              )

            }
            {activeTab === 'register' &&

              (
                <form onSubmit={registerFormik.handleSubmit}>
                  <div>
                    <h1 className='text-xl font-bold text-center mb-3'>{t('register')}</h1>
                    <Custom_input
                      type={"text"}
                      name="name"
                      value={registerFormik.values.name}
                      onChange={registerFormik.handleChange} label={t('name')}
                      error={registerFormik.touched.name && registerFormik.errors.name}
                    />
                    <Custom_input
                      type={"email"}
                      name="email"
                      value={registerFormik.values.email}
                      onChange={registerFormik.handleChange}
                      label={t('email')}
                      error={registerFormik.touched.email && registerFormik.errors.email}
                    />
                    <Custom_input
                      type={"password"}
                      name="password"
                      value={registerFormik.values.password} onChange={registerFormik.handleChange}
                      label={t('password')}
                      error={registerFormik.touched.password && registerFormik.errors.password}
                    />


                    {loading ? <span className="loading loading-spinner loading-xs"></span> : <Custom_button title={t('register')} type='submit' />}
                  </div>
                </form>
              )


            }
          </div>

        </div>








      </div>
      <Footer />
      <BottomNavbar />
    </div>
  )
}
