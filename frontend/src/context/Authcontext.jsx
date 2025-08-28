import { createContext, useContext, useState, useEffect } from "react";
import { loginAPI } from "~/API/loginAPI";
import { createAPI } from "~/API/createAPI";
import { logoutAPI } from "~/API/logoutAPI";
import { getUserAPI } from "~/API/getUserAPI";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUserAPI()
      .then((data) => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  const login = async (nickName, password) => {
    try {
      const data = await loginAPI(nickName, password);

      setUser(data.user);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  const logout = async () => {
    try {
      await logoutAPI();
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const createUser = async (formData) => {
    try {
      const data = await createAPI(formData);
      return { success: true, data };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Create failed",
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, createUser }}>
      {children}
    </AuthContext.Provider>
  );
};
``;
export const useAuth = () => useContext(AuthContext);
