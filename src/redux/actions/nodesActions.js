import actionTypes from "../actionTypes/nodesActionTypes";
import { fetchNodeTypes } from "../../services";

export const getNodeTypes = () => async dispatch => {
  let payload;
  try {
    const { data } = await fetchNodeTypes();
    payload = data;
  } catch (error) {
    console.log(error);
  }
  dispatch({
    type: actionTypes.GET_NODE_TYPES,
    payload
  });
};
