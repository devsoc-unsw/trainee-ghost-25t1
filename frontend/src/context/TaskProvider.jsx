import { TaskContext } from "./TaskContext";
import { useState, useCallback, useEffect } from "react";
const apiUrl = import.meta.env.VITE_API_URL;


const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState(null);
    const [loading, setLoading] = useState(true);

    const refreshTasks = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/tasks`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const data = await response.json();
            setTasks(data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshTasks();
    }, [refreshTasks]);

    return (
        <TaskContext.Provider value={{ tasks, setTasks, loading, refreshTasks}}>
                {children}
        </TaskContext.Provider>
    )
};

export default TaskProvider