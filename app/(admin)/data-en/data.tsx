import { ArrowRight2 } from "iconsax-react"
import { useState } from "react"

interface DataEntry {
    name: string;
    form: string;
}

interface DataProps {
    data: {
        title: string;
        section: DataEntry[];
    };
}

interface DataComponentProps extends DataProps {
    setCurrentForm: (form: string) => void;
}

export default function Data({ data, setCurrentForm }: DataComponentProps) {
    const [ expanded, setExpanded ] = useState(false)

    return(
        <div className="bg-gray-50 m-3 rounded-md">
            <div className="flex justify-between p-3 border-b"  onClick={ () => setExpanded( prev => !prev ) }>
                <h1 className="text-lg m-1 font-semibold">{ data.title }</h1>
                <ArrowRight2 className={` ${ expanded ? 'rotate-90': '' } my-auto`}/>
            </div>
 
            <div style={{ display: expanded? '' : 'none' }} className="flex flex-col m-4">
                {
                    data.section.map((i: DataEntry, key: number) => {
                        return(
                            <div className="flex justify-between" key={key}>
                                <p className="my-auto">{ i.name }</p>
                                <button onClick={ () => setCurrentForm(i.form) } className="text-pes border border-pes rounded-md px-6 py-2 my-1">
                                    Start data entry
                                </button>
                            </div>
                        )
                    })
                }
            </div>            
        </div>

    )
}