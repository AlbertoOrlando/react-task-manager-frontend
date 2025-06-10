import { useEffect, useState } from "react";
const { VITE_API_URL } = import.meta.env

export default function useTasks() {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        fetch(`${VITE_API_URL}/tasks`)
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.error(error))
    }, [])

    const addTask = async newTask => {
        const response = await fetch(`${VITE_API_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        });
        const { success, message, task } = await response.json();
        if (success) {
            setTasks(prevTasks => [...prevTasks, task]);
        } else {
            throw new Error("Errore durante l'aggiunta della task: " + message);

        }
    }

    const updateTask = (task) => {
    }
    const removeTask = (taskId) => {
    }

    return { tasks, addTask, updateTask, removeTask }
}