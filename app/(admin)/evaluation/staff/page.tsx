'use client'
import { useEffect, useRef, useState } from "react"
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



type factored_type = {
    observed_time: number
    estimated_time: number
    normal_rating: number
    performance_rating: number
    contingency_allowance: number
}

export default function Home() {
    const [newExtra, setNewExtra] = useState< JSX.Element[] >([])
    const factored = {
        normal_rating: 0,
        performance_rating: 0,
        contingency_allowance: 0
    }
    const [observed_time, setObserved_time] = useState([0, 0, 0]) // sumation,
    const [estimated_time, setEstimated_time] = useState([0, 0, 0]) // summation,

    function handleTaskAdd(event: { preventDefault: () => void }) {
        event.preventDefault()
        let tempTask =
                <div className="flex flex-col">
                    <h1 className="font-bold text-lg my-2">{`Task ${ newExtra.length + 2 }`}</h1>

                    <div className="flex flex-wrap">
                        <label htmlFor="" className="flex flex-col w-72">
                            Task name
                            <input name="task" required className="border m-1 px-16 py-2 rounded" type="text" />
                        </label>

                        <label htmlFor="" className="flex flex-col w-72">
                            Observed time
                            <input name="" required className="border me-6 my-2 px-16 py-2 rounded" type="number" />
                        </label>

                        <label htmlFor="" className="flex flex-col w-72">
                            {`Observed rating (0 - 200)`}
                            <input name="" required className="border me-6 my-2 px-16 py-2 rounded" type="number" />
                        </label>

                        <label htmlFor="" className="flex flex-col w-72">
                            Relaxation time
                            <input name="" required className="border me-6 my-2 px-16 py-2 rounded" type="number" />
                        </label>

                        <label htmlFor="" className="flex flex-col w-72">
                            Contingency allowance
                            <input name="" required className="border me-6 my-2 px-16 py-2 rounded" type="number" />
                        </label>  

                        <label htmlFor="" className="flex flex-col w-72">
                            Number of workers
                            <input name="" required className="border me-6 my-2 px-16 py-2 rounded" type="number" />
                        </label>
        
                        <label htmlFor="" className="flex flex-col w-72">
                            Annual frequency
                            <input name="" required className="border me-6 my-2 px-16 py-2 rounded" type="number" />
                        </label>                      
                    </div>
                </div> 

        setNewExtra( prev => [ ...prev, tempTask ] )
        // setObserved_time( prev => [ ...prev, prev[prev.length] = 0 ] )
        // setEstimated_time( prev => {
        //     console.log(prev.length)
        //     return [ ...prev, prev[prev.length] = 0 ]
        // })
        console.log('times edited'  , observed_time, estimated_time);
    }

    return(
        <form className="flex flex-col m-4" onSubmit={() => {}}>
            <div className="flex">
                <a className="me-3 hover:underline hover:text-pes" href="staff/factored">Factored Estimating</a>
                <a className="me-3 hover:underline hover:text-pes" href="staff/sampling">Work Sampling</a>
            </div>

            <div className="p-2">
                <h1 className="font-bold text-3xl my-6">Plain estimating</h1>

                <div>
                    <div className="flex flex-col">
                        <h1 className="font-bold text-lg my-2">Task 1</h1>

                        <div className="flex flex-wrap">
                            <label htmlFor="" className="flex flex-col w-72">
                                Observed time
                                <input name="" required className="border me-6 my-2 px-16 py-2 rounded" type="number" />
                            </label>

                            <label htmlFor="" className="flex flex-col w-72">
                                {`Observed rating (0 - 200)`}
                                <input name="" required className="border me-6 my-2 px-16 py-2 rounded" type="number" />
                            </label>

                            <label htmlFor="" className="flex flex-col w-72">
                                Relaxation time
                                <input name="" required className="border me-6 my-2 px-16 py-2 rounded" type="number" />
                            </label>

                            <label htmlFor="" className="flex flex-col w-72">
                                Contingency allowance
                                <input name="" required className="border me-6 my-2 px-16 py-2 rounded" type="number" />
                            </label>  

                            <label htmlFor="" className="flex flex-col w-72">
                                Number of workers
                                <input name="" required className="border me-6 my-2 px-16 py-2 rounded" type="number" />
                            </label>
            
                            <label htmlFor="" className="flex flex-col w-72">
                                Annual frequency
                                <input name="" required className="border me-6 my-2 px-16 py-2 rounded" type="number" />
                            </label>                      
                        </div>
                    </div> 

                    {
                        (newExtra.length == 0) ?
                            <></>
                        :
                        newExtra?.map((index: JSX.Element, key) => {
                            return(
                                <div key={key}>
                                    { index }
                                </div>
                            )
                        })
                    }                    
                </div>



                <hr className="border-dashed border-2 my-6"/>

                <label htmlFor="" className="flex flex-col w-72">
                    Available hours
                    <input name="" required className="border me-6 my-2 px-16 py-2 rounded" type="number" />
                </label>   

                <label htmlFor="" className="flex flex-col w-72">
                    Use factor
                    <input name="" required className="border me-6 my-2 px-16 py-2 rounded" type="number" />
                </label>                 
            </div>

            <div className="flex flex-wrap my-4">
                <button className="bg-pes w-fit my-3 me-2 rounded text-white px-16 py-3" type="submit">Evaluate number of staff</button>
                <a href="downloadables/relax.doc" className="bg-pes w-fit my-3 me-2 rounded text-white px-16 py-3" >Relaxation time guide</a>
                <a href="/downloadables/plain-estimate.docx" className="bg-pes w-fit my-3 me-2 rounded text-white px-16 py-3">Print task form</a>
                <button className="bg-pes w-fit my-3 me-2 rounded text-white px-16 py-3" onClick={ handleTaskAdd } >Add new task +</button>
            </div>
        </form>
    )
}