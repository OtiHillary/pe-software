'use client'
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/state/store'
import { taskAdd, taskChange } from "@/app/state/task/taskSlice";

export default function Home() {
    const init = { 
        id: 0, 
        task: 1, 
        observed: 0, 
        estimated: 0, 
    }
    const initOther = { 
        pearson: 0, 
        rating: 0, 
        allowance: 0, 
    }
    const dispatch = useDispatch()
    const tasks = useSelector( (state: RootState) => state.task )
    const [ inputs, setInputs ] = useState([ init ])
    const [ otherInputs, setOtherInputs ] = useState(initOther)


    // function handleTaskAdd(event: { preventDefault: () => void }) {
    //     event.preventDefault()
    //     setInputs([
    //         ...inputs, 
    //         { 
    //             id: inputs.length + 1, 
    //             task: inputs.length + 1, 
    //             observed: 0, 
    //             estimated: 0
    //         }
    //     ]);
    // }

    function handleInputChange(num: number, event: ChangeEvent<HTMLInputElement>){
        const newInputs = inputs.map( input => 
            input.id === num ? { ...input, [ event.target.name ]: parseFloat(event.target.value) || 0 } : input
        );
        setInputs(newInputs);
    }

    function handleOtherInputChange(event: ChangeEvent<HTMLInputElement>){
        setOtherInputs((prev) => {
            return { ...prev, [event.target.name]: event.target.value }
        });
    }

    async function evaluate(event: { preventDefault: () => void; }) {
        event.preventDefault()
        let temp = 0
        let c_factor = 0
        let c_estimate: number;
        let basic_time: number;
        let std_time: number;

        for (let i = 0; i < inputs.length; i++) {
            temp += ( inputs[i].observed - inputs[i].estimated )
        }

        c_factor = temp / inputs.length
        c_estimate = otherInputs.pearson * ( 1 + c_factor )
        basic_time = c_estimate * (otherInputs.rating / 100)
        std_time = basic_time + ( basic_time * ( otherInputs.allowance/100 ) )

        // Replace 'params.name' with the correct variable, e.g., a selected task name or an input value.
        // For demonstration, let's assume you want to update all tasks with the new man_hours:
        const tempTasks = tasks.map(input =>
            ({ ...input, man_hours: std_time })
        );

        console.log('new tasks are', tempTasks, 'old tasks are', tasks)

        // dispatch( taskChange(tempTasks) )
    }

    function handleTaskAdd(event: { preventDefault: () => void }) {
        event.preventDefault()
        dispatch( taskAdd({ name: `Task ${ tasks.length + 1 }`, man_hours: 0 }) )
    }

    return(
        <div className="relative">
            <div className="absolute">

            </div>

            <form onSubmit={ evaluate } className="flex flex-col m-4 p-4">
                <h1 className="font-bold text-3xl my-6">Factored estimating Task data entry</h1>
                <a className="me-3 hover:underline hover:text-pes" href="/evaluation/staff/factored">Back</a>

                { 
                    tasks?.map((index, key) => {
                        return(
                            <div key={key} className="flex flex-col">
                                <h2 className="font-bold text-xl my-2">{`${index.name}` || `task`}</h2>
                
                                <div className="flex flex-wrap">
                                    <label htmlFor="" className="flex flex-col w-72">
                                        Task name
                                        <input id={ `${index.name}` } value={ `${index.name}` } disabled name="task" required className="border m-1 px-16 py-2 rounded" type="text" />
                                    </label>
                
                                    <label htmlFor="man_hours" className="flex flex-col w-72">
                                        Total Man Hours
                                        <input id={ `${index.man_hours}` } value={ `${index.man_hours}` }  disabled name="man_hours" required className="border m-1 px-16 py-2 rounded" type="number" />
                                    </label>

                                    <label htmlFor="man_hours" className="flex flex-col w-72">
                                        Number of workers
                                        <input id={ `staff` }  name="no_of_wkrs" required className="border m-1 px-16 py-2 rounded" type="number" />
                                    </label>

                                    <label htmlFor="man_hours" className="flex flex-col w-72">
                                        Annual frequency
                                        <input id={ `staff` }  name="frequency" required className="border m-1 px-16 py-2 rounded" type="number" />
                                    </label>
                    
                                    <a href={ `/evaluation/staff/factored/${ index.name.split(' ')[1] }` } className="bg-pes mx-4 mt-auto flex flex-col justify-center align-middle text-center text-white px-8 py-3 rounded">Edit</a>                    
                                </div>
                            </div>
            
                        )
                    })
                } 
                
                <button className="bg-pes w-fit my-3 me-2 rounded text-white px-16 py-3" type="submit">Evaluate</button>
                <button className="bg-pes w-fit me-4 rounded text-white px-16 py-3" onClick={ handleTaskAdd }>Add task</button>
            </form>
        </div>

    )
}