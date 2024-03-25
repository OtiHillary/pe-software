// import { useSelector } from 'react-redux';
// import { RootState } from '@/app/state/store'
import { Verify } from 'iconsax-react'


export default function Loading(){

    return (
        <div className={`notification rounded-sm shadow-lg p-12 z-30 flex flex-col w-4/12 bg-white`}>
            <div className='flex flex-col'>
               <Verify className='text-pes text-2xl mx-auto' size={100} variant='Bold'/>
               <h1 className='font-bold mx-auto'>please wait</h1>
            </div>
        </div>
    )
}