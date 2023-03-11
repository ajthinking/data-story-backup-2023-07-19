const scalar = {
  id: "Scalar.1",
  position: { x: 100, y: 100 },
  data: {
    computer: 'Scalar',
    label: "Scalar (1)",
    inputs: [],
    outputs: [
      {
        id: "Scalar.1.output",
        name: "output"
      },
    ],
  },
  type: "transformer"
}

const multiply = {
  id: "Multiply.1",
  position: { x: 300, y: 100 },
  data: {
    computer: 'Multiply',    
    label: "Multiply (* 2)",
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
  type: "transformer"  
}

const log = {
  id: "Log.1",
  position: { x: 500, y: 100 },
  data: {
    computer: 'Log',
    label: "Log",
    inputs: [
      {
        id: "Log.1.input",
        name: "input"
      },
    ],
    outputs: [],
  },
  type: "transformer"  
}

export const initialNodes = [
  scalar,
  multiply,
  log,
];