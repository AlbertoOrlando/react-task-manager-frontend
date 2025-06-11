import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

export default function TaskDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { tasks, removeTask, updateTask } = useContext(GlobalContext);
    const task = tasks.find(task => task.id == id);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleDelete = async () => {
        try {
            await removeTask(task.id);
            alert("Task eliminata con successo!");
            navigate("/");
        } catch (error) {
            console.error("Errore durante l'eliminazione della task:", error);
            alert("Errore durante l'eliminazione della task: " + error.message);
        }

    };

    const handleUpdate = async (updatedTask) => {
        try {
            await updateTask(updatedTask);
            alert("Task aggiornata con successo!");
            setShowEditModal(false);
        } catch (error) {
            console.error("Errore durante l'aggiornamento della task:", error);
            alert("Errore durante l'aggiornamento della task: " + error.message);
        }
    }

    return (
        <div className="task-detail-container">
            <h1>Dettaglio della Task</h1>
            {task ? (
                <div className="task-detail-card">
                    <h2>Titolo: {task.title}</h2>
                    <p>Descrizione: {task.description}</p>
                    <p>Stato: {task.status}</p>
                    <p>Data di creazione: {new Date(task.createdAt).toLocaleDateString()}</p>
                    <button className="btn-delete-task" onClick={() => setShowModal(true)}>Elimina Task</button>
                    <button className="btn-edit-task" onClick={() => setShowEditModal(true)}>Modifica Task</button>
                </div>
            ) : (
                <p>Task non trovata</p>
            )}
            <Modal
                title="Conferma Eliminazione"
                content="Sei sicuro di voler eliminare questa task?"
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDelete}
                confirmText="Elimina"
            />

            <EditTaskModal
                task={task}
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                onSave={handleUpdate}
            />
        </div>
    );
}
