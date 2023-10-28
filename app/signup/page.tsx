import { People, Award, Timer  } from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';

async function getUser(url: string) {
  try {
    const jsonData = await fetch(url)
    let data = jsonData.json()
    return data

  } catch (error) {
    console.log(error)
  }
  finally{
    // change window according to login priviledge
  }

}

export default async function Home() {

  return(
    <main className="w-full flex overflow-hidden">
      <div className="illustration w-1/2 h-screen relative flex">
         <div className="carousel bg-pes w-full h-full"></div>
        <Image src={ '/pes.svg' } alt='pes hero image' width={ 130 } height={ 130 } className='z-10 mx-auto my-auto'/>
      </div>

      <div className="form w-1/2 h-screen flex flex-col p-28 justify-center">
        <p className='text-4xl text-semibold mb-8'>Sign In</p>

        <div className="input flex flex-col justify-center mb-4">
          <label htmlFor="email" className='mb-1'>Email Address:</label>
          <input className='bg-transparent border border-gray-200 text-gray-200 focus:outline-pes ps-4 py-2 rounded-lg' type="email" name="email" id="" required/>
        </div>

        <div className="input flex flex-col justify-center mb-4">
          <label htmlFor="password" className='mb-1'>Password:</label>
          <input className='bg-transparent border border-gray-200 text-gray-200 focus:outline-pes ps-4 py-2 rounded-lg' type="password" name="password" id="password" required/>
        </div>

        <div className="flex flex-row justify-between mb-8">
          <div className='flex'>
            <input type="checkbox" name="remember" id="remember"/>
            <label htmlFor='remember' className='mx-4'>Remember me</label>
          </div>

          <Link className='text-pes' href={'/'}>Forgot Password ?</Link>
        </div>

        <div className="btn bg-pes text-white px-4 py-3 flex justify-center rounded-lg mb-2">Sign In</div>

        <p className='text-center'>{`Don't have an Account?`} <Link className='text-pes' href={'/'}>Sign Up</Link> </p>
      </div>
    </main>     
  )
}
