import { InputDevice } from "./InputDevice";
import { InputDeviceInterface } from "./types/InputDeviceInterface";

/**
 * A specialized input device
 * Providing a link between parent and sub diagrams
 * An Input node may pull items from a parent diagram input device
 */
export class NestedInputDevice implements InputDeviceInterface {
  constructor(
    private inputDevice: InputDevice,
    private name: string,
  ) {}

  pull(count?: number) {
    return this.inputDevice.pullFrom(this.name, count)
  }

  pullFrom(name: string, count?: number) {
    return this.inputDevice.pullFrom(`${this.name}.${name}`, count)
  }

  haveItemsAtInput(name: string) {
    return this.inputDevice.haveItemsAtInput(`${this.name}.${name}`)
  }

  haveAllItemsAtAllInputs(): boolean {
    return true
  }

  haveAllItemsAtInput(name: string): boolean {
    return true
  }

  haveItemsAtAnyInput(): boolean {
    return true
  }

  setItemsAt(linkId: string, items: any[]) {
  }
}