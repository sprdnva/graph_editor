import actionTypes from "../actionTypes/diagramActionTypes";

const initialState = {
  exportRes: "",
  model: {
    nodeDataArray: [],
    linkDataArray: []
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.EXPORT_DIAGRAM:
      return { ...state, exportRes: payload };
    case actionTypes.ADD_NODE:
      return { ...state, model: payload };
    default:
      return { ...state };
  }
};
