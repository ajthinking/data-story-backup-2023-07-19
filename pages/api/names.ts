// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.status(200).json([
    "Jack",
    "James",
    "Jared",
    "Jasmine",
    "Jason",
    "Jenna",
    "Jennifer",
    "Jenny",
    "Jesse",
    "Jessica",
    "Jill",
    "John",
    "Jordan",
    "Judy",
    "Julia",
    "Justin"
  ])
}
