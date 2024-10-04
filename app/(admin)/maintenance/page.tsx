export default function Home(){
    return (
        <div className="p-8">
            <h1 className="text-2xl font-semibold mb-4">Tools & Facilities</h1>
            <div className="flex items-center mb-4">
                <div className="relative flex-grow">
                    <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input 
                        type="text" 
                        placeholder="Search any tool or facility" 
                        className="pl-10 pr-4 py-2 border rounded w-full"
                    />
                </div>
                <button className="ml-4 px-4 py-2 bg-white border border-pes text-pes rounded">
                    + Add Tools or Facilities
                </button>
                <a href="/maintenance/inventory" className="ml-4 px-4 py-2 bg-blue-900 text-white rounded">
                    View Inventory Sheet
                </a>
            </div>
            <div className="space-y-2">
                <a href={ `maintenance/Electric Motor` } className="flex justify-between items-center p-4 bg-gray-100 rounded">
                    <span>Electric Motor</span>
                </a>
                <a href={ `` } className="flex justify-between items-center p-4 bg-gray-100 rounded">
                    <span>Diesel Engine</span>
                </a>
                <a href={ `` } className="flex justify-between items-center p-4 bg-gray-100 rounded">
                    <span>Electric Motor</span>
                </a>
                <a href={ `` } className="flex justify-between items-center p-4 bg-gray-100 rounded">
                    <span>Diesel Engine</span>
                </a>
            </div>
        </div>
    )
}