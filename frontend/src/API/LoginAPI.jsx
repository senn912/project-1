import axios from "axios";

export const loginAPI = async (nickName, password) => {
  const res = await axios.post(
    "http://localhost:8088/api/v1/login",
    { nickName, password },
    { withCredentials: true }
  );
  return res.data; 
};
