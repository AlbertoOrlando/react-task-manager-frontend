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

    const addTask = (task) => {
    }

    const updateTask = (task) => {
    }
    const removeTask = (taskId) => {
    }

    return { tasks, addTask, updateTask, removeTask }
}