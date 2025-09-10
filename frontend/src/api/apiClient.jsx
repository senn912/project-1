import axios from "axios";
import { API_ROOT } from "../utils/constants/api";

const apiClient = axios.create({
  baseURL: API_ROOT,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default apiClient;
