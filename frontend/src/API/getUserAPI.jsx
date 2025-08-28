import axios from "axios";

export const getUserAPI = async (token) => {
  const res = await axios.get("http://localhost:8088/api/v1/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return res.data;
};
