// METHOD 2 <FACTORED ESTIMATING>
// ------------------------------
// Pearson's estimate

function c_factor(observed: number[], estimated: number[]){
    function sum(num1: number[], num2: number[]){
      let result = 0
       
      for(let i = 0; i < num1.length; i++){
         result += (num1[i]- num2[i])
      }
      return result
    }
 
   return ( sum( observed, estimated ) / observed.length )
} 
 
// Corrected estimate 
function c_estimate(observed: number[], estimated: number[], pearson: number){
   return pearson * ( 1 + c_factor(observed, estimated) )
}
 
// Basic time
function basic_time_FE( observed: number[], estimated: number[], pearson: number, rating_O: number){
   return c_estimate(observed, estimated, pearson) * (rating_O / 100)
}
 
//Standard time
function std_hours_FE( observed: number[], estimated: number[], pearson: number, rating_O: number, allowance: number ){
   return basic_time_FE(observed, estimated, pearson, rating_O) * ( 1 + (allowance / 100) )
}

// function std_man_hours(time:number, rate: number, relax_time: number, ctgc_time: number, num_workers: number, frequency: number){
//    return {
//       std_man_hours: std_time(time, rate, relax_time, ctgc_time) * num_workers,
//       total_std_man_hours: std_time(time, rate, relax_time, ctgc_time) * num_workers * frequency
//    }
// }
 