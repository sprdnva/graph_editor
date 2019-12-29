import actionTypes from "../actionTypes/diagramActionTypes";
import { exportDiagram } from "../../services";
import createJson from "../../helpers/createJson";

export const exportArch = model => async dispatch => {
  const Json = createJson(model);
  console.log(Json);
  const { data } = await exportDiagram(JSON.stringify(Json));
  dispatch({
    type: actionTypes.EXPORT_DIAGRAM,
    payload: data
  });
};
