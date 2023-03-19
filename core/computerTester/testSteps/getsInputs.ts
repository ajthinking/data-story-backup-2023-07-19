import { InputDeviceFactory } from "../../InputDeviceFactory";
import { Item } from "../../Item";
import { Link } from "../../Link";
import { ComputerTester } from "../ComputerTester";
import { TestStep } from "../TestStep";

export const getsInputs: TestStep = {
  async handle(tester: ComputerTester, inputs: { [key: string]: Item[]}) {
    const portNames = Object.keys(inputs)

    for(const portName of portNames) {
      const port = tester.node!.inputs.find(p => p.name === portName)
      const link = tester.diagram!.linksConnectedToPortId(port!.id)[0]

      tester.inputDevice!.setItemsAt('input', link.id, inputs[portName])
    }
  }
}