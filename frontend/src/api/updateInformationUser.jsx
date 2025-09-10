import apiClient from "./apiClient";
export const updateInformationUser = async (
  id,
  email,
  fullName,
  password,
  nickName
) => {
  try {
    const res = await apiClient.put(`/users/${id}`, {
      email,
      fullName,
      password,
      nickName,
    });
    return { success: true, data: res.data };
  } catch (err) {
    console.error("Update error:", err.response?.data || err.message);
    return {
      success: false,
      message: err.response?.data?.message || "Update failed",
    };
  }
};
