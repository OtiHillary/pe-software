export default function Home() {
    return (
        <form className="flex flex-col m-4">
            <h1 className="font-bold text-3xl my-6">Utility index</h1>

            <div className="flex m-4">
                <label htmlFor="" className="flex flex-col w-72">
                    Useful man-hours
                    <input name="" required className="border me-6 mb-3 px-16 py-2 rounded" type="number" />
                </label>

                <label htmlFor="" className="flex flex-col w-72">
                    Total establishment manhours
                    <input name="" required className="border me-6 mb-3 px-16 py-2 rounded" type="number" />
                </label>                
            </div>

            <div className="flex mx-4">
                <button className="bg-pes w-fit my-3 me-2 rounded text-white px-32 py-3" type="submit">Evaluate</button>
            </div>

        </form>
    )
}