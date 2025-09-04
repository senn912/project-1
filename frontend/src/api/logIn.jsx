import apiClient from "./apiClient";

export const logIn = async (nickName, password) => {
  const res = await apiClient.post("/login", { nickName, password });
  return res.data;
};
