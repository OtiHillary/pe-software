const hrs = {
   frontend:[ 20, 300, 100, 10, 500 ],
   backend:[ 530, 10, 500, 5 ],
   design:[ 400, 200, 10],
}

// ---------------------------------------------------------------------------------
/*
   TYPES AND INTERFACES
*/
// ----------------------------------------------
interface SsrFObject {
   ssr: number;
   sse: number;
}
interface SkewKurtObject {
   skewness: number;
   kurtosis: number;
}
interface RegressionObject {
   slope: number;
   intercept: number;
}
// ----------------------------------------------
/*
   DATA FITING STATISTICAL MODELS
*/
// ---------------------------------------------------------------------------------

//SSE(R) / SSE(f) Comparison
function calculateSsrF(numbers: number[], df: number): SsrFObject {
   const n = numbers.length;
   const yBar = numbers.reduce((sum, num) => sum + num, 0) / n;
   const yHat = numbers.map((num) => yBar);
   const ssr = yHat.reduce((sum, yHatVal, i) => sum + (yHatVal - yBar) ** 2, 0);
   const sse = numbers.reduce((sum, num, i) => sum + (num - yHat[i]) ** 2, 0);

   return { ssr: ssr / df, sse: sse / (n - df) };
}


//Skewness and Kurtosis
function calculateSkewKurt(data: number[]): SkewKurtObject {
   const n = data.length;
   const mean = data.reduce((sum, num) => sum + num, 0) / n;
   const variance = data.reduce((sum, num) => sum + (num - mean) ** 2, 0) / (n - 1);
   const stdDev = Math.sqrt(variance);
   const skewness = data.reduce((sum, num) => sum + ((num - mean) / stdDev) ** 3, 0) * (n / ((n - 1) * (n - 2)));
   const kurtosis = data.reduce((sum, num) => sum + ((num - mean) / stdDev) ** 4, 0) * ((n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3))) - ((3 * (n - 1) ** 2) / ((n - 2) * (n - 3)));

   return { skewness, kurtosis };
}


//Linear regression
function linearRegression(data: [number, number][] ): RegressionObject {
   const n = data.length;
   let xSum = 0;
   let ySum = 0;
   let xySum = 0;
   let xSquaredSum = 0;

   for (let i = 0; i < n; i++) {
       const [x, y]: [number, number] = data[i];
       xSum += x;
       ySum += y;
       xySum += x * y;
       xSquaredSum += x * x;
   }

   const slope = (n * xySum - xSum * ySum) / (n * xSquaredSum - xSum * xSum);
   const intercept = (ySum - slope * xSum) / n;

   return { slope, intercept };
}

// ---------------------------------------------------------------------------------
/*
   EVALUATION / PREDICTIVE MODELS
*/
// ---------------------------------------------------------------------------------

//Personnel utilization index
function util_index(hours_used: number, hours_given: number) {
   return hours_used / hours_given;
}

//PERESONNEL REDUNDANCY INDEX
function redu_index(hours_used: number, hours_given: number) {
   return 1 - util_index( hours_used, hours_given );
}

//PERESONNEL PROUCTIVITY INDEX
function prod_index(resrc_input: number, resrc_output: number) {
   return resrc_output / resrc_input;
}

// Determine number of in rganization for non-academic staff 
// METHOD 1 <PLAIN ESTIMATING>
//Basic time
function basic_time(time:number, rate: number) {
   return time * (rate / 100);
}
// Standard time
function std_time(time:number, rate: number, relax_time: number, ctgc_time: number) {
   return basic_time(time, rate) + relax_time + ctgc_time;
}
//Standard man-hours
function std_hrs(hours: number, no_wrks: number) {
   return hours * no_wrks;
}
//Total Standard man-hours
function T_std_hrs(annual_fx:number, hours: number, no_wrks: number) {
   return annual_fx * std_hrs(hours, no_wrks);
}
//Grand Total available man-hours
function T_man_hrs() {
   let total = 0
   return total;
}

// ---------------------------------------------------------------------------------

export {
   linearRegression,
   calculateSkewKurt,
   calculateSsrF,
}