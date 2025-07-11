import { useState, useRef, useMemo, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";


const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";


export default function AddTask() {

    const { addTask } = useContext(GlobalContext);


    const [taskTitle, setTaskTitle] = useState("");
    const descriptionRef = useRef();
    const statusRef = useRef();


    const taskTitleError = useMemo(() => {
        if (!taskTitle.trim()) {
            return "Il titolo della task non può essere vuoto.";
        }
        if ([...taskTitle].some(char => symbols.includes(char))) {
            return "Il titolo della task non può contenere caratteri speciali.";
        }
        return "";
    }, [taskTitle]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (taskTitleError) {
            return;
        }
        const newTask = {
            title: taskTitle.trim(),
            description: descriptionRef.current.value,
            status: statusRef.current.value
        };
        try {
            await addTask(newTask);
            alert("Task aggiunta con successo!");
            setTaskTitle("");
            descriptionRef.current.value = "";
            statusRef.current.value = "To do";
        } catch (error) {
            alert(error.message);
        }

    }

    return (
        <div className="add-task-container">
            <h1>Aggiungi una Task</h1>
            <form onSubmit={handleSubmit} className="add-task-form">
                <label>
                    Titolo:
                    <input
                        type="text"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        placeholder="Inserisci il titolo della task"
                    />
                </label>
                {taskTitleError && <p className="error">{taskTitleError}</p>}
                <label>
                    Descrizione:
                    <textarea
                        ref={descriptionRef}
                        placeholder="Inserisci la descrizione della task"
                    ></textarea>
                </label>
                <label>
                    Stato:
                    <select ref={statusRef} defaultValue={"To do"}>
                        <option value="To do">To do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>

                        {/* alternativa per fare le opzioni con un map */}

                        {/* {["To Do", "Doing", "Done"].map((value, index) => (
                            <option key={index} value={value}>{value}</option>
                        ))} */}
                    </select>
                </label>
                <button type="submit" disabled={!taskTitle || taskTitleError}>Aggiungi Task</button>
            </form>
        </div>
    );
}
