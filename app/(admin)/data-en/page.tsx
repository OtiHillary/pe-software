'use client';
import React, { useState, useEffect } from 'react';
import { ChevronRight, Save, Eye, Users, Settings, BarChart3, FileText, CheckCircle } from 'lucide-react';
import Data from './data';

// Types
interface StressCategory {
  id: string;
  name: string;
  items: string[];
  maxValue?: number;
}

interface Form5Data {
  [categoryId: string]: {
    [item: string]: number;
  };
}

interface Form6Data {
  [themeId: string]: {
    [categoryId: string]: number;
  };
}

interface Form7Data {
  [categoryId: string]: number;
}

interface Form8Data {
  [criterionId: string]: number;
}

interface Form10Data {
  examinerScores: {
    [criterionId: string]: number;
  };
  studentEvaluation: number;
}

interface Form11Data {
  [criterionId: string]: number;
}

interface UserData {
  id: string;
  name: string;
  department: string;
  role: 'academic' | 'non-academic' | 'hod' | 'dean' | 'personnel';
  hasSubmitted: boolean;
}

const Page = () => {
    // Form 9 Data Structure
  const form8Criteria = [
    { id: 'attendance', name: 'Attendance', maxScore: 8 },
    { id: 'punctuality', name: 'Punctuality', maxScore: 8 },
    { id: 'clarity', name: 'Clarity of presentation', maxScore: 20 },
    { id: 'lecture_plan', name: 'Implementation of lecture plan', maxScore: 15 },
    { id: 'continuous_assessment', name: 'Implementation of continuous assessment plan', maxScore: 15 },
    { id: 'quality_lectures', name: 'Quality, currency and depth of lectures', maxScore: 20 },
    { id: 'text_relevance', name: 'Relevance and adequacy of text and reference books', maxScore: 5 },
    { id: 'classroom_order', name: 'Maintenance of classroom order', maxScore: 5 },
    { id: 'student_response', name: 'Response to student\'s questions', maxScore: 4 }
  ];

  // Form 10 Data Structure
  const form10ExaminerCriteria = [
    { id: 'lecture_plan_eval', name: 'Lecture plan', maxScore: 8 },
    { id: 'cap_implementation', name: 'Continuous Assessment plan (CAP) implementation', maxScore: 8 },
    { id: 'subject_breadth', name: 'Subject Breadth coverage of examination questions', maxScore: 10 },
    { id: 'subject_depth', name: 'Subject Depth Coverage of examination question', maxScore: 8 },
    { id: 'grading_scheme', name: 'Examination grading Scheme', maxScore: 8 },
    { id: 'fairness_egs', name: 'Fairness in Application of EGS', maxScore: 5 },
    { id: 'recommended_text', name: 'Recommended text and Reference (Relevance and Adequacy)', maxScore: 10 },
    { id: 'general_quality', name: 'General Quality', maxScore: 3 }
  ];

  // Form 11 Data Structure
  const form11ResearchCriteria = [
    { id: 'problem_definition', name: 'Problem definition or scheme', maxScore: 5 },
    { id: 'literature_understanding', name: 'Understanding of previous work (use of literature)', maxScore: 10 },
    { id: 'background_validity', name: 'Validity of background principles/concepts', maxScore: 12 },
    { id: 'interpretation', name: 'Interpretation of resulting information/model', maxScore: 8 },
    { id: 'data_analysis', name: 'Validity of data gathering/analysis or Analytical approach', maxScore: 20 },
    { id: 'objectives_attainment', name: 'Attainment of objectives or contribution to knowledge', maxScore: 25 },
    { id: 'application_findings', name: 'Application of findings', maxScore: 7 },
    { id: 'report_clarity', name: 'Clarity of report including use of tables, Charts, figures', maxScore: 8 },
    { id: 'references', name: 'References (relevance, adequacy etc)', maxScore: 5 }
  ];

  const [currentForm, setCurrentForm] = useState('dashboard');
  const [user, setUser] = useState<UserData>({
    id: '1',
    name: 'Dr. John Smith',
    department: 'Computer Science',
    role: 'academic',
    hasSubmitted: false
  });
    const dataEntry = [
        {
            title: 'Appraisal',
            section : [ 
                {name:'Teaching quality evaluation', form: 'form8'},
                {name:'Research quality evaluation', form: 'form11'},
                {name:'Administrative quality evaluation', form: 'form10'},
                {name:'Community quality evaluation', form: 'form4'},
                {name:'Other relevant information', form: 'form8'} 
            ]
        },
        {
            title: 'Performance',
            section : [ 
                {name: 'Competence', form: 'form8'},
                {name:'Integrity', form: 'form10'},
                {name:'Compatibility', form: 'form11'},
                {name:'Use of Resources', form: 'form12'}, 
            ]
        },
        {
            title: 'Stress factor',
            section : [ 
                {name: 'Staff Stress Category form', form: 'form5'}, 
                { name: 'Stress Theme form', form: 'form6'}, 
                {name:'Stress Feeling/Frequency form', form: 'form7'} 
            ]
        }
    ]

    function handleEmployeeAdd() {

    }

  // Form 5 Data Structure
  const stressCategories: StressCategory[] = [
    {
      id: 'organizational',
      name: 'Organizational',
      items: ['Time', 'Paper Work', 'Lack of Materials', 'Extra Duties', 'Physical Plant', 'Meetings', 'Class Size', 'Poor Scheduling', 'Interruptions', 'Travels', 'Conflicting Demand', 'Athletics']
    },
    {
      id: 'student',
      name: 'Student',
      items: ['Student Discipline', 'Student Apathy', 'Low Student Achievement', 'Student Absences']
    },
    {
      id: 'administrative',
      name: 'Administrative',
      items: ['Unclear Expectations', 'Lack of Knowledge or Expertise', 'Inconsistency', 'Unreasonable Expectations', 'Poor Evaluation Procedures', 'Indecisiveness', 'Lack of Opportunities for Input', 'Failure to Provide Resources', 'Lack of Follow-Through', 'Harassment', 'Favoritism']
    },
    {
      id: 'teacher',
      name: 'Teacher',
      items: ['Conflict or Lack of Cooperation', 'Incompetence or Irresponsibility', 'Negative Attitude', 'Lack of Communication']
    },
    {
      id: 'parents',
      name: 'Parents',
      items: ['Interference', 'Nonsupport or Apathy', 'Lack of Communication & Understanding']
    },
    {
      id: 'occupational',
      name: 'Occupational',
      items: ['Lack of Professional Growth', 'Low Salary', 'Lack of Advancement', 'Job Insecurity']
    },
    {
      id: 'personal',
      name: 'Personal',
      items: ['Professional-Personal Conflict', 'Conflict With Personal Values']
    },
    {
      id: 'academic',
      name: 'Academic Program',
      items: ['Repetition', 'Unrealistic Goals', 'Low Standards', 'Responsibility to Grade Students']
    },
    {
      id: 'public',
      name: 'Negative Public Attitude',
      items: ['Negative Public Attitude']
    },
    {
      id: 'miscellaneous',
      name: 'Miscellaneous',
      items: ['Other Stress Factors']
    }
  ];

  const stressThemes = [
    'Overload', 'Under-load', 'General Threat', 'Precipitate Change',
    'Performance Control', 'Interference', 'Instructional Quality'
  ];

  const [form5Data, setForm5Data] = useState<Form5Data>({});
  const [form6Data, setForm6Data] = useState<Form6Data>({});
  const [form7Data, setForm7Data] = useState<Form7Data>({});
  const [form8Data, setForm8Data] = useState<Form8Data>({});
  const [form10Data, setForm10Data] = useState<Form10Data>({
    examinerScores: {},
    studentEvaluation: 0
  });
  const [form11Data, setForm11Data] = useState<Form11Data>({});
  const [categoryMaxValues, setCategoryMaxValues] = useState<{[key: string]: number}>({});

  // Dashboard Component
  const Dashboard = () => (
        <div className='flex flex-col m-8 bg-white'>
            <div className='nav flex justify-between bg-white h-[4rem] w-full text-md border border-slate-50'>
                <h1 className="text-2xl m-3 font-bold">Data entry</h1>

                <p className="m-3 my-auto text-blue underline cursor-pointer" onClick={ handleEmployeeAdd }>Data entry for other employees</p>
            </div>

            <div>
                {
                    dataEntry.map((data, key) => {
                        return(
                            <Data data={data} setCurrentForm={setCurrentForm} key={key} />
                        )
                    })
                }
            </div>
            
        </div> 
  );

  // Form 5 Component (Personnel Only)
  const Form5 = () => {
    const [inputMode, setInputMode] = useState<'once' | 'four-times'>('once');
    
    const handleCategoryUpdate = (categoryId: string, item: string, value: number) => {
      setForm5Data(prev => ({
        ...prev,
        [categoryId]: {
          ...prev[categoryId],
          [item]: Math.min(Math.max(value, 0), 10)
        }
      }));
    };

    const calculateCategoryMax = (categoryId: string) => {
      const categoryData = form5Data[categoryId] || {};
      const total = Object.values(categoryData).reduce((sum, val) => sum + val, 0);
      return Math.round(total / Object.keys(categoryData).length * 10) / 10;
    };

    const saveForm5 = () => {
      const maxValues: {[key: string]: number} = {};
      stressCategories.forEach(category => {
        maxValues[category.id] = calculateCategoryMax(category.id);
      });
      setCategoryMaxValues(maxValues);
      alert('Form 5 settings saved successfully!');
    };

    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Form 5: Stress Category Settings</h2>
          <p className="text-gray-600 mb-4">Set maximum values for stress categories (Personnel Only)</p>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Input Mode:</label>
            <select 
              value={inputMode} 
              onChange={(e) => setInputMode(e.target.value as 'once' | 'four-times')}
              className="border rounded px-3 py-2"
            >
              <option value="once">Once Input</option>
              <option value="four-times">Four Times Input (Average)</option>
            </select>
          </div>

          <div className="space-y-6">
            {stressCategories.map((category) => (
              <div key={category.id} className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 text-blue-600">
                  {category.name}
                  <span className="ml-2 text-sm text-gray-500">
                    (Max: {calculateCategoryMax(category.id).toFixed(1)})
                  </span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.items.map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <label className="text-sm flex-1">{item}</label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value={form5Data[category.id]?.[item] || 0}
                        onChange={(e) => handleCategoryUpdate(category.id, item, parseFloat(e.target.value) || 0)}
                        className="w-16 px-2 py-1 border rounded text-center"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              onClick={saveForm5}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
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

  // Form 6 Component
  const Form6 = () => {
    const handleThemeUpdate = (themeId: string, categoryId: string, value: number) => {
      const maxValue = categoryMaxValues[categoryId] || 10;
      setForm6Data(prev => ({
        ...prev,
        [themeId]: {
          ...prev[themeId],
          [categoryId]: Math.min(Math.max(value, 0), maxValue)
        }
      }));
    };

    const saveForm6 = () => {
      alert('Form 6 data saved successfully!');
    };

    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Form 6: Stress Themes Category Values</h2>
          <p className="text-gray-600 mb-4">Enter stress theme values for each category</p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left">Stress Themes</th>
                  {stressCategories.map(category => (
                    <th key={category.id} className="border border-gray-300 p-2 text-center text-xs">
                      {category.name}
                      <br />
                      <span className="text-gray-500">(Max: {categoryMaxValues[category.id] || 10})</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stressThemes.map(theme => (
                  <tr key={theme}>
                    <td className="border border-gray-300 p-2 font-medium">{theme}</td>
                    {stressCategories.map(category => (
                      <td key={category.id} className="border border-gray-300 p-1">
                        <input
                          type="number"
                          min="0"
                          max={categoryMaxValues[category.id] || 10}
                          step="0.1"
                          value={form6Data[theme]?.[category.id] || 0}
                          onChange={(e) => handleThemeUpdate(theme, category.id, parseFloat(e.target.value) || 0)}
                          className="w-full px-1 py-1 text-center border rounded text-sm"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              onClick={saveForm6}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Form 6</span>
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

  // Form 7 Component
  const Form7 = () => {
    const handleFrequencyUpdate = (categoryId: string, value: number) => {
      const maxValue = categoryMaxValues[categoryId] || 100;
      setForm7Data(prev => ({
        ...prev,
        [categoryId]: Math.min(Math.max(value, 0), maxValue)
      }));
    };

    const saveForm7 = () => {
      setUser(prev => ({ ...prev, hasSubmitted: true }));
      alert('Form 7 data saved successfully!');
    };

    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Form 7: Feeling/Frequencies Values</h2>
          <p className="text-gray-600 mb-4">Enter frequency values for each stress category</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stressCategories.map(category => (
              <div key={category.id} className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2 text-orange-600">{category.name}</h3>
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium">Frequency:</label>
                  <input
                    type="number"
                    min="0"
                    max={categoryMaxValues[category.id] || 100}
                    value={form7Data[category.id] || 0}
                    onChange={(e) => handleFrequencyUpdate(category.id, parseFloat(e.target.value) || 0)}
                    className="flex-1 px-3 py-2 border rounded"
                  />
                  <span className="text-sm text-gray-500">
                    / {categoryMaxValues[category.id] || 100}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              onClick={saveForm7}
              className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Form 7</span>
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

    // Form 8 Component - Teaching Performance Assessment
  const Form8 = () => {
    const handleCriterionUpdate = (criterionId: string, value: number) => {
      const criterion = form8Criteria.find(c => c.id === criterionId);
      if (criterion) {
        setForm8Data(prev => ({
          ...prev,
          [criterionId]: Math.min(Math.max(value, 0), criterion.maxScore)
        }));
      }
    };

    const calculateTotal = () => {
      return form8Criteria.reduce((total, criterion) => {
        return total + (form8Data[criterion.id] || 0);
      }, 0);
    };

    const saveForm8 = () => {
      alert('Teaching Performance Assessment saved successfully!');
    };

    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Teaching Performance Assessment</h2>
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
                {form8Criteria.map((criterion, index) => (
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
                        value={form8Data[criterion.id] || 0}
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
              onClick={saveForm8}
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
      alert('External/Peer Examination Assessment saved successfully!');
    };

    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">External/Peer Examination Assessment</h2>
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
      alert('Research Quality Assessment saved successfully!');
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {currentForm === 'dashboard' && <Dashboard />}
        {currentForm === 'form5' && <Form5 />}
        {currentForm === 'form6' && <Form6 />}
        {currentForm === 'form7' && <Form7 />}
        {currentForm === 'form8' && <Form8 />}
        {currentForm === 'form10' && <Form10 />}
        {currentForm === 'form11' && <Form11 />}
      </div>
    </div>
  );
};

export default Page;