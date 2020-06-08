import actionTypes from '../actionTypes/diagramActionTypes';
import {
  exportDiagram,
  getSharableId,
  getDiagramFromUrl,
  getExportParams,
} from '../../services';
import createJson from '../../lib/createJson';
import { json, imp } from '../../lib/importJson';

export const exportArchPy = (model, params) => async (dispatch) => {
  const json = createJson(model);
  console.log(json);
  try {
    const data = await exportDiagram(JSON.stringify(json), params);
    const blob = new Blob([data.data], { type: 'text/plain' });
    dispatch({
      type: actionTypes.EXPORT_DIAGRAM_PYTHON,
      payload: data,
    });
    return blob;
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: actionTypes.EXPORT_DIAGRAM_FAIL,
      payload: error.message,
    });
  }
};

export const getExportQueryParams = () => async (dispatch) => {
  const data = await getExportParams();
  dispatch({
    type: actionTypes.GET_EXPORT_PARAMETERS,
    payload: data,
  });
};

export const resetError = () => async (dispatch) => {
  dispatch({ type: actionTypes.RESET_EXPORT_ERROR });
};

export const exportArchJson = (model) => (dispatch) => {
  const json = createJson(model);
  const jsonExport = JSON.stringify(json);
  console.log('export json', json);
  const blob = new Blob([jsonExport], { type: 'application/json' });
  dispatch({
    type: actionTypes.EXPORT_DIAGRAM_JSON,
  });
  return blob;
};

export const shareDiagram = (model) => async (dispatch) => {
  const json = createJson(model);
  const { data } = await getSharableId(JSON.stringify(json));
  const sharableLink = `https://nnio-project.herokuapp.com/sharing/load?arch_id=${data}`;
  console.log(sharableLink);
  dispatch({
    type: actionTypes.SHARE_DIAGRAM,
    payload: sharableLink,
  });
};

export const importArch = (importModel) => async (dispatch) => {
  const model = imp(importModel);
  dispatch({
    type: actionTypes.IMPORT_DIAGRAM,
    payload: model,
  });
};

export const importArchFromUrl = (url) => async (dispatch) => {
  const { data } = await getDiagramFromUrl(url);
  const model = imp(data);
  dispatch({
    type: actionTypes.IMPORT_DIAGRAM_FROM_URL,
    payload: model,
  });
};

export const addNode = (model) => async (dispatch) => {
  dispatch({
    type: actionTypes.ADD_NODE,
    payload: model,
  });
};
