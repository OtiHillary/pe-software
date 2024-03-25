// 'use client'
import Dashboard from "./content";

type performance_type = {
  id: number
  name: number
  dept: string
  type: string
  yield: string
}

async function getData(){
  let res =  await fetch('http://localhost:3000/api/getUserData')
  let data =  res.json()

  return data
}

export default async function Home() {
  let performance: performance_type = await getData()
  return <Dashboard performance = { performance }/>
}
