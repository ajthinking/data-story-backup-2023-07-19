export const sampleDiagram = `{
  "nodes": [
    {
      "width": 90,
      "height": 52,
      "id": "Scalar.1",
      "position": {
        "x": 100,
        "y": 100
      },
      "data": {
        "computer": "Scalar",
        "label": "Scalar (1)",
        "inputs": [],
        "outputs": [
          {
            "id": "Scalar.1.output",
            "name": "output"
          }
        ]
      },
      "type": "dataStoryNode",
      "positionAbsolute": {
        "x": 100,
        "y": 100
      }
    },
    {
      "width": 119,
      "height": 78,
      "id": "Multiply.1",
      "position": {
        "x": 300,
        "y": 100
      },
      "data": {
        "computer": "Multiply",
        "label": "Multiply (* 2)",
        "inputs": [
          {
            "id": "Multiply.1.input",
            "name": "input"
          }
        ],
        "outputs": [
          {
            "id": "Multiply.1.output",
            "name": "output"
          }
        ]
      },
      "type": "dataStoryNode",
      "positionAbsolute": {
        "x": 300,
        "y": 100
      }
    },
    {
      "width": 69,
      "height": 52,
      "id": "Log.1",
      "position": {
        "x": 500,
        "y": 100
      },
      "data": {
        "computer": "Log",
        "label": "Log",
        "inputs": [
          {
            "id": "Log.1.input",
            "name": "input"
          }
        ],
        "outputs": []
      },
      "type": "dataStoryNode",
      "positionAbsolute": {
        "x": 500,
        "y": 100
      }
    }
  ],
  "edges": [
    {
      "id": "Scalar.1.output<--->Multiply.1.input",
      "source": "Scalar.1",
      "target": "Multiply.1",
      "sourceHandle": "Scalar.1.output",
      "targetHandle": "Multiply.1.input",
      "label": 582
    },
    {
      "id": "Multiply.1.output<--->Log.1.input",
      "source": "Multiply.1",
      "target": "Log.1",
      "sourceHandle": "Multiply.1.output",
      "targetHandle": "Log.1.input",
      "label": 464
    }
  ],
  "viewport": {
    "x": 0,
    "y": 0,
    "zoom": 1
  }
}`