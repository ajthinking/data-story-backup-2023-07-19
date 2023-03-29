const scalar = {
  id: "Scalar.1",
  position: { x: 100, y: 100 },
  data: {
    computer: 'Scalar',
    label: "HubSpot Contacts",
    inputs: [],
    outputs: [
      {
        id: "Scalar.1.output",
        name: "output"
      },
    ],
  },
  type: "dataStoryNode"
}

const multiply = {
  id: "Multiply.1",
  position: { x: 300, y: 100 },
  data: {
    computer: 'Multiply',    
    label: "Georeference",
    inputs: [
      {
        id: "Multiply.1.input",
        name: "input"
      },
    ],
    outputs: [
      {
        id: "Multiply.1.output",
        name: "output"
      },
    ],
  },
  type: "dataStoryNode"  
}

const log = {
  id: "Log.1",
  position: { x: 500, y: 100 },
  data: {
    computer: 'Log',
    label: "Inspect",
    inputs: [
      {
        id: "Log.1.input",
        name: "input"
      },
    ],
    outputs: [],
  },
  type: "dataStoryNode"  
}

export const initialNodes = [
  scalar,
  multiply,
  log,
];