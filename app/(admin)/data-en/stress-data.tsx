  // Form 9 Component - Teaching Performance Assessment
  const Form9 = () => {
    const handleCriterionUpdate = (criterionId: string, value: number) => {
      const criterion = form9Criteria.find(c => c.id === criterionId);
      if (criterion) {
        setForm9Data(prev => ({
          ...prev,
          [criterionId]: Math.min(Math.max(value, 0), criterion.maxScore)
        }));
      }
    };

    const calculateTotal = () => {
      return form9Criteria.reduce((total, criterion) => {
        return total + (form9Data[criterion.id] || 0);
      }, 0);
    };

    const saveForm9 = () => {
      alert('Form 9 - Teaching Performance Assessment saved successfully!');
    };

    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Form 9: Teaching Performance Assessment</h2>
          <p className="text-gray-600 mb-6">Assess teaching performance across multiple criteria</p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-purple-100">
                  <th className="border border-gray-300 p-3 text-left">S/No</th>
                  <th className="border border-gray-300 p-3 text-left">Assessed Criterion</th>
                  <th className="border border-gray-300 p-3 text-center">Max Possible Score</th>
                  <th className="border border-gray-300 p-3 text-center">Actual Score</th>
                </tr>
              </thead>
              <tbody>
                {form9Criteria.map((criterion, index) => (
                  <tr key={criterion.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3 text-center font-medium">{index + 1}</td>
                    <td className="border border-gray-300 p-3">{criterion.name}</td>
                    <td className="border border-gray-300 p-3 text-center font-semibold">{criterion.maxScore}</td>
                    <td className="border border-gray-300 p-3 text-center">
                      <input
                        type="number"
                        min="0"
                        max={criterion.maxScore}
                        step="0.1"
                        value={form9Data[criterion.id] || 0}
                        onChange={(e) => handleCriterionUpdate(criterion.id, parseFloat(e.target.value) || 0)}
                        className="w-20 px-2 py-1 text-center border rounded"
                      />
                    </td>
                  </tr>
                ))}
                <tr className="bg-purple-50 font-bold">
                  <td className="border border-gray-300 p-3 text-center">10</td>
                  <td className="border border-gray-300 p-3">Aggregate (Total) Score</td>
                  <td className="border border-gray-300 p-3 text-center">100</td>
                  <td className="border border-gray-300 p-3 text-center text-purple-600">
                    {calculateTotal().toFixed(1)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              onClick={saveForm9}
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Assessment</span>
            </button>
            <button
              onClick={() => setCurrentForm('dashboard')}
              className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Form 10 Component - External/Peer Examination Assessment
  const Form10 = () => {
    const handleExaminerScoreUpdate = (criterionId: string, value: number) => {
      const criterion = form10ExaminerCriteria.find(c => c.id === criterionId);
      if (criterion) {
        setForm10Data(prev => ({
          ...prev,
          examinerScores: {
            ...prev.examinerScores,
            [criterionId]: Math.min(Math.max(value, 0), criterion.maxScore)
          }
        }));
      }
    };

    const handleStudentEvaluationUpdate = (value: number) => {
      setForm10Data(prev => ({
        ...prev,
        studentEvaluation: Math.min(Math.max(value, 0), 40)
      }));
    };

    const calculateExaminerTotal = () => {
      return form10ExaminerCriteria.reduce((total, criterion) => {
        return total + (form10Data.examinerScores[criterion.id] || 0);
      }, 0);
    };

    const calculateGrandTotal = () => {
      return calculateExaminerTotal() + form10Data.studentEvaluation;
    };

    const saveForm10 = () => {
      alert('Form 10 - External/Peer Examination Assessment saved successfully!');
    };

    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Form 10: External/Peer Examination Assessment</h2>
          <p className="text-gray-600 mb-6">Assessment by External and/or Peer Examiners</p>
          
          {/* Examiner Assessment Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-indigo-600">Examiner Assessment</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-indigo-100">
                    <th className="border border-gray-300 p-3 text-left">Quality Attributes</th>
                    <th className="border border-gray-300 p-3 text-center">Max Possible Score</th>
                    <th className="border border-gray-300 p-3 text-center">Actual Score</th>
                  </tr>
                </thead>
                <tbody>
                  {form10ExaminerCriteria.map((criterion) => (
                    <tr key={criterion.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3">{criterion.name}</td>
                      <td className="border border-gray-300 p-3 text-center font-semibold">{criterion.maxScore}</td>
                      <td className="border border-gray-300 p-3 text-center">
                        <input
                          type="number"
                          min="0"
                          max={criterion.maxScore}
                          step="0.1"
                          value={form10Data.examinerScores[criterion.id] || 0}
                          onChange={(e) => handleExaminerScoreUpdate(criterion.id, parseFloat(e.target.value) || 0)}
                          className="w-20 px-2 py-1 text-center border rounded"
                        />
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-indigo-50 font-bold">
                    <td className="border border-gray-300 p-3">Examiner Subtotal</td>
                    <td className="border border-gray-300 p-3 text-center">60</td>
                    <td className="border border-gray-300 p-3 text-center text-indigo-600">
                      {calculateExaminerTotal().toFixed(1)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Student Evaluation Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-indigo-600">Student Evaluation</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Student Evaluation Score
                  </label>
                  <p className="text-xs text-gray-600">
                    Implementation of lecture plan, CAP, keeping of lecture schedule, use of notes, understanding of subject, etc.
                  </p>
                </div>
                <div className="text-center">
                  <span className="text-sm font-semibold">Max: 40</span>
                </div>
                <div>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    step="0.1"
                    value={form10Data.studentEvaluation}
                    onChange={(e) => handleStudentEvaluationUpdate(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-center border rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Total Section */}
          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Grand Total</span>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-semibold">Max: 100</span>
                <span className="text-2xl font-bold text-indigo-600">
                  {calculateGrandTotal().toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              onClick={saveForm10}
              className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Assessment</span>
            </button>
            <button
              onClick={() => setCurrentForm('dashboard')}
              className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Form 11 Component - Research Quality Assessment
  const Form11 = () => {
    const handleResearchCriterionUpdate = (criterionId: string, value: number) => {
      const criterion = form11ResearchCriteria.find(c => c.id === criterionId);
      if (criterion) {
        setForm11Data(prev => ({
          ...prev,
          [criterionId]: Math.min(Math.max(value, 0), criterion.maxScore)
        }));
      }
    };

    const calculateResearchTotal = () => {
      return form11ResearchCriteria.reduce((total, criterion) => {
        return total + (form11Data[criterion.id] || 0);
      }, 0);
    };

    const saveForm11 = () => {
      alert('Form 11 - Research Quality Assessment saved successfully!');
    };

    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Form 11: Research Quality Assessment</h2>
          <p className="text-gray-600 mb-6">Assessment by External and/or Peer Assessors</p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-pink-100">
                  <th className="border border-gray-300 p-3 text-left">Quality Attributes of Research</th>
                  <th className="border border-gray-300 p-3 text-center">Max Possible Score</th>
                  <th className="border border-gray-300 p-3 text-center">Actual Score</th>
                </tr>
              </thead>
              <tbody>
                {form11ResearchCriteria.map((criterion) => (
                  <tr key={criterion.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">{criterion.name}</td>
                    <td className="border border-gray-300 p-3 text-center font-semibold">{criterion.maxScore}</td>
                    <td className="border border-gray-300 p-3 text-center">
                      <input
                        type="number"
                        min="0"
                        max={criterion.maxScore}
                        step="0.1"
                        value={form11Data[criterion.id] || 0}
                        onChange={(e) => handleResearchCriterionUpdate(criterion.id, parseFloat(e.target.value) || 0)}
                        className="w-20 px-2 py-1 text-center border rounded"
                      />
                    </td>
                  </tr>
                ))}
                <tr className="bg-pink-50 font-bold">
                  <td className="border border-gray-300 p-3">Total</td>
                  <td className="border border-gray-300 p-3 text-center">100</td>
                  <td className="border border-gray-300 p-3 text-center text-pink-600">
                    {calculateResearchTotal().toFixed(1)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* HOD/Unit Appraisal Section */}
          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 text-pink-600">HOD/Unit Appraisal Section</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Appraisal Score</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Enter appraisal score"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">HOD/Unit Max Score</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Enter HOD max score"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">HOD/Unit Justification</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Provide justification for the score..."
                />
              </div>

              <div className="bg-blue-50 p-3 rounded text-sm">
                <h4 className="font-semibold mb-2">Scoring Rules:</h4>
                <ul className="space-y-1 text-xs text-gray-700">
                  <li>• If Appraisal Score is within ±5% of HOD Score: Accept and record average</li>
                  <li>• If Appraisal Score is below -5% of HOD Score: Accept HOD Score only, flag for audit</li>
                  <li>• If Appraisal Score is above +5% of HOD Score: Accept average, no flag</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              onClick={saveForm11}
              className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Assessment</span>
            </button>
            <button
              onClick={() => setCurrentForm('dashboard')}
              className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  };