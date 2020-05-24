export const json = {
  date_created: '2020-04-05T16:01:14.917Z',
  id: 'b3adea47-3d20-4e6f-9d79-a75a8c9e9d1c',
  name: 'myModel_1',
  layers: [
    {
      name: 'node0',
      type: 'Input',
      inputs: [],
      params: {
        shape: [4],
      },
    },
    {
      name: 'node1',
      type: 'BatchNormalization',
      inputs: ['node0'],
      params: {},
    },
    {
      name: 'node2',
      type: 'Flatten',
      inputs: ['node1'],
      params: {},
    },
  ],
};

export const imp = (json) => {
  const linkDataArray = [];
  const nodeDataArray = [];
  json.layers.map(({ name, type, inputs, params }) => {
    for (let i = 0; i < inputs.length; i++) {
      linkDataArray.push({ from: inputs[i], to: name });
    }
    nodeDataArray.push({ key: name, label: name, color: 'blue', type, params });
  });
  console.log(linkDataArray);
  console.log(nodeDataArray);

  const model = { nodeDataArray, linkDataArray };
  return model;
};
