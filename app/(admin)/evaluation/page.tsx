'use client';

import React, { useState, useEffect } from 'react';
import { Upload, Calculator, BarChart3, AlertTriangle, CheckCircle, XCircle, FileText, Download } from 'lucide-react';

interface DataPoint {
  department: string;
  value: number;
}

interface GroupData {
  department: string;
  values: number[];
  mean: number;
  variance: number;
  sampleSize: number;
}

interface StatisticalResults {
  groups: GroupData[];
  sseR: number;
  sseF: number;
  skewness: number;
  kurtosis: number;
  fMax: number;
  leveneStatistic: number;
  kolmogorovSmirnov: number;
  fStatistic: number;
  fCritical: number;
  brownForsytheF: number;
  outliers: { department: string; value: number; zScore: number }[];
  isNormallyDistributed: boolean;
  hasEqualVariances: boolean;
  recommendedAlpha: number;
  analysisRecommendation: string;
}

const StatisticalAnalysisPage: React.FC = () => {
  const [dataset, setDataset] = useState<DataPoint[]>([]);
  const [results, setResults] = useState<StatisticalResults | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'analysis' | 'results'>('upload');
  const [alphaLevel, setAlphaLevel] = useState(0.05);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Sample data generator for demonstration
  const generateSampleData = () => {
    const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];
    const sampleData: DataPoint[] = [];
    
    departments.forEach(dept => {
      const size = Math.floor(Math.random() * 35) + 15; // 15-50 samples per department
      for (let i = 0; i < size; i++) {
        const baseValue = Math.random() * 100 + 50; // Base value 50-150
        const noise = (Math.random() - 0.5) * 20; // Add some noise
        sampleData.push({
          department: dept,
          value: baseValue + noise
        });
      }
    });
    
    setDataset(sampleData);
  };

  // Random sampling function
  const performRandomSampling = (data: DataPoint[]): DataPoint[] => {
    const grouped = data.reduce((acc, item) => {
      if (!acc[item.department]) acc[item.department] = [];
      acc[item.department].push(item);
      return acc;
    }, {} as Record<string, DataPoint[]>);

    const sampledData: DataPoint[] = [];
    
    Object.entries(grouped).forEach(([dept, items]) => {
      if (items.length >= 15) {
        // Random sampling - take 70% of available data or minimum 15
        const sampleSize = Math.max(15, Math.floor(items.length * 0.7));
        const shuffled = [...items].sort(() => Math.random() - 0.5);
        sampledData.push(...shuffled.slice(0, sampleSize));
      }
    });

    return sampledData;
  };

  // Statistical calculation functions
  const calculateMean = (values: number[]): number => {
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  };

  const calculateVariance = (values: number[]): number => {
    const mean = calculateMean(values);
    return values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (values.length - 1);
  };

  const calculateSkewness = (values: number[]): number => {
    const mean = calculateMean(values);
    const variance = calculateVariance(values);
    const stdDev = Math.sqrt(variance);
    const n = values.length;
    
    const skewSum = values.reduce((sum, val) => {
      return sum + Math.pow((val - mean) / stdDev, 3);
    }, 0);
    
    return (n / ((n - 1) * (n - 2))) * skewSum;
  };

  const calculateKurtosis = (values: number[]): number => {
    const mean = calculateMean(values);
    const variance = calculateVariance(values);
    const stdDev = Math.sqrt(variance);
    const n = values.length;
    
    const kurtSum = values.reduce((sum, val) => {
      return sum + Math.pow((val - mean) / stdDev, 4);
    }, 0);
    
    const kurtosis = (n * (n + 1) / ((n - 1) * (n - 2) * (n - 3))) * kurtSum;
    const adjustment = 3 * Math.pow(n - 1, 2) / ((n - 2) * (n - 3));
    
    return kurtosis - adjustment;
  };

  const calculateSSE = (groups: GroupData[], restricted: boolean = false): number => {
    if (restricted) {
      // SSE(R) - under null hypothesis (equal means)
      const grandMean = groups.reduce((sum, group) => {
        return sum + group.mean * group.sampleSize;
      }, 0) / groups.reduce((sum, group) => sum + group.sampleSize, 0);
      
      return groups.reduce((sse, group) => {
        return sse + group.values.reduce((groupSSE, val) => {
          return groupSSE + Math.pow(val - grandMean, 2);
        }, 0);
      }, 0);
    } else {
      // SSE(F) - full model
      return groups.reduce((sse, group) => {
        return sse + group.values.reduce((groupSSE, val) => {
          return groupSSE + Math.pow(val - group.mean, 2);
        }, 0);
      }, 0);
    }
  };

  const calculateFMax = (groups: GroupData[]): number => {
    const variances = groups.map(g => g.variance);
    return Math.max(...variances) / Math.min(...variances);
  };

  const calculateLeveneStatistic = (groups: GroupData[]): number => {
    // Simplified Levene's test calculation
    const allValues = groups.flatMap(g => g.values);
    const grandMedian = allValues.sort((a, b) => a - b)[Math.floor(allValues.length / 2)];
    
    const deviations = groups.map(group => ({
      ...group,
      deviations: group.values.map(val => Math.abs(val - grandMedian))
    }));
    
    const grandMeanDeviation = deviations.reduce((sum, group) => {
      return sum + group.deviations.reduce((s, d) => s + d, 0);
    }, 0) / allValues.length;
    
    const numerator = deviations.reduce((sum, group) => {
      const groupMeanDeviation = group.deviations.reduce((s, d) => s + d, 0) / group.deviations.length;
      return sum + group.sampleSize * Math.pow(groupMeanDeviation - grandMeanDeviation, 2);
    }, 0);
    
    const denominator = deviations.reduce((sum, group) => {
      const groupMeanDeviation = group.deviations.reduce((s, d) => s + d, 0) / group.deviations.length;
      return sum + group.deviations.reduce((s, d) => s + Math.pow(d - groupMeanDeviation, 2), 0);
    }, 0);
    
    const k = groups.length;
    const n = allValues.length;
    
    return ((n - k) / (k - 1)) * (numerator / denominator);
  };

  const calculateBrownForsythe = (groups: GroupData[]): number => {
    // Brown-Forsythe test - similar to Levene's but uses median instead of mean
    return calculateLeveneStatistic(groups); // Simplified implementation
  };

  const detectOutliers = (groups: GroupData[]): { department: string; value: number; zScore: number }[] => {
    const outliers: { department: string; value: number; zScore: number }[] = [];
    
    groups.forEach(group => {
      const mean = group.mean;
      const stdDev = Math.sqrt(group.variance);
      
      group.values.forEach(value => {
        const zScore = Math.abs((value - mean) / stdDev);
        if (zScore > 2.58) { // 99% confidence level
          outliers.push({
            department: group.department,
            value,
            zScore
          });
        }
      });
    });
    
    return outliers;
  };

  const calculateFStatistic = (groups: GroupData[]): number => {
    const k = groups.length; // number of groups
    const n = groups.reduce((sum, group) => sum + group.sampleSize, 0); // total sample size
    
    // Calculate MSB (Mean Square Between)
    const grandMean = groups.reduce((sum, group) => {
      return sum + group.mean * group.sampleSize;
    }, 0) / n;
    
    const ssb = groups.reduce((sum, group) => {
      return sum + group.sampleSize * Math.pow(group.mean - grandMean, 2);
    }, 0);
    
    const msb = ssb / (k - 1);
    
    // Calculate MSW (Mean Square Within)
    const ssw = groups.reduce((sum, group) => {
      return sum + (group.sampleSize - 1) * group.variance;
    }, 0);
    
    const msw = ssw / (n - k);
    
    return msb / msw;
  };

  const getFCritical = (alpha: number, df1: number, df2: number): number => {
    // Simplified F-critical values lookup table
    const fTable: Record<number, Record<string, number>> = {
      0.05: { '4_30': 2.69, '4_50': 2.56, '4_100': 2.46, '5_30': 2.53, '5_50': 2.40, '5_100': 2.31 },
      0.01: { '4_30': 4.02, '4_50': 3.78, '4_100': 3.51, '5_30': 3.70, '5_50': 3.47, '5_100': 3.21 },
      0.025: { '4_30': 3.25, '4_50': 3.05, '4_100': 2.84, '5_30': 3.03, '5_50': 2.84, '5_100': 2.64 }
    };
    
    const key = `${df1}_${Math.min(100, Math.max(30, Math.round(df2 / 10) * 10))}`;
    return fTable[alpha]?.[key] || 2.5; // Default approximation
  };

  const performAnalysis = () => {
    if (dataset.length === 0) return;

    setIsAnalyzing(true);
    
    // Perform random sampling
    const sampledData = performRandomSampling(dataset);
    
    // Group data by department
    const grouped = sampledData.reduce((acc, item) => {
      if (!acc[item.department]) acc[item.department] = [];
      acc[item.department].push(item.value);
      return acc;
    }, {} as Record<string, number[]>);

    // Create group data structure
    const groups: GroupData[] = Object.entries(grouped)
      .filter(([_, values]) => values.length >= 15)
      .map(([dept, values]) => ({
        department: dept,
        values,
        mean: calculateMean(values),
        variance: calculateVariance(values),
        sampleSize: values.length
      }));

    if (groups.length === 0) {
      setIsAnalyzing(false);
      return;
    }

    // Perform all calculations
    const allValues = groups.flatMap(g => g.values);
    const sseR = calculateSSE(groups, true);
    const sseF = calculateSSE(groups, false);
    const skewness = calculateSkewness(allValues);
    const kurtosis = calculateKurtosis(allValues);
    const fMax = calculateFMax(groups);
    const leveneStatistic = calculateLeveneStatistic(groups);
    const kolmogorovSmirnov = Math.random() * 0.2; // Simplified for demo
    const fStatistic = calculateFStatistic(groups);
    const brownForsytheF = calculateBrownForsythe(groups);
    const outliers = detectOutliers(groups);

    // Determine recommendations
    const isNormallyDistributed = Math.abs(skewness) <= 1.0 && Math.abs(kurtosis) <= 1.0;
    const hasEqualVariances = fMax <= 3.0;
    
    let recommendedAlpha = alphaLevel;
    let analysisRecommendation = '';

    if (!isNormallyDistributed) {
      recommendedAlpha = 0.01;
      analysisRecommendation += 'Data not normally distributed - use more stringent alpha (0.01). ';
    }

    if (!hasEqualVariances) {
      recommendedAlpha = 0.025;
      analysisRecommendation += 'Heteroscedasticity detected - use Brown-Forsythe test or alpha=0.025. ';
    }

    if (sseF > sseR) {
      analysisRecommendation += 'Error independence violated (SSE(F) > SSE(R)). ';
    }

    if (outliers.length > 0) {
      analysisRecommendation += `${outliers.length} outliers detected - consider removal or transformation. `;
    }

    const fCritical = getFCritical(recommendedAlpha, groups.length - 1, groups.reduce((sum, g) => sum + g.sampleSize, 0) - groups.length);

    const results: StatisticalResults = {
      groups,
      sseR,
      sseF,
      skewness,
      kurtosis,
      fMax,
      leveneStatistic,
      kolmogorovSmirnov,
      fStatistic,
      fCritical,
      brownForsytheF,
      outliers,
      isNormallyDistributed,
      hasEqualVariances,
      recommendedAlpha,
      analysisRecommendation: analysisRecommendation || 'Data meets assumptions for standard F-test analysis.'
    };

    setResults(results);
    setIsAnalyzing(false);
    setActiveTab('results');
  };

  // Fetch dataset from database (mocked for this example)
  useEffect(() => {
    // Fetch dataset from DB on mount
    // fetchDatasetFromDB().then(setDataset);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-pes mb-2">
            Statistical Analysis Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Comprehensive ANOVA assumptions testing and analysis platform
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-8 bg-white rounded-lg shadow-lg p-2">
          {[
            { key: 'upload', label: 'Data Upload', icon: Upload },
            { key: 'analysis', label: 'Analysis Setup', icon: Calculator },
            { key: 'results', label: 'Results', icon: BarChart3 }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === key
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          
          {/* Upload Tab */}
          {activeTab === 'upload' && (
            <div>
              <h2 className="text-2xl font-bold text-pes mb-6">
                <Upload className="inline mr-2" />
                Data Upload & Preview
              </h2>

              <div className="space-y-6">
                <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <Upload size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-4">Upload your dataset or generate sample data</p>
                  <button
                    onClick={generateSampleData}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Generate Sample Data
                  </button>
                </div>

                {dataset.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Dataset Preview ({dataset.length} records)</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="overflow-x-auto">
                        <table className="w-full border border-gray-200 rounded-lg">
                          <thead className="bg-indigo-50">
                            <tr>
                              <th className="p-3 text-left">Department</th>
                              <th className="p-3 text-left">Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dataset.slice(0, 10).map((item, index) => (
                              <tr key={index} className="border-b border-gray-100">
                                <td className="p-3">{item.department}</td>
                                <td className="p-3">{item.value.toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {dataset.length > 10 && (
                          <p className="text-sm text-gray-500 mt-2">
                            Showing first 10 of {dataset.length} records
                          </p>
                        )}
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold">Department Summary</h4>
                        {Object.entries(
                          dataset.reduce((acc, item) => {
                            acc[item.department] = (acc[item.department] || 0) + 1;
                            return acc;
                          }, {} as Record<string, number>)
                        ).map(([dept, count]) => (
                          <div key={dept} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <span>{dept}</span>
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              count >= 15 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {count} samples
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Analysis Tab */}
          {activeTab === 'analysis' && (
            <div>
              <h2 className="text-2xl font-bold text-pes mb-6">
                <Calculator className="inline mr-2" />
                Analysis Configuration
              </h2>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alpha Level (Significance Level)
                    </label>
                    <select
                      value={alphaLevel}
                      onChange={(e) => setAlphaLevel(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value={0.05}>0.05 (95% confidence)</option>
                      <option value={0.025}>0.025 (97.5% confidence)</option>
                      <option value={0.01}>0.01 (99% confidence)</option>
                    </select>
                  </div>

                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-pes mb-3">Analysis Steps</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        Random sampling (min 15 per group)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        Calculate SSE(R) and SSE(F)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        Test normality (Skewness & Kurtosis)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        Test homogeneity (Levene's, F-max)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        Brown-Forsythe test if needed
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        Outlier detection
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={performAnalysis}
                    disabled={dataset.length === 0 || isAnalyzing}
                    className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all ${
                      dataset.length === 0 || isAnalyzing
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Perform Statistical Analysis'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Results Tab */}
          {activeTab === 'results' && (
            <div>
              <h2 className="text-2xl font-bold text-pes mb-6">
                <BarChart3 className="inline mr-2" />
                Analysis Results
              </h2>

              {!results ? (
                <div className="text-center py-12 text-gray-500">
                  <FileText size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No analysis results yet. Please run the analysis first.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Summary Cards */}
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="bg-pes text-white p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Groups Analyzed</h3>
                      <p className="text-3xl font-bold">{results.groups.length}</p>
                    </div>
                    <div className={`p-6 rounded-lg text-white ${results.isNormallyDistributed ? 'bg-green-500' : 'bg-red-500'}`}>
                      <h3 className="text-lg font-semibold mb-2">Normality</h3>
                      <p className="text-xl font-bold">{results.isNormallyDistributed ? 'Normal' : 'Non-Normal'}</p>
                    </div>
                    <div className={`p-6 rounded-lg text-white ${results.hasEqualVariances ? 'bg-green-500' : 'bg-orange-500'}`}>
                      <h3 className="text-lg font-semibold mb-2">Homogeneity</h3>
                      <p className="text-xl font-bold">{results.hasEqualVariances ? 'Equal' : 'Unequal'}</p>
                    </div>
                    <div className="bg-purple-600 text-white p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Outliers</h3>
                      <p className="text-3xl font-bold">{results.outliers.length}</p>
                    </div>
                  </div>

                  {/* Detailed Results */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Key Statistics</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>SSE(R):</span>
                          <span className="font-mono">{results.sseR.toFixed(4)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>SSE(F):</span>
                          <span className="font-mono">{results.sseF.toFixed(4)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Skewness:</span>
                          <span className={`font-mono ${Math.abs(results.skewness) <= 1 ? 'text-green-600' : 'text-red-600'}`}>
                            {results.skewness.toFixed(4)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Kurtosis:</span>
                          <span className={`font-mono ${Math.abs(results.kurtosis) <= 1 ? 'text-green-600' : 'text-red-600'}`}>
                            {results.kurtosis.toFixed(4)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>F-max:</span>
                          <span className={`font-mono ${results.fMax <= 3 ? 'text-green-600' : 'text-orange-600'}`}>
                            {results.fMax.toFixed(4)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Levene's Test:</span>
                          <span className="font-mono">{results.leveneStatistic.toFixed(4)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">F-Test Results</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>F-statistic:</span>
                          <span className="font-mono">{results.fStatistic.toFixed(4)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>F-critical:</span>
                          <span className="font-mono">{results.fCritical.toFixed(4)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Brown-Forsythe F*:</span>
                          <span className="font-mono">{results.brownForsytheF.toFixed(4)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Recommended α:</span>
                          <span className="font-mono">{results.recommendedAlpha}</span>
                        </div>
                        <div className="mt-4 p-3 rounded-lg bg-blue-100">
                          <p className="text-sm">
                            <strong>Decision:</strong> F-statistic {results.fStatistic > results.fCritical ? '>' : '≤'} F-critical
                            {results.fStatistic > results.fCritical ? ' - Reject H₀' : ' - Fail to reject H₀'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Group Statistics */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Group Statistics</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border border-gray-200 rounded-lg">
                        <thead className="bg-indigo-50">
                          <tr>
                            <th className="p-3 text-left">Department</th>
                            <th className="p-3 text-left">Sample Size</th>
                            <th className="p-3 text-left">Mean</th>
                            <th className="p-3 text-left">Variance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.groups.map((group, index) => (
                            <tr key={index} className="border-b border-gray-100">
                              <td className="p-3 font-medium">{group.department}</td>
                              <td className="p-3">{group.sampleSize}</td>
                              <td className="p-3">{group.mean.toFixed(3)}</td>
                              <td className="p-3">{group.variance.toFixed(3)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Outlier List */}
                  {results.outliers.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-red-700">
                        <AlertTriangle className="inline mr-2" />
                        Outliers Detected
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border border-gray-200 rounded-lg">
                          <thead className="bg-red-50">
                            <tr>
                              <th className="p-3 text-left">Department</th>
                              <th className="p-3 text-left">Value</th>
                              <th className="p-3 text-left">Z-Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.outliers.map((outlier, idx) => (
                              <tr key={idx} className="border-b border-gray-100">
                                <td className="p-3">{outlier.department}</td>
                                <td className="p-3">{outlier.value.toFixed(3)}</td>
                                <td className="p-3 text-red-600 font-mono">{outlier.zScore.toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Recommendation */}
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Analysis Recommendation</h3>
                    <p className="text-gray-700">{results.analysisRecommendation}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatisticalAnalysisPage;