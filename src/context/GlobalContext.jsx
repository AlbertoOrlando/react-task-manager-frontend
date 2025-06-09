import { createContext, useEffect, useState } from "react";
const { VITE_API_URL } = import.meta.env

export const GlobalContext = createContext()

export function GlobalProvider({ children }) {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        fetch(`${VITE_API_URL}/tasks`)
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.error(error))
    }, [])

    return (
        <GlobalContext.Provider value={{ tasks, setTasks }}>
            {children}
        </GlobalContext.Provider>
    )
}