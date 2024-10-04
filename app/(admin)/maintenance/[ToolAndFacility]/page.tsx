export default function Home({ params }) {
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white shadow-md rounded-lg w-3/4">
                <div className="flex justify-between items-center p-4 border-b">
                    <div className="flex items-center"> 
                        <i className="fas fa-arrow-left text-gray-600 mr-4"></i>
                        <h1 className="text-xl font-semibold">{params.ToolAndFacility}</h1>
                    </div>
                    <button className="flex items-center bg-blue-900 text-white px-4 py-2 rounded">
                        <i className="fas fa-cog mr-2"></i>
                        Conduct P.M Model
                    </button>
                </div>
                <div className="p-4">
                    {[
                        "Time taken to Failure",
                        "General Facility Register",
                        "Maintenance Schedule Card",
                        "Job Report Card",
                        "Machine Register Card",
                        "Weekly Maintenance Plan",
                        "Job Specification Sheet",
                        "Critical Examination Sheet",
                        "History Record Card"
                    ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b">
                            <span>{item}</span>
                            <div className="flex space-x-4">
                                <a href="#" className="text-blue-900">View form</a>
                                <button className="bg-white border border-blue-900 text-blue-900 px-4 py-1 rounded">Start Data Entry</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}