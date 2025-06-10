import { createContext } from "react";
import useTasks from "../hooks/useTasks";


export const GlobalContext = createContext()

export function GlobalProvider({ children }) {


    // salvo in una variabile lo useTasks che contiene le funzioni e i dati delle task
    const taskData = useTasks()

    return (
        // creo il provider e passo i dati delle task facendo spread operator
        // in modo da poter accedere a tasks, addTask, updateTask e removeTask
        <GlobalContext.Provider value={{ ...taskData }}>
            {children}
        </GlobalContext.Provider>
    )
}