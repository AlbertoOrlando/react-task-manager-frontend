import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Modal from "../components/Modal";

export default function TaskDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { tasks, removeTask } = useContext(GlobalContext);
    const task = tasks.find(task => task.id == id);
    const [showModal, setShowModal] = useState(false);

    const handleDelete = () => {
        try {
            removeTask(task.id);
            alert("Task eliminata con successo!");
            navigate("/");
        } catch (error) {
            console.error("Errore durante l'eliminazione della task:", error);
            alert("Errore durante l'eliminazione della task: " + error.message);
        }

    };

    return (
        <div className="task-detail-container">
            <h1>Dettaglio della Task</h1>
            {task ? (
                <div className="task-detail-card">
                    <h2>Nome: {task.title}</h2>
                    <p>Descrizione: {task.description}</p>
                    <p>Stato: {task.status}</p>
                    <p>Data di creazione: {new Date(task.createdAt).toLocaleDateString()}</p>
                    <button onClick={() => setShowModal(true)}>Elimina Task</button>
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
        </div>
    );
}
