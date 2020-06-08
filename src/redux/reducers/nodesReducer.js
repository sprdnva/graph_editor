import actionTypes from '../actionTypes/nodesActionTypes';

const initialState = {
  nodeTypes: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.GET_NODE_TYPES:
      return { ...state, nodeTypes: payload };
    default:
      return state;
  }
};
