import { CloseCircle } from 'iconsax-react'
import { useDispatch, useSelector } from 'react-redux';
import { notificationView } from '@/app/state/notification/notificationSlice';
import { RootState } from '@/app/state/store'

export default function Notification(){
    const isVisible = useSelector((state: RootState)=> state.notification.visible )
    console.log(isVisible)
    const dispatch = useDispatch()

    return (
        <>
            <div className={ ` ${ isVisible? 'visible': 'invisible' } logout rounded-sm shadow-lg bg-white w-96 h-108 p-2 pt-1 z-20 flex flex-col absolute top-24 right-8` }>
                <div className="flex justify-between m-2 mx-4 ">
                    <p>Notifications</p> 
                    <CloseCircle className='hover:text-red-400' onClick={ () => dispatch( notificationView() ) }/> 
                </div>

                <div className="content bg-slate-50 rounded-md h-1/2 p-3 mx-4 mb-4 flex flex-col text-sm">
                    <h1 className="mb-1 font-bold">The heading of the notification</h1>
                    <p>This is the actual content of the notification it ia meant to educate you on the state of affairs of the company</p>
                </div>

                <div className="content bg-slate-50 rounded-md h-1/2 p-3 mx-4 mb-4 flex flex-col text-sm">
                    <h1 className="mb-1 font-bold">The heading of the notification</h1>
                    <p>This is the actual content of the notification it ia meant to educate you on the state of affairs of the company</p>
                </div>
            </div>              
        </>
        
    )
}
        
