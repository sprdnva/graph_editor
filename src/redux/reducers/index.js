import { combineReducers } from "redux";

import nodes from "./nodesReducer";
import diagram from "./diagramReducer";

export default combineReducers({
  nodes,
  diagram
});
