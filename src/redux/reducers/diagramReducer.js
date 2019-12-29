import actionTypes from "../actionTypes/diagramActionTypes";

const initialState = {
  exportRes: ""
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.EXPORT_DIAGRAM:
      return { ...state, exportRes: payload };
    default:
      return { ...state };
  }
};
