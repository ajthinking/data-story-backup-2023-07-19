import { Diagram } from "./Diagram"
import { Link } from "./Link"
import { Node } from "./Node"
import { Port } from "./Port"

/*
{
  "nodes": [
    {
      "width": 128,
      "height": 52,
      "id": "Signal0.7993711459744541",
      "position": {
        "x": 101.2618246308146,
        "y": 202.66893570290534
      },
      "data": {
        "computer": "Signal",
        "label": "Signal",
        "inputs": [],
        "outputs": [
          {
            "id": "Signal0.7993711459744541-undefined"
          }
        ]
      },
      "type": "transformer",
      "selected": false,
      "positionAbsolute": {
        "x": 101.2618246308146,
        "y": 202.66893570290534
      },
      "dragging": false
    },
    {
      "width": 128,
      "height": 78,
      "id": "Pass0.0906613692536935",
      "position": {
        "x": 373.1397321248163,
        "y": 201.0105657225256
      },
      "data": {
        "computer": "Pass",
        "label": "Pass",
        "inputs": [
          {
            "id": "Pass0.0906613692536935-undefined"
          }
        ],
        "outputs": [
          {
            "id": "Pass0.0906613692536935-undefined"
          }
        ]
      },
      "type": "transformer",
      "selected": true,
      "positionAbsolute": {
        "x": 373.1397321248163,
        "y": 201.0105657225256
      },
      "dragging": false
    }
  ],
  "edges": [
    {
      "source": "Signal0.7993711459744541",
      "sourceHandle": "Signal0.7993711459744541-undefined",
      "target": "Pass0.0906613692536935",
      "targetHandle": "Pass0.0906613692536935-undefined",
      "id": "reactflow__edge-Signal0.7993711459744541Signal0.7993711459744541-undefined-Pass0.0906613692536935Pass0.0906613692536935-undefined"
    }
  ],
  "viewport": {
    "x": 0,
    "y": 0,
    "zoom": 1
  }
}
*/

export class DiagramFactory {
  fromReactFlow(flow: any): Diagram {    
    const nodes = flow.nodes.map((flowNode: any) => {
      return new Node({
        id: flowNode.id,
        type: flowNode.data.computer,
        inputs: flowNode.data.inputs.map((input: any) => {
          return new Port(input.id, input.id)
        }),
        outputs: flowNode.data.outputs.map((output: any) => {
          return new Port(output.id, output.id)
        }),     
      })
    })

    const links = flow.edges.map((edge: any) => {
      return new Link(edge.id, edge.sourceHandle, edge.targetHandle)
    })

    console.log(JSON.stringify(flow, null, 2))
    console.log(JSON.stringify({
      nodes, links
    }, null, 2))

    return new Diagram(nodes, links)
  }
}


/*
{
  "nodes": [
    {
      "width": 128,
      "height": 52,
      "id": "Signal.1",
      "position": {
        "x": 67.5560748737305,
        "y": 248.93504056462456
      },
      "data": {
        "computer": "Signal",
        "label": "Signal",
        "inputs": [],
        "outputs": [
          {
            "id": "Signal.1.output",
            "name": "output"
          }
        ]
      },
      "type": "transformer",
      "selected": false,
      "positionAbsolute": {
        "x": 67.5560748737305,
        "y": 248.93504056462456
      },
      "dragging": false
    },
    {
      "width": 128,
      "height": 78,
      "id": "Pass.1",
      "position": {
        "x": 384.1340435091612,
        "y": 302.8164684536807
      },
      "data": {
        "computer": "Pass",
        "label": "Pass",
        "inputs": [
          {
            "id": "Pass.1.input",
            "name": "input"
          }
        ],
        "outputs": [
          {
            "id": "Pass.1.output",
            "name": "output"
          }
        ]
      },
      "type": "transformer",
      "selected": true,
      "positionAbsolute": {
        "x": 384.1340435091612,
        "y": 302.8164684536807
      },
      "dragging": false
    }
  ],
  "edges": [
    {
      "source": "Signal.1",
      "sourceHandle": "Signal.1.output",
      "target": "Pass.1",
      "targetHandle": "Pass.1.input",
      "id": "reactflow__edge-Signal.1Signal.1.output-Pass.1Pass.1.input"
    }
  ],
  "viewport": {
    "x": 0,
    "y": 0,
    "zoom": 1
  }
}
{
  "nodes": [
    {
      "id": "Signal.1",
      "type": "Signal",
      "inputs": [],
      "outputs": [
        {
          "id": "Signal.1.output",
          "name": "Signal.1.output"
        }
      ]
    },
    {
      "id": "Pass.1",
      "type": "Pass",
      "inputs": [
        {
          "id": "Pass.1.input",
          "name": "Pass.1.input"
        }
      ],
      "outputs": [
        {
          "id": "Pass.1.output",
          "name": "Pass.1.output"
        }
      ]
    }
  ],
  "links": [
    {
      "id": "reactflow__edge-Signal.1Signal.1.output-Pass.1Pass.1.input",
      "sourcePortId": "Signal.1.output",
      "targetPortId": "Pass.1.input"
    }
  ]
}
*/