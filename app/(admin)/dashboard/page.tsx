// 'use client'
import Dashboard from "./content";

async function getData(){
  let res =  await fetch('http://localhost:3000/api/getUserData')
  let data =  res.json()

  // console.log(data)
  return data
}

export default async function Home() {
  let performance = await getData()

  return <Dashboard performance = { performance } />
}
