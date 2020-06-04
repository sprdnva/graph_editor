import actionTypes from '../actionTypes/diagramActionTypes';

const initialState = {
  exportRes: '',
  model: {
    nodeDataArray: [],
    linkDataArray: [],
  },
  exportQueryParams: [],
  exportError: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.EXPORT_DIAGRAM:
      return { ...state, exportRes: payload };
    case actionTypes.ADD_NODE:
      return { ...state, model: payload };
    case actionTypes.IMPORT_DIAGRAM:
    case actionTypes.IMPORT_DIAGRAM_FROM_URL:
      return { ...state, model: payload };
    case actionTypes.SHARE_DIAGRAM:
      return { ...state, sharableLink: payload };
    case actionTypes.GET_EXPORT_PARAMETERS:
      return { ...state, exportQueryParams: [...payload] };
    case actionTypes.EXPORT_DIAGRAM_FAIL:
      return { ...state, exportError: payload };
    case actionTypes.RESET_EXPORT_ERROR:
      return { ...state, exportError: '' };
    case actionTypes.EXPORT_DIAGRAM_JSON:
    default:
      return { ...state };
  }
};
