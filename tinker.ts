export {}

(async () => {
  // The async generator
  const computer = async function *run() {
    throw Error('Some error!')
  }

  // Initialize the generator
  const runner = computer()

  // Store reference to the promise
  const promise = runner.next()
    .then(() => {
      console.log("Handle success")
    })
    .catch((error: Error) => {
      console.log("Catch", error)
    });

  // Await Error Success
  await promise;
})();

(async () => {
  // The async generator
  const computer = async function *run() {
    throw Error('Some error!')
  }

  // Initialize the generator
  const runner = computer()

  // Store reference to the promise
  const promise = runner.next()

  promise.then(() => {
    console.log("Handle success")
  })

  promise.catch((error: Error) => {
    console.log("Catch", error)
  });

  // Await Error Success
  await promise;
})();