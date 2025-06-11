import { useContext, useMemo, useState } from "react"
import { GlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/TaskRow"

export default function TaskList() {

    const { tasks } = useContext(GlobalContext)
    console.log("tasks", tasks)

    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState(1);

    const sortIcon = sortOrder === 1 ? "↑" : "↓";

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(prev => -prev * -1);
        } else {
            setSortBy(field);
            setSortOrder(1);
        }
    }

    const sortedTasks = useMemo(() => {
        return [...tasks].sort((a, b) => {

            let comparison;
            if (sortBy === "title") {
                comparison = a.title.localeCompare(b.title);
            } else if (sortBy === "status") {
                const statusOptions = ["To Do", "Doing", "Done"];
                comparison = statusOptions.indexOf(a.status) - statusOptions.indexOf(b.status);
            } else if (sortBy === "createdAt") {
                const dateA = new Date(a.createdAt).getTime();
                const dateB = new Date(b.createdAt).getTime();
                comparison = dateA - dateB;
            }
            return comparison * sortOrder;
        });
    }, [tasks, sortBy, sortOrder]);

    return (
        <div className="task-list-container">
            <h1>Lista delle Task</h1>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort("title")}>
                            Titolo {sortBy === "title" && sortIcon}
                        </th>
                        <th onClick={() => handleSort("status")}>
                            Stato {sortBy === "status" && sortIcon}
                        </th>
                        <th onClick={() => handleSort("createdAt")}>
                            Data Creazione {sortBy === "createdAt" && sortIcon}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTasks.map(task => (
                        <TaskRow key={task.id} task={task} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
