import apiClient from "./apiClient";

export const logOut = async () => {
  const res = await apiClient.post("/logout", {}); 
  return res.data;
};
