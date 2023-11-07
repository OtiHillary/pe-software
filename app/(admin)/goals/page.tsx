import Image from "next/image"

const data = true;

export default function Home(){
    return(
        <div className="m-6">
            <div className="goals flex justify-between">
                <h1 className="text-3xl font-bold">Goals</h1>

                <div className="actions flex justify-between">
                    <div className="grid rounded-md border mx-3 my-auto p-1">
                        <Image width={ 25 } height={ 25 } src={ `/grid.svg` } alt={`grid`}/>
                    </div>
                    <div className="border rounded-md list mx-3 my-auto p-1">
                        <Image width={ 25 } height={ 25 } src={ `/list.svg` } alt={`list`}/>
                    </div>
                    <div className="bg-pes py-3 px-8 rounded-md text-white new ms-12">
                        Set new Goal
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center">
            {
                data ? 
                <p className="mt-48 mx-auto text-sm text-gray-500 font-light">
                    Currently, No Goals Created. Click 'Set New Goals' to Begin Your Journey of Achievement and Growth.
                </p> 
                : 
                <>
                
                </>
            }
            </div>


        
        </div>
    )
}