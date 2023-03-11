type InputStatus = 'AWAITING' | 'COMPLETE' | 'EXHAUSTED'

export class InputDevice {
  // haveItemsAtInput(name: string): boolean {}

  // haveAllItemsAtInput(name: string): boolean {}

  // haveNoItemsAtInput(name: string): boolean {}

  /**
   * Shorthand to pull items at 'input'
   */
  pull(count?: number) {
    return this.pullFrom('input', count)
  }

  /**
   * Removes and return items at edges connected to input with name 
   */
  pullFrom(name: string, count?: number) {

  }

  statusAt(input: string) {

  }

  // ...
}