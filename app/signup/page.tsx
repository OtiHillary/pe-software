'use client'
import { ArrowRight, Category  } from 'iconsax-react';
import { FormEvent, useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';



let slider_index = 0

const first = (
  <>
    <h1 className='text-3xl text-semibold my-2 w-10/12'>
      {`Your Company's journey`} <br/> {`towards`} <span className='text-yellow-400'>Enhanced <br/> Performance</span> {`starts today`}
    </h1>
    <p className='text-sm'>
      {`PES is your company's tool for optimizing team performance. Discover a suite of tools tailored to enhance collaboration and achieve organizational goals`}
    </p>
  </>)

const second = (
  <>
    <h1 className='text-3xl text-semibold my-2 w-10/12'>
      Customize You Metrics
    </h1>
    <p className='text-sm'>
      {`Craft performance metrics that align with your company's objectives. Our intuitive interface allows you to define goals that resonate with your team's roles and aspirations.`}
    </p>
  </>
)

const third = <>

</>


const PLAN_CODES = {
  basic: 'PLN_w4hf2tk7k3mu66a',
  standard: 'PLN_pl6nmfsedqvm0oa',
  premium: 'PLN_bquiv8u3t2otwuh',
};

type PlanType = keyof typeof PLAN_CODES;

// Utility for safely resolving plan codes
const resolvePlanCode = (plan: string) => PLAN_CODES[plan as PlanType] ?? PLAN_CODES.basic;

export default function Home() {
  const slider_arr = [ true, false, false ]
  const content_arr = [ first, second, third ]
  const [ slide, setSlide ] = useState(slider_arr)
  const router = useRouter()
  const searchParams = useSearchParams();
  const productCategory = searchParams.get('product_category') as string;
  const planType = searchParams.get('product_plan') as string;
  // --- React state ---
  const [message, setMessage] = useState({
    visibility: 'invisible',
    text: '',
    color: '',
  });

  const [formData, setFormData] = useState(() => ({
    name: '',
    org: '',
    email: '',
    password: '',
    category: productCategory ?? '',
    plan: planType ?? 'basic',
    planCode: resolvePlanCode(planType),
    logo: ''
  }));
  const allFieldsFilled =
    formData.name.trim() &&
    formData.org.trim() &&
    formData.email.trim() &&
    formData.password.trim() &&
    formData.logo.trim() &&         // include logo
    (document.getElementById("c-password") as HTMLInputElement)?.value.trim() &&
    (document.getElementById("agree") as HTMLInputElement)?.checked;



  // planCodes
  async function handleImageUpload(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "pes-unsigned"); // change this
    data.append("folder", "pes/logo");

    try {
      const cloudRes = await fetch(
        "https://api.cloudinary.com/v1_1/djqaqhcxk/image/upload",
        {
          method: "POST",
          body: data
        }
      );
      const uploaded = await cloudRes.json();

      setFormData({
        ...formData,
        logo: uploaded.secure_url
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Redirect if query params missing
  useEffect(() => {
    if (!productCategory || !planType) {
      router.replace("/forbidden");
    }
  }, [productCategory, planType, router]);


  const switchSlide = () => {
    slider_index++;
    for (let i = 0; i < slider_arr.length; i++) {
      slider_arr[i] = i === slider_index % 3;
    }
    setSlide([...slider_arr]);
  };

  function handleChange(event: { target: { name: any; value: any; }; }){
    setFormData({
      ...formData,
      [event?.target.name]: event?.target.value
    })
  }
  
  async function signup( event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage({  visibility: 'visible', text: 'Signing in, Please wait...', color: 'green' })
  
    try {
      const req = await fetch( '/api/signup', 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      )
      let res = await req.json()
  
      if(res.status == 200){
        console.log('token before storage:', res.token )
        localStorage.setItem('access_token', res.token );
        console.log(res.name)
        router.push('/dashboard')
      }
      if (res.status == 500) {
        setMessage({  visibility: 'visible', text: 'signup failed, check details', color: 'red' })
      }
    } catch (error) {
      console.log(error)
      let errorMsg = 'An unexpected error occurred';
      if (error instanceof Error) {
        errorMsg = error.message;
      }
      setMessage({  visibility: 'visible', text: errorMsg , color: 'red' })

    }
  }

  return(
    <main className="w-full flex overflow-hidden relative">
      <div style={{ borderColor: message.color, borderInlineWidth: '6px', borderBlockWidth: '1px' }} className={ `z-10 bg-white absolute p-6 px-12 shadow-md rounded-md text-gray-600 font-semibold ${message.visibility} top-3 left-1/2 -translate-x-1/2` }>
        {message.text}
      </div>

      <div className="scroller w-3/12 absolute bottom-4 left-3/12 z-10 flex justify-between">
        <div className="page my-auto flex">
          {          
            slide.map( (i, key) => <div key={ key } className= {`ircle h-2 ${ i ? 'w-6 bg-pes' : 'w-2 bg-gray-200'} rounded-full mx-1_2 transition-all`}></div> )
          }
        </div>

        <div className="slider bg-pes p-3 me-4 rounded-full text-white" onClick={ () => switchSlide() }>
          <ArrowRight />
        </div>
      </div>

      <div className="illustration2 bg-white flex flex-col justify-center w-1/2 py-6 px-28 h-screen relative ">
        <div className = 'my-2 text-pes text-3xl font-extrabold flex'>
          <Image src={'/Vector.svg'} alt='PES' width={55} height={55} />
          <p className = 'ms-2 my-auto'>PES</p>
        </div>
      
        <div className="carousel w-full h-48 text-left relative">
          {
            slide.map((i, key) => (
              <div key={key} className={`${ i ? "opacity-100" : "opacity-0" } transition-opacity duration-500 absolute top-0 left-0`}>
                { content_arr[key] }
              </div>
            ))
          }
        </div>

        <div className='relative h-80 w-80 flex overflow-hidden mx-auto'>
          {
            slide.map((i, key) => (
              <Image
                key={key}
                src={`/image${key + 1}.png`}
                width={ 320 } height={ 320 }
                alt={`slide${key + 1}`}
                className={`carousel-image absolute top-0 left-0 object-cover ${ i ? "opacity-100" : "opacity-0" } transition-opacity duration-500`}
              />
            ))
          }
        </div>
      </div>

      <form onSubmit={ signup } className="form w-1/2 h-screen flex flex-col p-28 justify-center">
        <p className='text-3xl text-extrabold'>Create your Account</p>
        <p className='text-sm mb-8'>{`Enter your details and let's get started`}</p>

        <div className="input flex flex-col justify-center mb-4">
          <label htmlFor="name" className='mb-1 font-bold text-sm'>Admin Name:</label>
          <input onChange={handleChange} value={formData.name} className='bg-transparent border border-gray-200 text-gray-300 placeholder:text-gray-300 text-sm focus:outline-pes ps-4 py-3 rounded-md' type="text" name="name" id="name" placeholder='Enter your Institution or company name' required/>
        </div>

        <div className="input flex flex-col justify-center mb-4">
          <label htmlFor="org" className='mb-1 font-bold text-sm'>Organization Name:</label>
          <input onChange={handleChange} value={formData.org} className='bg-transparent border border-gray-200 text-gray-300 placeholder:text-gray-300 text-sm focus:outline-pes ps-4 py-3 rounded-md' type="text" name="org" id="org" placeholder='Enter your Institution or company name' required/>
        </div>

        <div className="input flex flex-col justify-center mb-4">
          <label htmlFor="email" className='mb-1 font-bold text-sm'>Email Address:</label>
          <input onChange={handleChange} value={formData.email} className='bg-transparent border border-gray-200 text-gray-300 placeholder:text-gray-300 text-sm focus:outline-pes ps-4 py-3 rounded-md' type="email" name="email" id="email" placeholder='Enter your Institution or company email' required/>
        </div>

        <div className="input flex flex-col justify-center mb-4">
          <label htmlFor="password" className='mb-1 font-bold text-sm'>Password:</label>
          <input onChange={handleChange} value={formData.password} className='bg-transparent border border-gray-200 text-gray-300 placeholder:text-gray-300 text-sm focus:outline-pes ps-4 py-3 rounded-md' type="password" name="password" id="password" placeholder='Enter your Password' required/>
        </div>

        <div className="input flex flex-col justify-center mb-4">
          <label htmlFor="c-password" className='mb-1 font-bold text-sm'>Confirm Password:</label>
          <input className='bg-transparent border border-gray-200 text-gray-300 placeholder:text-gray-300 text-sm focus:outline-pes ps-4 py-3 rounded-md' type="password" name="c-password" id="c-password" placeholder='Confirm your Password' required/>
        </div>

        <div className="flex flex-row justify-start mb-8">
          <div className='flex'>
            <input onChange={()=>{}} type="checkbox" name="agree" id="agree"/>
            <label htmlFor='agree' className='mx-4 text-sm'>I accept all <span className='font-bold'>terms and conditions</span></label>
          </div>
        </div>

        <div className="input flex flex-col justify-center mb-4">
          <label htmlFor="logo" className='mb-1 font-bold text-sm'>Institution Logo:</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleImageUpload}
            className="text-sm text-gray-400"
          />

          {formData.logo && (
            <Image 
              src={formData.logo} 
              alt="Logo preview" 
              width={80} 
              height={80} 
              className="mt-3 rounded-md border border-gray-300"
            />
          )}
        </div>

        <input 
          type='submit' 
          value={'Sign up'} 
          // disabled={!allFieldsFilled}
          className={`btn px-4 py-3 rounded-lg mb-2 text-white
            ${!allFieldsFilled ? "bg-pes hover:bg-[#141444]" : "bg-gray-400 cursor-not-allowed"}
          `}
        />

        <p className='text-center'>{`Have an Account?`} <Link className='text-pes' href={'/login'}>Sign In</Link> </p>
      </form>
    </main>     
  )
}
