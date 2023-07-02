import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from 'fs'

export default async function handler(
  req: NextApiRequest & {query: {endpoint: string[]}},
  res: NextApiResponse<any>
) {

  const path = `${__dirname}/../../../../.datastory/flows`

  const flowNames = await fs.readdir(path)

  const flows = await Promise.all(flowNames.map(async (flowName) => {
    const content = await fs.readFile(`${path}/${flowName}`, 'utf-8')
    const flow = JSON.parse(content)
    return {
      name: flowName,
      flow,
    }
  }))

  res.status(200).json(flows)
}
