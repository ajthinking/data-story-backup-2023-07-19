export class OutputDevice {
  haveItemsAtInput(name: string) {}

  haveAllItemsAtInput(name: string) {}

  haveNoItemsAtInput(name: string) {}

  push(items: any[]) {
    return this.pushTo('output', items)
  }

  pushTo(name: string, items: any[]) {
    // ...
  }
}