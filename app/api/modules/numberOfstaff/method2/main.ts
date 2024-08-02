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
 