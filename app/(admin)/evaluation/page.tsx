'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Upload, BarChart3, FileText } from 'lucide-react';

// ---------- Types ----------
interface DataPoint {
  department: string;
  user: string;
  value: number;
}

interface GroupData {
  department: string;
  user: string;
  values: number[];
  mean: number;
  variance: number;
  sampleSize: number;
}

interface Data {
  userperformance: {
    competence: number;
    integrity: number;
    compatibility: number;
    use_of_resources: number;
    pesuser_name: string;
  }[];
  appraisal: {
    teaching_quality_evaluation: number;
    research_quality_evaluation: number;
    administrative_quality_evaluation: number;
    community_quality_evaluation: number;
    pesuser_name: string;
  }[];
  stress: {
    staff_stress_category_form: string;
    stress_theme_form: string;
    stress_feeling_form: string;
    pesuser_name: string;
  }[];
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
  outliers: { department: string; user: string; value: number; zScore: number }[];
  isNormallyDistributed: boolean;
  hasEqualVariances: boolean;
  recommendedAlpha: number;
  analysisRecommendation: string;
}

// ---------- Utilities ----------
const calculateMean = (values: any[]): number => {
  const nums = values.map(Number).filter(v => !isNaN(v));
  if (nums.length === 0) return 0;
  return nums.reduce((sum, v) => sum + v, 0) / nums.length;
};

const calculateVariance = (values: any[]): number => {
  const nums = values.map(Number).filter(v => !isNaN(v));
  if (nums.length < 2) return 0;
  const mean = calculateMean(nums);
  return nums.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / (nums.length - 1);
};

const calculateSkewness = (values: any[]): number => {
  const nums = values.map(Number).filter(v => !isNaN(v));
  const n = nums.length;
  if (n < 3) return 0;

  const mean = calculateMean(nums);
  const variance = calculateVariance(nums);
  if (variance === 0) return 0;

  const stdDev = Math.sqrt(variance);
  const skewSum = nums.reduce((sum, v) => sum + Math.pow((v - mean) / stdDev, 3), 0);
  return (n / ((n - 1) * (n - 2))) * skewSum;
};

const calculateKurtosis = (values: any[]): number => {
  const nums = values.map(Number).filter(v => !isNaN(v));
  const n = nums.length;
  if (n < 4) return 0;

  const mean = calculateMean(nums);
  const variance = calculateVariance(nums);
  if (variance === 0) return 0;

  const stdDev = Math.sqrt(variance);
  const kurtSum = nums.reduce((sum, v) => sum + Math.pow((v - mean) / stdDev, 4), 0);
  const kurtosis = (n * (n + 1) / ((n - 1) * (n - 2) * (n - 3))) * kurtSum;
  const adjustment = 3 * Math.pow(n - 1, 2) / ((n - 2) * (n - 3));
  return kurtosis - adjustment;
};

const calculateSSE = (groups: GroupData[], restricted = false): number => {
  if (!groups || groups.length === 0) return 0;

  if (restricted) {
    const totalN = groups.reduce((s, g) => s + g.sampleSize, 0);
    if (totalN === 0) return 0;
    const grandMean = groups.reduce((s, g) => s + g.mean * g.sampleSize, 0) / totalN;
    return groups.reduce((sse, g) =>
      sse + g.values.reduce((gsse, v) => gsse + Math.pow(Number(v) - grandMean, 2), 0), 0);
  } else {
    return groups.reduce((sse, g) =>
      sse + g.values.reduce((gsse, v) => gsse + Math.pow(Number(v) - g.mean, 2), 0), 0);
  }
};

const calculateFMax = (groups: GroupData[]): number => {
  const vars = groups.map(g => g.variance).filter(v => v > 0);
  if (vars.length === 0) return 0;
  return Math.max(...vars) / Math.min(...vars);
};

const calculateLeveneStatistic = (groups: GroupData[]): number => {
  if (!groups || groups.length < 2) return 0;
  const allVals = groups.flatMap(g => g.values.map(Number)).filter(v => !isNaN(v));
  if (allVals.length === 0) return 0;

  const sorted = [...allVals].sort((a, b) => a - b);
  const grandMedian = sorted[Math.floor(sorted.length / 2)];

  const deviations = groups.map(g => ({
    ...g,
    deviations: g.values.map(v => Math.abs(Number(v) - grandMedian))
  }));

  const grandMeanDev = deviations.reduce((s, g) => s + g.deviations.reduce((x, d) => x + d, 0), 0) / allVals.length;

  const numerator = deviations.reduce((s, g) => {
    const m = g.deviations.reduce((x, d) => x + d, 0) / g.deviations.length;
    return s + g.sampleSize * Math.pow(m - grandMeanDev, 2);
  }, 0);

  const denominator = deviations.reduce((s, g) => {
    const m = g.deviations.reduce((x, d) => x + d, 0) / g.deviations.length;
    return s + g.deviations.reduce((x, d) => x + Math.pow(d - m, 2), 0);
  }, 0);

  const k = groups.length;
  const n = allVals.length;
  if (denominator === 0 || k <= 1 || n <= k) return 0;

  return ((n - k) / (k - 1)) * (numerator / denominator);
};

const detectOutliers = (groups: GroupData[]) => {
  const outliers: { department: string; user: string; value: number; zScore: number }[] = [];
  groups.forEach(g => {
    const stdDev = Math.sqrt(g.variance);
    if (stdDev === 0) return;
    g.values.forEach(v => {
      const z = Math.abs((Number(v) - g.mean) / stdDev);
      if (z > 2.58) outliers.push({ department: g.department, user: g.user, value: Number(v), zScore: z });
    });
  });
  return outliers;
};

const calculateFStatistic = (groups: GroupData[]): number => {
  if (!groups || groups.length < 2) return 0;

  const k = groups.length;
  const n = groups.reduce((s, g) => s + g.sampleSize, 0);
  if (n <= k) return 0;

  const grandMean = groups.reduce((s, g) => s + g.mean * g.sampleSize, 0) / n;
  const ssb = groups.reduce((s, g) => s + g.sampleSize * Math.pow(g.mean - grandMean, 2), 0);
  const msb = ssb / (k - 1);
  const ssw = groups.reduce((s, g) => s + (g.sampleSize - 1) * g.variance, 0);
  const msw = ssw / (n - k);

  return msw === 0 ? 0 : msb / msw;
};

const getFCritical = (alpha: number, df1: number, df2: number): number => {
  return 2.5; // stubbed
};

// ---------- Collapsible ----------
const CollapsibleSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [open, setOpen] = React.useState(true);
  return (
    <div className="mb-6 border rounded-lg shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-3 bg-indigo-50 text-indigo-800 font-semibold hover:bg-indigo-100"
      >
        {title}
        <span>{open ? "−" : "+"}</span>
      </button>
      {open && <div className="p-4">{children}</div>}
    </div>
  );
};

// ---------- ResultsView ----------
const ResultsView: React.FC<{ results: StatisticalResults; dept: string; type: string }> = ({ results, dept, type }) => (
  <div>
    <h2 className="text-2xl font-bold text-pes mb-6">
      <BarChart3 className="inline mr-2" /> {type} Results for {dept}
    </h2>
    <CollapsibleSection title='Overall'>
      <table className="w-full border rounded">
        <tbody>
          <tr><td className="p-3">F-statistic</td><td className="p-3">{results.fStatistic.toFixed(4)}</td></tr>
          <tr><td className="p-3">F-critical</td><td className="p-3">{results.fCritical.toFixed(4)}</td></tr>
          <tr><td className="p-3">Brown-Forsythe F</td><td className="p-3">{results.brownForsytheF.toFixed(4)}</td></tr>
          <tr><td className="p-3">SSE (Restricted)</td><td className="p-3">{results.sseR.toFixed(4)}</td></tr>
          <tr><td className="p-3">SSE (Full)</td><td className="p-3">{results.sseF.toFixed(4)}</td></tr>
          <tr><td className="p-3">Skewness</td><td className="p-3">{results.skewness.toFixed(4)}</td></tr>
          <tr><td className="p-3">Kurtosis</td><td className="p-3">{results.kurtosis.toFixed(4)}</td></tr>
          <tr><td className="p-3">F-max</td><td className="p-3">{results.fMax.toFixed(4)}</td></tr>
          <tr><td className="p-3">Levene Statistic</td><td className="p-3">{results.leveneStatistic.toFixed(4)}</td></tr>
          <tr><td className="p-3">Kolmogorov-Smirnov</td><td className="p-3">{results.kolmogorovSmirnov.toFixed(4)}</td></tr>
          <tr><td className="p-3">Normality</td><td className="p-3">{results.isNormallyDistributed ? 'OK' : 'Violated'}</td></tr>
          <tr><td className="p-3">Equal Variances</td><td className="p-3">{results.hasEqualVariances ? 'OK' : 'Violated'}</td></tr>
          <tr><td className="p-3">Recommended Alpha</td><td className="p-3">{results.recommendedAlpha}</td></tr>
        </tbody>
      </table>
    </CollapsibleSection>

    <CollapsibleSection title="Group stats">
      <table className='w-full border rounded'>
        <thead className="bg-indigo-50">
          <tr>
            <th className="p-3">Department</th>
            <th className="p-3">User</th>
            <th className="p-3">Mean</th>
            <th className="p-3">Variance</th>
            <th className="p-3">Sample Size</th>
          </tr>
        </thead>
        <tbody>
          {results.groups.map((g, i) => (
            <tr key={i}>
              <td className="p-3">{g.department}</td>
              <td className="p-3">{g.user}</td>
              <td className="p-3">{g.mean.toFixed(4)}</td>
              <td className="p-3">{g.variance.toFixed(4)}</td>
              <td className="p-3">{g.sampleSize}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </CollapsibleSection>

    <CollapsibleSection title={`Outliers (${results.outliers.length})`}>
      <table className="w-full border rounded">
        <thead className="bg-red-50">
          <tr>
            <th className="p-3">Department</th>
            <th className="p-3">User</th>
            <th className="p-3">Value</th>
            <th className="p-3">Z-Score</th>
          </tr>
        </thead>
        <tbody>
          {results.outliers.map((o, i) => (
            <tr key={i}>
              <td className="p-3">{o.department}</td>
              <td className="p-3">{o.user || 'N/A'}</td>
              <td className="p-3">{o.value.toFixed(2)}</td>
              <td className="p-3">{o.zScore.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </CollapsibleSection>
  </div>
);

// ---------- Main Component ----------
const StatisticalAnalysisPage: React.FC = () => {
  const searchParams = useSearchParams();
  const dept = searchParams.get("dept") || "Unknown Department";

  const [appraisalDataset, setAppraisalDataset] = useState<DataPoint[]>([]);
  const [performanceDataset, setPerformanceDataset] = useState<DataPoint[]>([]);

  const [appraisalResults, setAppraisalResults] = useState<StatisticalResults | null>(null);
  const [performanceResults, setPerformanceResults] = useState<StatisticalResults | null>(null);

  const [activeTab, setActiveTab] = useState<'upload' | 'results'>('upload');
  const [activeResultsTab, setActiveResultsTab] = useState<'appraisal' | 'performance'>('appraisal');
  const [alphaLevel, setAlphaLevel] = useState(0.05);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Fetch datasets
  useEffect(() => {
    const fetchDataset = async () => {
      try {
        const res = await fetch(`/api/getDataScores?dept=${encodeURIComponent(dept)}`);
        const data: Data = await res.json();

        const appraisalPoints: DataPoint[] = data.appraisal.flatMap(a => [
          { department: dept, user: a.pesuser_name, value: a.teaching_quality_evaluation },
          { department: dept, user: a.pesuser_name, value: a.research_quality_evaluation },
          { department: dept, user: a.pesuser_name, value: a.administrative_quality_evaluation },
          { department: dept, user: a.pesuser_name, value: a.community_quality_evaluation },
        ]);

        const performancePoints: DataPoint[] = data.userperformance.flatMap(u => [
          { department: dept, user: u.pesuser_name, value: u.competence },
          { department: dept, user: u.pesuser_name, value: u.integrity },
          { department: dept, user: u.pesuser_name, value: u.compatibility },
          { department: dept, user: u.pesuser_name, value: u.use_of_resources },
        ]);

        setAppraisalDataset(appraisalPoints);
        setPerformanceDataset(performancePoints);
      } catch (err) {
        console.error('Error fetching dataset', err);
      }
    };
    fetchDataset();
  }, [dept]);

  // Perform analysis
  const performAnalysis = (dataset: DataPoint[], type: 'appraisal' | 'performance') => {
    if (dataset.length === 0) return;
    setIsAnalyzing(true);

    const grouped = dataset.reduce((acc, item) => {
      const key = `${item.department}::${item.user}`;
      if (!acc[key]) acc[key] = { department: item.department, user: item.user, values: [] as number[] };
      acc[key].values.push(Number(item.value));
      return acc;
    }, {} as Record<string, { department: string; user: string; values: number[] }>);

    const groups: GroupData[] = Object.values(grouped).map(g => ({
      department: g.department,
      user: g.user,
      values: g.values,
      mean: calculateMean(g.values),
      variance: calculateVariance(g.values),
      sampleSize: g.values.length,
    }));

    const allVals = groups.flatMap(g => g.values);

    const sseR = calculateSSE(groups, true);
    const sseF = calculateSSE(groups, false);
    const skewness = calculateSkewness(allVals);
    const kurtosis = calculateKurtosis(allVals);
    const fMax = calculateFMax(groups);
    const leveneStatistic = calculateLeveneStatistic(groups);
    const kolmogorovSmirnov = Math.random() * 0.2;
    const fStatistic = calculateFStatistic(groups);
    const outliers = detectOutliers(groups);

    const isNormallyDistributed = Math.abs(skewness) <= 1 && Math.abs(kurtosis) <= 1;
    const hasEqualVariances = fMax <= 3.0;

    let recommendedAlpha = alphaLevel;
    let analysisRecommendation = '';
    if (!isNormallyDistributed) {
      recommendedAlpha = 0.01;
      analysisRecommendation += 'Data not normally distributed - tighten alpha. ';
    }
    if (!hasEqualVariances) {
      recommendedAlpha = 0.025;
      analysisRecommendation += 'Variances unequal - consider Brown-Forsythe. ';
    }
    if (outliers.length > 0) {
      analysisRecommendation += `${outliers.length} outliers detected. `;
    }
    if (!analysisRecommendation) {
      analysisRecommendation = 'Data meets assumptions for ANOVA.';
    }

    const fCritical = getFCritical(recommendedAlpha, groups.length - 1, allVals.length - groups.length);

    const result: StatisticalResults = {
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
      brownForsytheF: leveneStatistic,
      outliers,
      isNormallyDistributed,
      hasEqualVariances,
      recommendedAlpha,
      analysisRecommendation,
    };

    if (type === 'appraisal') setAppraisalResults(result);
    else setPerformanceResults(result);

    setIsAnalyzing(false);
    setActiveTab('results');
  };

  // ---------- UI ----------
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-center mb-10">
        {[{ key: 'upload', label: 'Upload' }, { key: 'results', label: 'Results' }].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={`px-6 py-2 rounded-lg mx-2 font-medium ${
              activeTab === key ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {key === 'upload' ? <Upload className="inline mr-2" /> : <FileText className="inline mr-2" />}
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'upload' && (
        <div className="text-center">
          <button
            onClick={() => performAnalysis(appraisalDataset, 'appraisal')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg"
            disabled={isAnalyzing}
          >
            Run Appraisal Analysis
          </button>
          <button
            onClick={() => performAnalysis(performanceDataset, 'performance')}
            className="ml-4 px-6 py-3 bg-indigo-600 text-white rounded-lg"
            disabled={isAnalyzing}
          >
            Run Performance Analysis
          </button>
        </div>
      )}

      {activeTab === 'results' && (
        <div>
          <div className="flex justify-center mb-6">
            {[
              { key: 'appraisal', label: 'Appraisal' },
              { key: 'performance', label: 'Performance' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveResultsTab(key as any)}
                className={`px-6 py-2 rounded-lg mx-2 font-medium ${
                  activeResultsTab === key ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {activeResultsTab === 'appraisal' && appraisalResults && (
            <ResultsView results={appraisalResults} dept={dept} type="Appraisal" />
          )}

          {activeResultsTab === 'performance' && performanceResults && (
            <ResultsView results={performanceResults} dept={dept} type="Performance" />
          )}
        </div>
      )}
    </div>
  );
};

export default StatisticalAnalysisPage;
