import axios from "axios";

export const fetchNodeTypes = async () => {
  const res = await axios.get(
    "https://nnio-project.herokuapp.com/admin/layers_schemas"
  );
  console.log(res);
  return res;
};

export const exportDiagram = async body => {
  const res = await axios.post(
    "https://nnio-project.herokuapp.com/architecture/export-from-json-body?framework=keras",
    body
  );
  console.log(res);
  return res;
};
