'use client'
import React, { useState, useEffect } from 'react';
import { Calculator, Users, Clock, AlertTriangle, BarChart3, FileText, Play } from 'lucide-react';

interface DataPoint {
  id: number;
  group: string;
  value: number;
}

interface ANOVAResult {
  ssto: number;
  sstr: number;
  sse: number;
  fStatistic: number;
  criticalValue: number;
  conclusion: string;
  dfBetween: number;
  dfWithin: number;
  msBetween: number;
  msWithin: number;
}

interface StressFactors {
  studentPhysical: { mean: number; sd: number; items: number };
  timePressure: { mean: number; sd: number; items: number };
  conflict: { mean: number; sd: number; items: number };
}

const StressAnalysisTool: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analysis' | 'results'>('analysis');
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [newGroup, setNewGroup] = useState('');
  const [newValue, setNewValue] = useState('');
  const [anovaResult, setAnovaResult] = useState<ANOVAResult | null>(null);
  const [stressFactors, setStressFactors] = useState<StressFactors>({
    studentPhysical: { mean: 76.3750, sd: 69.7965, items: 80 },
    timePressure: { mean: 8.6375, sd: 3.6291, items: 80 },
    conflict: { mean: 3.3463, sd: 2.1416, items: 80 }
  });

  // Sample data from the document
  const sampleData: DataPoint[] = [
    { id: 1, group: 'Group A', value: 40 },
    { id: 2, group: 'Group A', value: 38 },
    { id: 3, group: 'Group A', value: 42 },
    { id: 4, group: 'Group A', value: 39 },
    { id: 5, group: 'Group B', value: 25 },
    { id: 6, group: 'Group B', value: 28 },
    { id: 7, group: 'Group B', value: 22 },
    { id: 8, group: 'Group C', value: 45 },
    { id: 9, group: 'Group C', value: 48 },
    { id: 10, group: 'Group C', value: 46 },
    { id: 11, group: 'Group C', value: 44 },
    { id: 12, group: 'Group C', value: 47 }
  ];

  useEffect(() => {
    setDataPoints(sampleData);
  }, []);

  const addDataPoint = () => {
    if (newGroup && newValue) {
      const newPoint: DataPoint = {
        id: Date.now(),
        group: newGroup,
        value: parseFloat(newValue)
      };
      setDataPoints([...dataPoints, newPoint]);
      setNewGroup('');
      setNewValue('');
    }
  };

  const removeDataPoint = (id: number) => {
    setDataPoints(dataPoints.filter(point => point.id !== id));
  };

  const loadSampleData = () => {
    setDataPoints(sampleData);
  };

  const calculateANOVA = () => {
    if (dataPoints.length === 0) return;

    // Group data
    const groupedData: { [key: string]: number[] } = {};
    dataPoints.forEach(point => {
      if (!groupedData[point.group]) {
        groupedData[point.group] = [];
      }
      groupedData[point.group].push(point.value);
    });

    const groups = Object.keys(groupedData);
    const k = groups.length; // number of groups
    const n = dataPoints.length; // total observations

    // Calculate overall mean
    const overallSum = dataPoints.reduce((sum, point) => sum + point.value, 0);
    const overallMean = overallSum / n;

    // Calculate SSTO (Total Sum of Squares)
    const ssto = dataPoints.reduce((sum, point) => {
      return sum + Math.pow(point.value - overallMean, 2);
    }, 0);

    // Calculate SSTR (Treatment Sum of Squares)
    let sstr = 0;
    groups.forEach(group => {
      const groupData = groupedData[group];
      const groupMean = groupData.reduce((sum, val) => sum + val, 0) / groupData.length;
      sstr += groupData.length * Math.pow(groupMean - overallMean, 2);
    });

    // Calculate SSE (Error Sum of Squares)
    const sse = ssto - sstr;

    // Degrees of freedom
    const dfBetween = k - 1;
    const dfWithin = n - k;

    // Mean squares
    const msBetween = sstr / dfBetween;
    const msWithin = sse / dfWithin;

    // F-statistic
    const fStatistic = msBetween / msWithin;

    // Critical value (F(0.05, dfBetween, dfWithin)) - simplified lookup
    const criticalValue = getCriticalValue(dfBetween, dfWithin);

    const conclusion = fStatistic > criticalValue 
      ? "Reject null hypothesis - There are significant differences between groups"
      : "Accept null hypothesis - No significant differences between groups";

    setAnovaResult({
      ssto,
      sstr,
      sse,
      fStatistic,
      criticalValue,
      conclusion,
      dfBetween,
      dfWithin,
      msBetween,
      msWithin
    });

    setActiveTab('results');
  };

  const getCriticalValue = (df1: number, df2: number): number => {
    // Simplified F-critical values for α = 0.05
    const fTable: { [key: string]: number } = {
      '1,10': 4.96, '1,20': 4.35, '1,30': 4.17, '1,40': 4.08,
      '2,10': 4.10, '2,20': 3.49, '2,30': 3.32, '2,40': 3.23,
      '3,10': 3.71, '3,20': 3.10, '3,30': 2.92, '3,40': 2.84,
      '4,10': 3.48, '4,20': 2.87, '4,30': 2.69, '4,40': 2.61,
      '5,10': 3.33, '5,20': 2.71, '5,30': 2.53, '5,40': 2.45
    };
    
    const key = `${df1},${Math.min(Math.max(Math.round(df2/10)*10, 10), 40)}`;
    return fTable[key] || 2.89; // Default value from the document
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <BarChart3 className="w-8 h-8 text-pes" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Faculty Stress Analysis Tool</h1>
              <p className="text-gray-600">ANOVA-based stress determination for academic faculty</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-2">
            {[
              { id: 'analysis', label: 'Analysis', icon: Calculator },
              { id: 'results', label: 'Results', icon: BarChart3 }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === id
                    ? 'bg-pes text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'analysis' && (
          <div className="space-y-6">
            {/* Data Input */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Calculator className="w-6 h-6 text-pes" />
                Data Input & Analysis
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Add Data Points</h3>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Group name"
                      value={newGroup}
                      onChange={(e) => setNewGroup(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Value"
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <button
                      onClick={addDataPoint}
                      className="px-4 py-2 bg-pes text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <button
                    onClick={loadSampleData}
                    className="text-sm text-pes hover:text-indigo-800"
                  >
                    Load Sample Data
                  </button>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Actions</h3>
                  <button
                    onClick={calculateANOVA}
                    disabled={dataPoints.length === 0}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    Run ANOVA Analysis
                  </button>
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left">Group</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Value</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPoints.map((point) => (
                      <tr key={point.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2">{point.group}</td>
                        <td className="border border-gray-300 px-4 py-2">{point.value}</td>
                        <td className="border border-gray-300 px-4 py-2">
                          <button
                            onClick={() => removeDataPoint(point.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {dataPoints.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No data points added yet. Add some data or load sample data to begin.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'results' && anovaResult && (
          <div className="space-y-6">
            {/* Results Summary */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-pes" />
                ANOVA Results
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-3">Sum of Squares</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>SSTO (Total):</span>
                      <span className="font-mono">{anovaResult.ssto.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SSTR (Treatment):</span>
                      <span className="font-mono">{anovaResult.sstr.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SSE (Error):</span>
                      <span className="font-mono">{anovaResult.sse.toFixed(4)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-3">Test Statistics</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>F-statistic:</span>
                      <span className="font-mono font-bold">{anovaResult.fStatistic.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>F-critical (α=0.05):</span>
                      <span className="font-mono">{anovaResult.criticalValue.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>df (between, within):</span>
                      <span className="font-mono">({anovaResult.dfBetween}, {anovaResult.dfWithin})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ANOVA Table */}
              <div className="overflow-x-auto mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">ANOVA Table</h3>
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left">Source</th>
                      <th className="border border-gray-300 px-4 py-2 text-right">SS</th>
                      <th className="border border-gray-300 px-4 py-2 text-right">df</th>
                      <th className="border border-gray-300 px-4 py-2 text-right">MS</th>
                      <th className="border border-gray-300 px-4 py-2 text-right">F</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Between Groups</td>
                      <td className="border border-gray-300 px-4 py-2 text-right font-mono">
                        {anovaResult.sstr.toFixed(4)}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right">
                        {anovaResult.dfBetween}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right font-mono">
                        {anovaResult.msBetween.toFixed(4)}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right font-mono font-bold">
                        {anovaResult.fStatistic.toFixed(4)}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Within Groups</td>
                      <td className="border border-gray-300 px-4 py-2 text-right font-mono">
                        {anovaResult.sse.toFixed(4)}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right">
                        {anovaResult.dfWithin}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right font-mono">
                        {anovaResult.msWithin.toFixed(4)}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right">-</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">Total</td>
                      <td className="border border-gray-300 px-4 py-2 text-right font-mono font-semibold">
                        {anovaResult.ssto.toFixed(4)}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right font-semibold">
                        {anovaResult.dfBetween + anovaResult.dfWithin}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right">-</td>
                      <td className="border border-gray-300 px-4 py-2 text-right">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Conclusion */}
              <div className={`p-4 rounded-lg ${
                anovaResult.fStatistic > anovaResult.criticalValue 
                  ? 'bg-red-50 border-l-4 border-red-400' 
                  : 'bg-green-50 border-l-4 border-green-400'
              }`}>
                <h3 className={`font-semibold mb-2 ${
                  anovaResult.fStatistic > anovaResult.criticalValue 
                    ? 'text-red-800' 
                    : 'text-green-800'
                }`}>
                  Conclusion
                </h3>
                <p className={`${
                  anovaResult.fStatistic > anovaResult.criticalValue 
                    ? 'text-red-700' 
                    : 'text-green-700'
                }`}>
                  {anovaResult.conclusion}
                </p>
                <p className={`text-sm mt-2 ${
                  anovaResult.fStatistic > anovaResult.criticalValue 
                    ? 'text-red-600' 
                    : 'text-green-600'
                }`}>
                  F-calculated ({anovaResult.fStatistic.toFixed(4)}) {
                    anovaResult.fStatistic > anovaResult.criticalValue ? '>' : '≤'
                  } F-critical ({anovaResult.criticalValue.toFixed(4)})
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StressAnalysisTool;

        {/* Content */}
        // {activeTab === 'explanation' && (
        //   <div className="space-y-6">
        //     {/* Theory Section */}
        //     <div className="bg-white rounded-lg shadow-lg p-6">
        //       <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        //         <FileText className="w-6 h-6 text-pes" />
        //         Understanding ANOVA for Stress Analysis
        //       </h2>
              
        //       <div className="prose max-w-none">
        //         <p className="text-gray-700 mb-4">
        //           Analysis of Variance (ANOVA) is used to determine if there are statistically significant 
        //           differences between the means of three or more independent groups. In the context of faculty 
        //           stress analysis, we use ANOVA to determine if workload data collected from different groups 
        //           within the faculty actually represents the stress experienced by lecturers.
        //         </p>

        //         <div className="grid md:grid-cols-2 gap-6 mt-6">
        //           <div className="bg-blue-50 p-4 rounded-lg">
        //             <h3 className="font-semibold text-blue-800 mb-2">Key Calculations</h3>
        //             <ul className="text-blue-700 space-y-1 text-sm">
        //               <li><strong>SSTO:</strong> Total Sum of Squares</li>
        //               <li><strong>SSTR:</strong> Treatment Sum of Squares</li>
        //               <li><strong>SSE:</strong> Error Sum of Squares</li>
        //               <li><strong>F-statistic:</strong> Test statistic for comparison</li>
        //             </ul>
        //           </div>

        //           <div className="bg-green-50 p-4 rounded-lg">
        //             <h3 className="font-semibold text-green-800 mb-2">Decision Rule</h3>
        //             <p className="text-green-700 text-sm">
        //               If F-calculated {'>'} F-critical (α = 0.05), we reject the null hypothesis 
        //               and conclude there are significant differences between groups.
        //             </p>
        //           </div>
        //         </div>
        //       </div>
        //     </div>

        //     {/* Stress Factors */}
        //     <div className="bg-white rounded-lg shadow-lg p-6">
        //       <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        //         <AlertTriangle className="w-6 h-6 text-orange-600" />
        //         Three Primary Stress Factors
        //       </h2>

        //       <div className="grid md:grid-cols-3 gap-6">
        //         <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
        //           <div className="flex items-center gap-2 mb-2">
        //             <Users className="w-5 h-5 text-red-600" />
        //             <h3 className="font-semibold text-red-800">Students & Physical Conditions</h3>
        //           </div>
        //           <p className="text-red-700 text-sm mb-3">
        //             Stress arising from interactions with students and the teaching environment.
        //           </p>
        //           <div className="text-xs text-red-600">
        //             <div>Mean: {stressFactors.studentPhysical.mean}</div>
        //             <div>SD: {stressFactors.studentPhysical.sd.toFixed(4)}</div>
        //             <div>Items: {stressFactors.studentPhysical.items}</div>
        //           </div>
        //         </div>

        //         <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
        //           <div className="flex items-center gap-2 mb-2">
        //             <Clock className="w-5 h-5 text-yellow-600" />
        //             <h3 className="font-semibold text-yellow-800">Time Pressure</h3>
        //           </div>
        //           <p className="text-yellow-700 text-sm mb-3">
        //             Stress from having too much to do in insufficient time and work intruding on home life.
        //           </p>
        //           <div className="text-xs text-yellow-600">
        //             <div>Mean: {stressFactors.timePressure.mean}</div>
        //             <div>SD: {stressFactors.timePressure.sd.toFixed(4)}</div>
        //             <div>Items: {stressFactors.timePressure.items}</div>
        //           </div>
        //         </div>

        //         <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
        //           <div className="flex items-center gap-2 mb-2">
        //             <AlertTriangle className="w-5 h-5 text-purple-600" />
        //             <h3 className="font-semibold text-purple-800">Conflict</h3>
        //           </div>
        //           <p className="text-purple-700 text-sm mb-3">
        //             Stress from staff tensions and role conflict (doing things inconsistent with expectations).
        //           </p>
        //           <div className="text-xs text-purple-600">
        //             <div>Mean: {stressFactors.conflict.mean}</div>
        //             <div>SD: {stressFactors.conflict.sd.toFixed(4)}</div>
        //             <div>Items: {stressFactors.conflict.items}</div>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // )}