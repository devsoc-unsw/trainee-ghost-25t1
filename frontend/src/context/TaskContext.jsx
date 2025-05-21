import { createContext } from "react";

export const TaskContext = createContext({
    tasks: null,
    setTasks: () => {},
    loading: true,
    refreshTasks: async () => {}
})