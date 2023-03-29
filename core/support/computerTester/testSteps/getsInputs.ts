import { Item } from "../../../Item";
import { ComputerTester } from "../ComputerTester";
import { TestStep } from "../TestStep";

export const getsInputs: TestStep = {
  async handle(tester: ComputerTester, inputs: { [key: string]: Item[]}) {
    const portNames = Object.keys(inputs)

    for(const portName of portNames) {
      const port = tester.node!.inputs.find(p => p.name === portName)
      const link = tester.diagram!.linksConnectedToPortId(port!.id)[0]

      tester.inputDevice!.setItemsAt(portName, link.id, inputs[portName])
    }
  }
}