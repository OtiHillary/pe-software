import { NextApiRequest, NextApiResponse } from 'next'
// type sessionID = string

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body
  let sID = Math.floor(Math.random())
  let go = 0

  if (/*USER IN DATABASE*/go) {
    // req.session.sID = sID;
    res.status(200).json({ message: 'Login successful!' })
  } else {
    res.status(401).json({ message: 'Invalid credentials' })
  }
}
