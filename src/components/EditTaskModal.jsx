import Modal from "./Modal";
import { useState, useRef } from "react";

export default function EditTaskModal({ task, show, onClose, onSave }) {
    const [editedTask, setEditedTask] = useState(task);
    const editFormRef = useRef();


    const changeEditedTask = (key, event) => {
        const { value } = event.target;
        setEditedTask(prev => ({ ...prev, [key]: event.target.value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        onSave(editedTask);
    }

    const { title, description, status } = editedTask;
    return (
        <Modal
            title="Modifica Task"
            content={
                <form ref={editFormRef} onSubmit={handleSubmit} className="edit-task-modal-form">
                    <label>
                        Titolo:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => changeEditedTask("title", e)}
                            placeholder="Inserisci il titolo della task"
                        />
                    </label>
                    <label>
                        Descrizione:
                        <textarea
                            value={description}
                            onChange={(e) => changeEditedTask("description", e)}
                            placeholder="Inserisci la descrizione della task"
                        />
                    </label>
                    <label>
                        Stato:
                        <select
                            value={status}
                            onChange={(e) => changeEditedTask("status", e)}
                        >
                            <option value="To do">To do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </label>
                </form>
            }
            confirmText="Salva"
            show={show}
            onClose={onClose}
            onConfirm={() => {
                editFormRef.current.requestSubmit();
            }}
        />
    )
}