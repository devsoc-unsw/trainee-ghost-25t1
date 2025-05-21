import { useState, useEffect, useCallback } from "react";
import { HomeContext } from "./homeContext";
const apiUrl = import.meta.env.VITE_API_URL;

const HomeProvider = ({ children }) => {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);

  const refetchHomeData = useCallback(async () => {
      setLoading(true);
      try {
        const res = await fetch(`${apiUrl}/teams/home`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setHomeData(data.data);
      } catch (error) {
        setHomeData(null);
        console.error("Error fetching home page date: ", error);
      } finally {
        setLoading(false);
      }
  }, []);

  useEffect(() => {
    refetchHomeData();
  }, [refetchHomeData]);

  return (
    <HomeContext.Provider value={{ homeData, setHomeData, loading, refetchHomeData }}>
        {children}
    </HomeContext.Provider>
  )
};

export default HomeProvider