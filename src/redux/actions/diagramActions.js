import actionTypes from '../actionTypes/diagramActionTypes';
import {
  exportDiagram,
  getSharableId,
  getDiagramFromUrl,
  getExportParams,
} from '../../services';
import createJson from '../../helpers/createJson';
import { json, imp } from '../../helpers/importJson';

export const exportArchPy = (model) => async (dispatch) => {
  const json = createJson(model);
  console.log(json);
  const { data } = await exportDiagram(JSON.stringify(json));
  console.log('data', data);
  const blob = new Blob([data], { type: 'text/plain' });
  dispatch({
    type: actionTypes.EXPORT_DIAGRAM_PYTHON,
    payload: data,
  });
  return blob;
};

export const getExportQueryParams = () => async (dispatch) => {
  const data = await getExportParams();
  console.log(data);
  if (!data) {
    dispatch({
      type: actionTypes.GET_EXPORT_PARAMETERS,
      payload: data,
    });
  }
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
  console.log(data.data);
  const sharableLink = `https://nnio-project-dev.herokuapp.com/sharing/load?arch_id=${data}`;
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
