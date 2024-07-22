"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store'
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { loadingSwitch } from '@/app/state/loading/loadingSlice'
import { userChange } from '@/app/state/user/userSlice'
import { useState } from 'react';

type formdata = {
  email: string;
  password: string;
}

type resObj = {
  token: string
}

type message = {
  visiblity: string
  text: string
  color: string
}


export default function Home() {
  const isVisible = useSelector( (state: RootState) => state.loading.visible )
  const dispatch = useDispatch()
  const [message, setMessage] = useState({
    visibility: 'invisible',
    text: '',
    color: ''
  })
  const router = useRouter()
  const schema = Yup.object({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
  
    password: Yup.string()
      .min(3, "Password must be 3 characters at minimum")
      .required("Password is required"),
  })

  async function login( url: string, data: formdata , reroute: AppRouterInstance ) {
    setMessage({  visibility: 'visible', text: 'loading', color: 'green' })
    try {
      const req = await fetch( url, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data) // Converting the data object to a JSON string
        }
      )
      let res = await req.json()
  
      if(res.status == 200){
        console.log('token before storage:', res.token )
        localStorage.setItem('access_token', res.token );
        console.log(res.name)
        dispatch(userChange(res.name))
      //   reroute.push('/dashboard')
      }
      if (res.status == 500) {
        setMessage({  visibility: 'visible', text: 'login failed, check details', color: 'red' })
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  return(
    <main className="w-full flex overflow-hidden relative">
      <div style={{ borderColor: message.color }} className={ `z-10 bg-white absolute p-6 px-12 shadow-md rounded-md border text-gray-600 font-semibold ${message.visibility} top-3 left-1/2 -translate-x-1/2` }>
        {message.text}
      </div>
      <div className="illustration bg-pes-gradient w-1/2 h-screen relative flex">
        <Image src={ '/pes.svg' } alt='pes hero image' width={ 130 } height={ 130 } className='z-10 mx-auto my-auto'/>

        <div className="pattern flex flex-col justify-between absolute -rotate-65 h-full -bottom-64 right-12">
          <div className='bg-white opacity-5 rounded-full h-96 w-192 m-8'></div>
          <div className='bg-white opacity-5 rounded-full h-96 w-192 m-8'></div>
          <div className='bg-white opacity-5 rounded-full h-96 w-144 m-8'></div>
        </div>

        <Image src={ '/pes-alt.svg' } alt='pes hero image' width={ 350 } height={ 350 } className='mx-auto my-auto absolute top-0 right-0'/>
      </div>

      <Formik initialValues={ { email: "", password: ""} } validationSchema={ schema } onSubmit={ (values) => { login('/api/login', values, router); dispatch( loadingSwitch() ) } }>
        <Form className="form w-1/2 h-screen flex flex-col p-28 justify-center">
          <p className='text-4xl text-semibold mb-8'>Sign In</p>

          <div className="input flex flex-col justify-center mb-4">
            <label htmlFor="email" className='mb-1'>Email Address:</label>
            <Field className='bg-transparent border border-gray-200 text-gray-200 focus:outline-pes ps-4 py-2 rounded-lg' type="email" name="email" id="email" required/>
          </div>

          <div className="input flex flex-col justify-center mb-4">
            <label htmlFor="password" className='mb-1'>Password:</label>
            <Field className='bg-transparent border border-gray-200 text-gray-200 focus:outline-pes ps-4 py-2 rounded-lg' type="password" name="password" id="password" required/>
          </div>

          <div className="flex flex-row justify-between mb-8">
            <div className='flex'>
              <Field type="checkbox" name="remember" id="remember"/>
              <label htmlFor='remember' className='mx-4'>Remember me</label>
            </div>

            <Link className='text-pes' href={'/'}>Forgot Password ?</Link>
          </div>

          <input type='submit' role='button' className="btn bg-pes text-white px-4 py-3 flex justify-center rounded-lg mb-2" value='Sign In'/>

          <p className='text-center'>{`Don't have an Account?`} <Link className='text-pes' href={'/'}>Sign Up</Link> </p>
        </Form>
      </Formik>

    </main>     
  )
}
