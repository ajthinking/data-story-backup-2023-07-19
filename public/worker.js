// First attempt at a worker
// How to use TypeScript in a worker when using NextJS?
// How to make this work with other frameworks/setups?
// It seems workers must be served via the webserver
// Or, by using a blob 🤢
const describe = () => {
  const nodeDescriptions = Object.values([
    // How import nodes here????
  ]).map((computer) => { 
    const instance = computer()
    
    return {
      name: instance.name,
      label: instance.label,
      category: instance.category,
      inputs: instance.inputs || [],
      outputs: instance.outputs ||  [],
      params: instance.params || {},
      tags: instance.tags || [],
    }
  })

  return {
    type: 'describeResponse',
    availableNodes: nodeDescriptions,
    stringify() {
      return JSON.stringify(this)
    }
  }
}


self.addEventListener("message", (event) => {
  const parsed = JSON.parse(event.data);

  if (parsed.type === "describe") {
  
    const message = {
      type: "describeResponse",
      availableNodes: [],
    };
  
    self.postMessage(JSON.stringify(message));
  
    return;
  }

  if (parsed.type === "run") {
    // handle run message
    return;
  }

  throw new Error("Unknown message type: " + parsed.type);
});