import uuidv4 from "uuid/v4";

export default ({ nodeDataArray: nodes, linkDataArray: links }) => {
  const layers = nodes.map(node => {
    const inputs = [];
    links.forEach((link, index) => {
      if (Object.entries(link)[1][1] === node.key) {
        inputs[index] = Object.entries(link)[0][1];
      }
    });
    const input_shape = inputs.length ? {} : { input_shape: [] };
    return {
      name: `${node.key}`,
      type: `${node.type}`,
      inputs: inputs,
      params: {
        ...input_shape
      }
    };
  });
  console.log({
    date_created: new Date().toISOString(),
    id: uuidv4(),
    name: "myModel_1",
    layers: layers
  });
  return {
    date_created: new Date().toISOString(),
    id: uuidv4(),
    name: "myModel_1",
    layers: layers
  };
};
