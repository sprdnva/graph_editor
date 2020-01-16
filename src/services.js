import axios from "axios";

export const fetchNodeTypes = async () => {
  const res = await axios.get(
    "https://nnio-project-dev.herokuapp.com/admin/layers_schemas"
  );
  console.log(res);
  return res;
};

export const exportDiagram = async body => {
  const res = await axios.post(
    "https://nnio-project-dev.herokuapp.com/architecture/export-from-json-body?framework=keras&keras_prefer_sequential=1&line_break=crlf&indent=spaces_8",
    body
  );
  console.log(res);
  return res;
};
