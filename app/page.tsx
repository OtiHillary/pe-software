"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './state/store'
import { redirect } from 'next/navigation';
import { Formik, Form, Field, useFormik, FormikHelpers, FormikValues } from "formik";
import * as Yup from "yup";

type formdata = {
  email: string;
  password: string;
}

async function login( url: string, data: formdata ) {
  try {
    const req = await fetch( url, 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email: 'otiedwin', password: 'ototi'}) // Converting the data object to a JSON string
      }
    )
    
    let res = req.json()
    console.log(res)

    // localStorage.setItem('access_token', res.data.token);
    if(await res){
      redirect('/dashboard')
    }
  } catch (error) {
    console.log(error)
  }
  finally{
    // change window according to login priviledge
  }

}


export default function Home() {
  // const isLoggedIn = useSelector( (state: RootState) => state.logged.value )
  // const dispatch = useDispatch()

  const schema = Yup.object({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
  
    password: Yup.string()
      .min(3, "Password must be 3 characters at minimum")
      .required("Password is required"),
  })
  
  return(
    <main className="w-full flex overflow-hidden">
      <div className="illustration bg-pes-gradient w-1/2 h-screen relative flex">
        <Image src={ '/pes.svg' } alt='pes hero image' width={ 130 } height={ 130 } className='z-10 mx-auto my-auto'/>

        <div className="pattern flex flex-col justify-between absolute -rotate-65 h-full -bottom-64 right-12">
          <div className='bg-white opacity-5 rounded-full h-96 w-192 m-8'></div>
          <div className='bg-white opacity-5 rounded-full h-96 w-192 m-8'></div>
          <div className='bg-white opacity-5 rounded-full h-96 w-144 m-8'></div>
        </div>

        <Image src={ '/pes-alt.svg' } alt='pes hero image' width={ 350 } height={ 350 } className='mx-auto my-auto absolute top-0 right-0'/>
      </div>

      <Formik initialValues={ { email: "", password: ""} } validationSchema={ schema } onSubmit={ (values) => login('/api/login', values) }>
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
