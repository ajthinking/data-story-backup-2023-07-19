export {}

(async () => {
  const o = [{
    value: {"a": "b"},
    params: {
      duration: 100
    }
  }]

  const [ { params: { duration }} ] = o

  console.log(duration)
})();