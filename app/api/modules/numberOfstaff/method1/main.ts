// METHOD 1 <PLAIN ESTIMATING>
// ---------------------------
//Basic time

function basic_time(time:number, rate: number) {
    return time * (rate / 100);
 }
 // Standard time
 function std_time(time:number, rate: number, relax_time: number, ctgc_time: number) {
    return basic_time(time, rate) + relax_time + ctgc_time // (5-10%) of relaxation time;
 }