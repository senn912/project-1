import apiClient from "./apiClient";

export const getUser = async (token) => {
  const res = await apiClient.get("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
