import axios from "axios";

const API_URL = "http://localhost:8088/api/v1";

export const loginAPI = async (nickName, password) => {
  try {
    const res = await axios.post(
      `${API_URL}/login`,
      { nickName, password },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    // ném lỗi ra cho component xử lý
    throw error;
  }
};
