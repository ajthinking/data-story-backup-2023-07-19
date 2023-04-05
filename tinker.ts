import { Sleep } from "./core/computers/Sleep"
import { Item } from "./core/Item";

export {}

(async () => {
  let externalName = 'externalName'

  // TODO CONTINUE HERE USE THIS APROACH TO EXPOST METHODS LOOKING LIKE SIMPLE PROPERTIES!!! :D
  const cleverAccess = {
    get [externalName]() {
      return 'Haha Value!'
    }
  }

  console.log([
    cleverAccess.nonExisting, // Does not exist
    cleverAccess.externalName, // Does exists
  ])

})()