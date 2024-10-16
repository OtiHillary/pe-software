'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({ children, }: { children: React.ReactNode }){
   const pathname = usePathname()
   console.log(pathname)

    return (
        <main>
            {/* This is the evaluations page */}
            <ul className="w-full bg-white flex flex-start">
                <Link className={ `px-4 border-b-2 py-4 border-${ pathname == `/evaluation/dataFitting` ? 'pes' : '' }` } href={ `/evaluation/dataFitting`}>Data fitting</Link>
                <Link className={ `px-4 border-b-2 py-4 border-${ pathname.includes(`/evaluation/staff`) ? 'pes' : '' }` } href={ `/evaluation/staff`}>Staff determination</Link>
                {/* <Link className={ `px-4 border-b-2 py-4 border-${ pathname == `/evaluation/productivity` ? 'pes' : '' }` } href={ `/evaluation/productivity`}>Productivity index</Link>
                <Link className={ `px-4 border-b-2 py-4 border-${ pathname == `/evaluation/utility` ? 'pes' : '' }` } href={ `/evaluation/utility`}>Utilization index</Link>
                <Link className={ `px-4 border-b-2 py-4 border-${ pathname == `/evaluation/redundancy` ? 'pes' : '' }` } href={ `/evaluation/redundancy`}>Redundancy index</Link> */}
            </ul>
            {
                children
            }
        </main>
    )
}