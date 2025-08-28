import axios from "axios";
export const logoutAPI = async () => {
  await axios.post(
    "http://localhost:8088/api/v1/logout",
    {},
    {
      withCredentials: true,
    }
  );
};
