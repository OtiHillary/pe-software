import { NextApiRequest, NextApiResponse } from 'next'

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  const { fullname, username, password } = req.body

  if (true) {
    res.status(200).json({ message: 'Login successful!' })
  } else {
    res.status(401).json({ message: 'Invalid credentials' })
  }
}