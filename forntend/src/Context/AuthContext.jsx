import { createContext, useContext, useState, useEffect } from "react";
import API from "../Services/Api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await API.get("/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ send token
            },
          });
          console.log("******",res.data)
          setUser(res.data);
        } catch (err) {
          console.error("Failed to fetch user", err);
          setUser(null);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
