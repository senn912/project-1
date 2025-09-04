import { createContext, useContext, useState, useEffect } from "react";
import { logIn } from "~/api/logIn";
import { signUp } from "~/api/signUp";
import { logOut } from "~/api/logOut";
import { getUser } from "~/api/getUser";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUser()
      .then((data) => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  const loginUser = (nickName, password) => {
    return logIn(nickName, password)
      .then((data) => {
        setUser(data.user);
        return { success: true };
      })
      .catch((err) => {
        return {
          success: false,
          message: err.response?.data?.message || "Login failed",
        };
      });
  };

  const logoutUser = () => {
    return logOut()
      .then(() => {
        setUser(null);
        navigate("/");
      })
      .catch((err) => {
        console.error("Logout error:", err);
      });
  };

  const signupUser = (formData) => {
    return signUp(formData)
      .then((data) => {
        return { success: true, data };
      })
      .catch((err) => {
        return {
          success: false,
          message: err.response?.data?.message || "Create failed",
        };
      });
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, signupUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
