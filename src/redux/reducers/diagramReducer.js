import actionTypes from '../actionTypes/diagramActionTypes';
import { shareDiagram } from '../actions/diagramActions';

const initialState = {
  exportRes: '',
  model: {
    nodeDataArray: [],
    linkDataArray: [],
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.EXPORT_DIAGRAM:
      return { ...state, exportRes: payload };
    case actionTypes.ADD_NODE:
      return { ...state, model: payload };
    case actionTypes.IMPORT_DIAGRAM:
      return { ...state, model: payload };
    case actionTypes.SHARE_DIAGRAM:
      return { ...state, sharableLink: payload };
    case actionTypes.EXPORT_DIAGRAM_JSON:
    default:
      return { ...state };
  }
};
