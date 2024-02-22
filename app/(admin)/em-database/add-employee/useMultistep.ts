import { useState } from "react"

type formElement = {
   element: JSX.Element;
   title: string;
}

export function useMultistepForm( steps: formElement[] ){
   const [ stepIndex, setStepIndex ] = useState(0)

   function next(){
      setStepIndex( i => {
         if( i >= steps.length -1 ) return i
         return i + 1
      })
   }

   function back(){
      setStepIndex( i => {
         if( i <= 0 ) return i
         return i - 1
      })
   }

   function goTo(index: number){
      setStepIndex(index)
   }

   return{
      stepIndex,
      steps,
      step: steps[stepIndex],
      goTo,
      next,
      back
   }
}