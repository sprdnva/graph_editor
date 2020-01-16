import actionTypes from "../actionTypes/diagramActionTypes";
import { exportDiagram } from "../../services";
import createJson from "../../helpers/createJson";

export const exportArch = model => async dispatch => {
  const Json = createJson(model);
  console.log(Json);
  const { data } = await exportDiagram(JSON.stringify(Json));
  console.log("data", data);
  const blob = new Blob([data], { type: "text/plain" });
  dispatch({
    type: actionTypes.EXPORT_DIAGRAM,
    payload: data
  });
  return blob;
};

export const addNode = model => async dispatch => {
  dispatch({
    type: actionTypes.ADD_NODE,
    payload: model
  });
};
