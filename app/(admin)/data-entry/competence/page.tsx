'use client';
import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  department: string;
  role: 'academic' | 'non-academic' | 'hod' | 'dean' | 'personnel';
  hasSubmitted: boolean;
}

interface CriteriaItem {
    name: string;
    rating: number;
    percentage: number;
}

export default function Form12() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [userOption, setUserOption] = useState<string | null>(null);
    const [form12Criteria, setForm12Criteria] = useState([
        { name: 'Hardwork (quantity)', rating: 1, percentage: 55 },
        { name: 'Quality of work', rating: 1, percentage: 10 },
        { name: 'Initiative', rating: 1, percentage: 60 },
        { name: 'Expertise', rating: 1, percentage: 30 },
        { name: 'Supervision', rating: 1, percentage: 40 },
        { name: 'Reporting', rating: 1, percentage: 20 },
        { name: 'Work Planning', rating: 1, percentage: 30 },
        { name: 'Creativity', rating: 1, percentage: 60 }
    ]);

    const update12Rating = (index: number, newRating: number) => {
    setForm12Criteria((prev: CriteriaItem[]) =>
      prev.map((item: CriteriaItem, i: number) =>
        i === index ? { ...item, rating: newRating } : item
      )
    );
  };

    const saveForm12 = () => {
      if (!userOption) {
        alert('Please select a user to save the assessment.');
        return;
      }
      try {
        fetch('/api/savePerformance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pesuser_name: userOption,
            payload: 'competence',
            competence: form12Criteria.reduce((sum, c) => sum + ((c.rating / 10) * c.percentage || 0), 0),
          }),
        })
          .then(response => {
            if (response.ok) {
              alert('Community Performance Assessment saved successfully!');
            }
          });
      } catch (error) {
        alert('An error occurred while saving the assessment.');
        console.error(error);
      }
    };

    useEffect(() => {
      const userToken = localStorage.getItem('access_token') || '{}';
      async function fetchUsers() {
        const response = await fetch('/api/getUsers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: userToken }),
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        }
      }

      fetchUsers();
    }, []);

    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Competence</h1>
          <p className="mb-4">This form is used to evaluate employee performance across various criteria.</p>
          
          <div className='p-1 mb-2'>
            <label htmlFor="user" className='flex'>
              <p className='my-auto'>Select User:</p>
              <select name="" id="user" className='m-2 p-2 rounded-md border' onChange={(e) => { setUserOption(e.target.value) }} value={userOption ?? ''}>
                <option value="">No user selected</option>

                {users?.map(user => (
                  <option key={user.id} value={user.name}>
                    {user.name}
                  </option>
                ))}
              </select>
            </label>           
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Criteria</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">
                    (Rating) Less Likely → Most Likely
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Rating( x/10 * y/1 )</th>
                  {/* <th className="text-center py-3 px-4 font-semibold text-gray-700">Percentage</th> */}
                </tr>
              </thead>
              <tbody>
                {
                  form12Criteria.map((criteria, criteriaIndex) => (
                    <tr key={criteria.name} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium text-gray-900">{criteria.name}</td>
                      <td className="py-4 px-4">
                        <div className="flex justify-center space-x-2">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                            <button
                              key={rating}
                              onClick={() => update12Rating(criteriaIndex, rating)}
                              className={`w-8 h-8 rounded-full border-2 font-semibold text-sm transition-all ${
                                criteria.rating === rating
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                              }`}
                            >
                              {rating}
                            </button>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center justify-center w-12 h-8 bg-blue-100 text-blue-800 rounded-full font-bold">
                          {(criteria.rating/10) * (criteria.percentage/1)}
                        </span>
                      </td>
                      {/* <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center justify-center w-16 h-8 bg-green-100 text-green-800 rounded-full font-bold text-sm">
                          {criteria.percentage.toFixed(1)}
                        </span>
                      </td> */}
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>

          <div>
              <button
                onClick={saveForm12}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
              >
                <Save className="w-5 h-5 mr-2" />
                Submit Evaluation
              </button>

              <a
              href="/data-entry"
              onClick={() => window.history.back()}
              className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
            >
              Back to Dashboard
            </a>
          </div>
        </div>
      </div>
    )
  }