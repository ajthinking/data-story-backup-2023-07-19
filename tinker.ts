import { Sleep } from "./core/computers/Sleep"
import { Item } from "./core/Item";
import { sleep } from "./core/utils/sleep";

export {}

async function* myAsyncGenerator() {
  try {
    await sleep(1000)
    yield 'First value';
    await sleep(1000)
    yield 'Second value';
    await sleep(1000)
    throw new Error('An error occurred in the async generator');
  } catch (error) {
    throw error
  }
}

(async () => {  
  const promise = new Promise((resolve, reject) => {
    throw new Error('Some error without a handler😱')
  });

  await sleep(1000)

  promise.catch((error: Error) => {
    console.log("Got ya! Bye!")
  });

  console.log("HOHOH")

})()