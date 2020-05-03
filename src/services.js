import axios from 'axios';

export const fetchNodeTypes = async () => {
  const res = await axios.get(
    'https://nnio-project-dev.herokuapp.com/admin/layers_schemas'
  );
  return res;
};

export const getExportParams = async () => {
  const response = await axios.get(
    'https://nnio-project-dev.herokuapp.com/openapi.json'
  );
  const res = await response.data.paths['/architecture/export-from-json-body']
    .post.parameters;
  return res;
};

export const exportDiagram = async (body) => {
  const res = await axios.post(
    'https://nnio-project-dev.herokuapp.com/architecture/export-from-json-body?framework=keras&keras_prefer_sequential=1&line_break=crlf&indent=spaces_8',
    body
  );
  return res;
};

export const getSharableId = async (body) => {
  const res = await axios.post(
    'https://nnio-project-dev.herokuapp.com/sharing/share',
    body
  );
  return res;
};

export const getDiagramFromUrl = async (url) => {
  const res = await axios.get(url);
  console.log(res);
  return res;
};
