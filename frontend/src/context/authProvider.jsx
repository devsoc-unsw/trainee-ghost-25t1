import { useState, useEffect } from "react";
import { AuthContext } from "./authContext";
import { useLocation } from "react-router";
const apiUrl = import.meta.env.VITE_API_URL;


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Store loading so we dont immediately delcare that user dosent exist
  // before we know
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    console.log("Test")
    const fetchUser = async () => {
      try {
        const res = await fetch(`${apiUrl}/users/self`, {
          credentials: "include",
        });
        const data = await res.json();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [location]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;