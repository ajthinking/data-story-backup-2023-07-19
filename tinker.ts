import { Sleep } from "./core/computers/Sleep"

export {}

(async () => {
  const o = {
    a() {},
  }

  const s1 = structuredClone(o)
  const s2 = structuredClone(o)

  console.log({ s1, s2})
})()