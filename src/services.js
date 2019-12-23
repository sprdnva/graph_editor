import axios from "axios";

export const fetchNodeTypes = async () => {
  const res = await axios.get(
    "https://nnio-project.herokuapp.com/admin/layers_schemas"
  );
  console.log(res);
  return res;
};
