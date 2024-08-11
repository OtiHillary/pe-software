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
    const [observed_time, setObserved_time] = useState([0, 0, 0]) 
    const [estimated_time, setEstimated_time] = useState([0, 0, 0])
    const [factoredData, setFactoredData] = useState(factored)
    const formRef = useRef(null);

    const handlePrint = async (event: { preventDefault: () => void }) => {
        event.preventDefault()
        const input = formRef.current;

        // Capture the form as canvas
        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL('image/png');

        // Create PDF document
        const pdf = new jsPDF('p', 'pt', 'a4');
        const imgWidth = 210 * 3.5; // Width of the PDF
        const pageHeight = 295 * 3.5; // Height of the PDF
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        // Add image to PDF
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add additional pages if necessary
        while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        }

        // Save the PDF
        pdf.save('form.pdf');
    }

    function handleFactored(event) {
        setFactoredData((prev) => {
            return { 
                ...prev, 
                [event.target.name]: event.target.value,  
            } 
        })
        console.log('the change isFinite', factored);
    }

    function handleObserved(event) {
        setObserved_time( prev => [ ...prev, [event.target.id] = event.target.value ] )
    }

    function handleEstimated(event) {
        setEstimated_time( prev => [ ...prev, [event.target.id] = event.target.value ] )
    }

    function handleTaskAdd(event: { preventDefault: () => void }) {
        event.preventDefault()
        let tempTask =
            <>
                <div className="flex flex-col">
                    <h2 className="font-bold text-xl my-2">{`Task ${ newExtra.length + 4 }`}</h2>

                    <div className="flex">
                        <label htmlFor="" className="flex flex-col w-72">
                            Task name
                            <input name="task" required className="border m-1 px-16 py-2 rounded" type="text" />
                        </label>

                        <label htmlFor="observed" className="flex flex-col w-72">
                            Observed time
                            <input id={`${ newExtra.length + 3 }`} onChange={ handleFactored } name="observed" required className="border m-1 px-16 py-2 rounded" type="number" />
                        </label>

                        <label htmlFor="estimated" className="flex flex-col w-72">
                            Estimated time
                            <input id={`${ newExtra.length + 3 }`} onChange={ handleFactored } name="estimated" required className="border m-1 px-16 py-2 rounded" type="number" />
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
            </>

        setNewExtra( prev => [ ...prev, tempTask ] )
        setObserved_time( prev => [ ...prev, prev[prev.length] = 0 ] )
        setEstimated_time( prev => {
            console.log(prev.length)
            return [ ...prev, prev[prev.length] = 0 ]
        })
        console.log('times edited'  , observed_time, estimated_time);
    }

    useEffect(() => {
    }, [newExtra])

    return(
        <form ref={ formRef } onSubmit={ handleFactored } className="flex flex-col m-4 p-4">
            <h1 className="font-bold text-3xl my-6">Factored estimating</h1>
            <a className="me-3 hover:underline hover:text-pes" href="/evaluation/staff">Back</a>
            <div className="flex flex-col">
                <h2 className="font-bold text-xl my-2">{`Task 1`}</h2>

                <div className="flex">
                    <label htmlFor="" className="flex flex-col w-72">
                        Task name
                        <input name="" required className="border me-6 mb-3 px-16 py-2 rounded" type="text" />
                    </label>

                    <label htmlFor="" className="flex flex-col w-72">
                        Observed time
                        <input name="observed_time" required className="border me-6 mb-3 px-16 py-2 rounded" type="number" />
                    </label>

                    <label htmlFor="" className="flex flex-col w-72">
                        Estimated time
                        <input name="" required className="border me-6 mb-3 px-16 py-2 rounded" type="number" />
                    </label>                            
                </div>
            </div>

            <div className="flex flex-col">
                <h2 className="font-bold text-xl my-2">{`Task 2`}</h2>

                <div className="flex">
                    <label htmlFor="" className="flex flex-col w-72">
                        Task name
                        <input name="" required className="border me-6 mb-3 px-16 py-2 rounded" type="text" />
                    </label>

                    <label htmlFor="" className="flex flex-col w-72">
                        Observed time
                        <input name="observed_time" required className="border me-6 mb-3 px-16 py-2 rounded" type="number" />
                    </label>

                    <label htmlFor="" className="flex flex-col w-72">
                        Estimated time
                        <input name="" required className="border me-6 mb-3 px-16 py-2 rounded" type="number" />
                    </label>                            
                </div>
            </div>

            <div className="flex flex-col">
                <h2 className="font-bold text-xl my-2">{`Task 3`}</h2>

                <div className="flex">
                    <label htmlFor="" className="flex flex-col w-72">
                        Task name
                        <input name="" required className="border m-1 px-16 py-2 rounded" type="text" />
                    </label>

                    <label htmlFor="" className="flex flex-col w-72">
                        Observed time
                        <input name="observed_time" required className="border m-1 px-16 py-2 rounded" type="number" />
                    </label>

                    <label htmlFor="" className="flex flex-col w-72">
                        Estimated time
                        <input name="" required className="border m-1 px-16 py-2 rounded" type="number" />
                    </label>                            
                </div>
            </div>

            { 
                (newExtra.length == 0) ?
                    <div className="flex w-1/2 p-6 my-6 border-4 rounded-2xl border-dashed justify-center">No new tasks</div>
                :
                newExtra?.map((index: JSX.Element, key) => {
                    return(
                        <div key={key}>
                            { index }
                        </div>
                    )
                })
            } 

            <div className="flex flex-col">
                <h2 className="font-bold text-xl my-2">{`Ratings`}</h2>

                <div className="flex">
                    <label htmlFor="" className="flex flex-col w-72">
                        {`Rating (0 - 100)`}
                        <input name="" required className="border m-1 px-16 py-2 rounded" type="number" />
                    </label>
                    
                    <label htmlFor="" className="flex flex-col w-72">
                        Performance rating
                        <input name="" required className="border m-1 px-16 py-2 rounded" type="number" />
                    </label>

                    <label htmlFor="" className="flex flex-col w-72">
                        Contingency allowance
                        <input name="" required className="border m-1 px-16 py-2 rounded" type="number" />
                    </label>                            
                </div>
            </div>

            <button className="bg-pes w-fit my-3 me-2 rounded text-white px-32 py-3" type="submit">Evaluate</button>
            <div className="flex m-4">
                <button className="bg-pes w-fit mx-4 rounded text-white px-16 py-3" onClick={ handleTaskAdd }>Add task</button>
                <button className="bg-pes w-fit mx-4 rounded text-white px-16 py-3" onClick={ handlePrint }>Print form for survey</button>                    
            </div>                
        </form>
    )
}