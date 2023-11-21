import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store'

export default function Newgoal(){
    const isVisible = useSelector( (state: RootState) => state.goal.new )

    return (
        <div className={`notification ${ isVisible? 'visible': 'invisible' } rounded-sm shadow-lg p-12 z-20 flex flex-col w-1 h-1/2 bg-white absolute top-1/2 -translate-y-1/2`}>

        </div>
    )
}