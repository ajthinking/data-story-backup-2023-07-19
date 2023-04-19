import { promises as fs } from 'fs'

export const open = async () => {
  return {
    type: 'OpenResponse',
    flow: JSON.parse(
      (await fs.readFile(__dirname + '/../../.datastory/demo.story.json')).toString()
    ),
    stringify() {
      return JSON.stringify(this)
    }
  }
}