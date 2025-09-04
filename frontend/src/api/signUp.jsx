import apiClient from "./apiClient";

export const signUp = async (formData) => {
  const res = await apiClient.post("/users", formData);
  return res.data;
};
