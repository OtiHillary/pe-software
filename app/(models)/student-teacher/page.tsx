"use client"
import { useState, useEffect } from 'react';

const Home = () => {
  // State for input parameters
  const [params, setParams] = useState({
    D: 40, // Total official hours available for lecturers' formal activities per week
    G: 168, // Total hours available in a week (24*7)
    Y: 3, // Weekly lecture hours per course
    alpha: 4, // Number of courses to be lectured per week
    t1: 0.4, // Proportion for student consultation
    t2: 0.4, // Proportion for research/community service
    t3: 0.2, // Proportion for assessment
    t4: 0.5, // Standard hours to assess a single student's work per week
    lambda: 5, // Rate at which students consult lecturer per hour
    mu: 6, // Rate at which lecturer attends to students per hour
    S0: 0.2, // Probability of doing research outside formal hours
    studentPopulation: 1000, // Total student population
    staffMix: { // Academic staff mix
      lecturers: 0.5,
      seniorLecturers: 0.3,
      professors: 0.2
    }
  });

  // State for calculated results
  const [results, setResults] = useState({
    optimalK: 0,
    totalStaffNeeded: 0,
    staffDistribution: {
      lecturers: 0,
      seniorLecturers: 0,
      professors: 0
    },
    efficiencyValue: 0
  });

  interface StaffMix {
    lecturers: number;
    seniorLecturers: number;
    professors: number;
  }

  interface Params {
    D: number;
    G: number;
    Y: number;
    alpha: number;
    t1: number;
    t2: number;
    t3: number;
    t4: number;
    lambda: number;
    mu: number;
    S0: number;
    studentPopulation: number;
    staffMix: StaffMix;
  }

  interface StaffDistribution {
    lecturers: number;
    seniorLecturers: number;
    professors: number;
  }

  interface Results {
    optimalK: number;
    totalStaffNeeded: number;
    staffDistribution: StaffDistribution;
    efficiencyValue: number;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Handle nested properties like staffMix
    if (name.includes('.')) {
      const [parent, child] = name.split('.') as [keyof Params, keyof StaffMix];
      setParams({
        ...params,
        [parent]: {
          ...params[parent] as StaffMix,
          [child]: parseFloat(value)
        }
      });
    } else {
      setParams({
        ...params,
        [name]: parseFloat(value)
      });
    }
  };

  const factorial = (n: number): number => {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  };

  const combination = (n: number, k: number) => {
    return factorial(n) / (factorial(k) * factorial(n - k));
  };

  const calculateP0 = (k: number, rho: number) => {
    let sum = 0;
    for (let n = 0; n <= k - 1; n++) {
      sum += Math.pow(k * rho, n) / factorial(n);
    }
    sum += Math.pow(k * rho, k) / (factorial(k) * (1 - rho));
    return 1 / sum;
  };

  const calculateW = (k: number, lambda: number, mu: number, P0: number) => {
    const rho = lambda / (k * mu);
    const numerator = P0 * Math.pow(lambda/mu, k) * lambda * mu;
    const denominator = factorial(k - 1) * Math.pow(k * mu - lambda, 2);
    return numerator / denominator;
  };

  const calculateH = (K: number) => {
    const { D, G, Y, alpha, t1, t2, t3, t4, lambda, mu, S0 } = params;

    // Calculate basic parameters
    const F = D - Y * alpha; // Non-formal classroom lecture hours
    const B = t1 * F; // Hours scheduled for student consultation
    const C = t3 * F; // Hours scheduled for assessment
    
    const rho = lambda / (K * mu);
    
    // Check if rho < 1 (system stability condition)
    if (rho >= 1) return 0;
    
    // Calculate P0
    const P0 = calculateP0(K, rho);
    
    // Calculate W
    const W = calculateW(K, lambda, mu, P0);
    
    // Calculate numerator components
    const term1 = K * (B - W);
    const term2 = B * (1 - P0) + t4 * K;
    const term3 = (1 - S0) * (G - D);
    
    // Calculate denominator components
    const denom1 = K * (1 - D * Y * alpha * t1);
    const denom2 = (1 - t1 - t2) * (D - Y * alpha);
    
    // Calculate H
    const H = (term1 + term2 + term3) / (denom1 + denom2);
    
    return H;
  };

  const findOptimalK = () => {
    let maxH = 0;
    let optimalK = 0;
    
    // Try different values of K from 1 to 50 (can adjust range as needed)
    for (let K = 1; K <= 50; K++) {
      const H = calculateH(K);
      
      if (H > maxH) {
        maxH = H;
        optimalK = K;
      }
    }
    
    return { optimalK, maxH };
  };

  const calculateStaffNeeds = (optimalK: number) => {
    const { studentPopulation, staffMix } = params;
    
    const totalStaffNeeded = Math.ceil(studentPopulation / optimalK);
    
    // Calculate staff distribution based on mix
    const staffDistribution = {
      lecturers: Math.round(totalStaffNeeded * staffMix.lecturers),
      seniorLecturers: Math.round(totalStaffNeeded * staffMix.seniorLecturers),
      professors: Math.round(totalStaffNeeded * staffMix.professors)
    };
    
    return { totalStaffNeeded, staffDistribution };
  };

  const handleCalculate = () => {
    const { optimalK, maxH } = findOptimalK();
    const { totalStaffNeeded, staffDistribution } = calculateStaffNeeds(optimalK);
    
    setResults({
      optimalK,
      totalStaffNeeded,
      staffDistribution,
      efficiencyValue: maxH
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Student-Teacher Ratio Calculator</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-4">Input Parameters</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Total work hours (D)</label>
              <input
                type="number"
                name="D"
                value={params.D}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Total weekly hours (G)</label>
              <input
                type="number"
                name="G"
                value={params.G}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Lecture hours/course (Y)</label>
              <input
                type="number"
                name="Y"
                value={params.Y}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Courses per week (α)</label>
              <input
                type="number"
                name="alpha"
                value={params.alpha}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Consultation ratio (t₁)</label>
              <input
                type="number"
                step="0.1"
                name="t1"
                value={params.t1}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Research ratio (t₂)</label>
              <input
                type="number"
                step="0.1"
                name="t2"
                value={params.t2}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Assessment ratio (t₃)</label>
              <input
                type="number"
                step="0.1"
                name="t3"
                value={params.t3}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Assessment time (t₄)</label>
              <input
                type="number"
                step="0.1"
                name="t4"
                value={params.t4}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Student arrival rate (λ)</label>
              <input
                type="number"
                step="0.1"
                name="lambda"
                value={params.lambda}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Service rate (μ)</label>
              <input
                type="number"
                step="0.1"
                name="mu"
                value={params.mu}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Research probability (S₀)</label>
              <input
                type="number"
                step="0.1"
                name="S0"
                value={params.S0}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Student population</label>
              <input
                type="number"
                name="studentPopulation"
                value={params.studentPopulation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
          
          <h3 className="font-medium mt-4 mb-2">Academic Staff Mix</h3>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Lecturers</label>
              <input
                type="number"
                step="0.1"
                name="staffMix.lecturers"
                value={params.staffMix.lecturers}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Senior Lecturers</label>
              <input
                type="number"
                step="0.1"
                name="staffMix.seniorLecturers"
                value={params.staffMix.seniorLecturers}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Professors</label>
              <input
                type="number"
                step="0.1"
                name="staffMix.professors"
                value={params.staffMix.professors}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <button
              onClick={handleCalculate}
              className="w-full bg-pes text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Calculate Optimal Ratio
            </button>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700">Optimal Student-Teacher Ratio (K*)</h3>
              <div className="text-xl font-bold">{results.optimalK}</div>
              <div className="text-sm text-gray-500">Efficiency value: {results.efficiencyValue.toFixed(4)}</div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700">Total Academic Staff Needed</h3>
              <div className="text-xl font-bold">{results.totalStaffNeeded}</div>
              <div className="text-sm text-gray-500">Based on student population of {params.studentPopulation}</div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700">Staff Distribution</h3>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="bg-white p-3 rounded border">
                  <div className="text-lg font-bold">{results.staffDistribution.lecturers}</div>
                  <div className="text-sm text-gray-600">Lecturers</div>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <div className="text-lg font-bold">{results.staffDistribution.seniorLecturers}</div>
                  <div className="text-sm text-gray-600">Senior Lecturers</div>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <div className="text-lg font-bold">{results.staffDistribution.professors}</div>
                  <div className="text-sm text-gray-600">Professors</div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 rounded-md border border-pes">
              <h3 className="font-medium text-pes">Interpretation</h3>
              <p className="text-sm text-pes mt-1">
                For optimal teaching-learning efficiency, each teacher should have approximately {results.optimalK} students. 
                With your current student population of {params.studentPopulation}, you need {results.totalStaffNeeded} academic staff 
                members distributed as shown above.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;