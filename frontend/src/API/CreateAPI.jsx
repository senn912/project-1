import axios from "axios";

export const createAPI = async (formData) => {
  const res = await axios.post(
    "http://localhost:8088/api/v1/users", formData
  );
  return res.data;
};
