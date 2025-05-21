import { createContext } from "react";

export const HomeContext = createContext({
    homeData: null,
    setHomeData: () => {},
    loading: true,
    refetchHomeData: async () => {}  
})