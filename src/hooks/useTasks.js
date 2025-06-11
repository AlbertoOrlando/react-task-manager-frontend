import { useEffect, useState } from "react";
const { VITE_API_URL } = import.meta.env

export default function useTasks() {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : [];
    });

    // Carica da API solo se localStorage è vuoto
    useEffect(() => {
        if (tasks.length === 0) {
            fetch(`${VITE_API_URL}/tasks`)
                .then(response => response.json())
                .then(data => setTasks(data))
                .catch(error => console.error(error));
        }
    }, []);

    // Salva su localStorage ogni volta che tasks cambia
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

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


    const updateTask = async (updatedTask) => {
        const response = await fetch(`${VITE_API_URL}/tasks/${updatedTask.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        });
        const { success, message, task: newTask } = await response.json();
        if (success) {
            setTasks(prevTasks => prevTasks.map(oldTask => (oldTask.id === newTask.id ? newTask : oldTask)));
        } else {
            throw new Error("Errore durante l'aggiornamento della task: " + message);
        }
    }


    const removeTask = async (taskId) => {
        const response = await fetch(`${VITE_API_URL}/tasks/${taskId}`, {
            method: 'DELETE'
        });
        const { success, message } = await response.json();
        if (success) {
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        } else {
            throw new Error("Errore durante l'eliminazione della task: " + message);
        }
    }

    return { tasks, addTask, updateTask, removeTask }
}