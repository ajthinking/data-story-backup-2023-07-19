// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

export default function handler(
  req: NextApiRequest & {query: {endpoint: string[]}},
  res: NextApiResponse<any>
) {

  const path = `${__dirname}/../../../../../.datastory/executions/${req.query.endpoint!.join('/')}`
  const content = fs.readFileSync(path, 'utf-8')
  const data = JSON.parse(content)

  res.status(200).json(data)
}
