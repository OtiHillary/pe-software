import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store'

export default function Dimmer(){
    const isVisible = useSelector( (state: RootState) => state.logged.value )
return <div className = {`notification ${ isVisible? 'visible': 'invisible' } rounded-sm shadow-lg p-12 z-20 flex flex-col fixed w-screen h-screen bg-black opacity-10`}></div>
}