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
function red_index(hours_used: number, hours_given: number) {
   return 1 - util_index( hours_used, hours_given );
}

//PERESONNEL PROUCTIVITY INDEX
function prod_index(resrc_input: number, resrc_output: number) {
   return resrc_output / resrc_input;
}

// ---------------------------------------------------------------------------------

// STANDARD HOURS ARE CALCULATED THE SAME WAY REARDLESS OF APPROACH

// ---------------------------------------------------------------------------------
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

// Determine number of staff in Organization for non-academic staff 

// ---------------------------------------------------------------------------------

// METHOD 1 <PLAIN ESTIMATING>
// ---------------------------
//Basic time
function basic_time(time:number, rate: number) {
   return time * (rate / 100);
}
// Standard time
function std_time(time:number, rate: number, relax_time: number, ctgc_time: number) {
   return basic_time(time, rate) + relax_time + ctgc_time;
}

// METHOD 2 <FACTORED ESTIMATING>
// ------------------------------
// Pearson's estimate
function pearson(c_factor: number[], N: number){
   function sum(num : number[]){
      let result = 0
      let i
      for( i = 0; i<num.length; i++){
         result += num[i]
      }
      return result
   }

   return sum(c_factor) / N
} 

// Corrected estimate 
function c_estimate(c_factor: number[], N: number){
   return pearson(c_factor, N) *( 1 + pearson(c_factor, N) )
}

// Basic time
function basic_time_FE( c_factor: number[], N: number, rating_O: number, rating_N: number ){
   return c_estimate(c_factor, N) * (rating_O / rating_N)
}

//Standard time
function std_time_FE( c_factor: number[], N: number, rating_O: number, rating_N: number, allowance: number ){
   return basic_time_FE(c_factor, N, rating_O, rating_N) * ( 1 + (allowance / 100) )
}

// METHOD 3 <WORK SAMPLING APPROACH / WORK CONTENT APPROACH>
// ---------------------------------------------------------
// Preliminary numberof observations to determine study params
function P( time_found_busy: number, no_of_observations: number ){
   return time_found_busy / no_of_observations;
}



export {
   linearRegression,
   calculateSkewKurt,
   calculateSsrF,
}