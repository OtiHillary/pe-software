import Dashboard from "./content";

type performance_type = {
  id: number
  name: number
  dept: string
  type: string
  yield: string
}

export default async function Home() {
  return <Dashboard />
}
