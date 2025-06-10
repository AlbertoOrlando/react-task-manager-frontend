import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom"
import TaskList from "./pages/TaskList"
import AddTask from "./pages/AddTask"
import { GlobalProvider } from "./context/GlobalContext"
import TaskDetail from "./pages/TaskDetail"

function App() {

  return (
    <GlobalProvider>
      <BrowserRouter>

        <nav>
          <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/">Lista delle Task</NavLink>
          <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/add">Aggiungi Task</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add" element={<AddTask />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
