import uuidv4 from 'uuid/v4';

export default ({ nodeDataArray: nodes, linkDataArray: links }) => {
  const layers = nodes.map((node) => {
    const inputs = [];

    for (let link of links) {
      if (Object.entries(link)[1][1] === node.key) {
        inputs.push(Object.entries(link)[0][1]);
      }
    }

    return {
      name: `${node.label}`,
      type: `${node.type}`,
      inputs: inputs,
      params: {
        ...node.params,
      },
    };
  });

  return {
    date_created: new Date().toISOString(),
    id: uuidv4(),
    name: 'myModel_1',
    layers: layers,
  };
};
