import { promises as fs } from 'fs'

export {}

(async () => {
  const r = await fs.mkdir(__dirname + '/ahaalrighty');

  console.log({
    t: typeof r,
    r,
  })
})();