import { SerializedReactFlow } from "../components/Workbench/SerializedReactFlow"
import { Diagram } from "./Diagram"
import { Link } from "./Link"
import { Node } from "./Node"
import { Port } from "./Port"

export class DiagramFactory {
  fromReactFlow(flow: SerializedReactFlow): Diagram {    
    const nodes = flow.nodes.map(flowNode => {
      return new Node({
        id: flowNode.id,
        type: flowNode.data.computer,
        inputs: flowNode.data.inputs.map(input => {
          // This should be passed in a property
          return new Port(input.id, input.id.split(".").pop()!)
        }),
        outputs: flowNode.data.outputs.map(output => {
          // This should be passed in a property
          return new Port(output.id, output.id.split(".").pop()!)
        }),
        // continue with PARAMS here!
        params: flowNode.data.params || {},   
      })
    })

    const links = flow.edges.map(edge => {
      return new Link(edge.id, edge.sourceHandle!, edge.targetHandle!)
    })

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
        "x": 355.29217094488496,
        "y": 226.10303220463445
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
      "type": "dataStoryNodeComponent",
      "positionAbsolute": {
        "x": 355.29217094488496,
        "y": 226.10303220463445
      }
    },
    {
      "width": 128,
      "height": 78,
      "id": "Pass.1",
      "position": {
        "x": 603.8344401401514,
        "y": 250.84269792454666
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
      "type": "dataStoryNodeComponent",
      "selected": true,
      "positionAbsolute": {
        "x": 603.8344401401514,
        "y": 250.84269792454666
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
      "id": "Signal.1.output--->Pass.1.input"
    }
  ],
  "viewport": {
    "x": -8.799999999999999,
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
      "id": "Signal.1.output--->Pass.1.input",
      "sourcePortId": "Signal.1.output",
      "targetPortId": "Pass.1.input"
    }
  ]
}
*/