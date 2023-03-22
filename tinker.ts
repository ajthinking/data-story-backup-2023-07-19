import { Sleep } from "./core/computers/Sleep"

export {}

async function * g () {
  yield 1
  yield 2
  yield 3
  return 4
}

const generator = g();

(async () => {
  for await(const n of generator) {
    console.log(n) // why no 4 here??
  }

  console.log(generator.next())
  console.log(generator.next())
})()