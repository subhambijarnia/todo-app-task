import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { EditTask } from "./pages/EditTask";
import type { Task, NewTaskInput, TaskUpdate } from "./types";
import { nowIso } from "./utils/date";
import { v4 as uuid } from "uuid";

const STORAGE_KEY = "todo.tasks.key";

const App: React.FC = () => {
  
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Task[]) : [];
    } catch {
      return [];
    }
  });

  // Keep in sync with localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const createTask = (input: NewTaskInput): string => {
    const id = uuid();
    const newTask: Task = {
      id,
      title: input.title.trim(),
      description: input.description.trim(),
      status: input.status,
      updatedAt: nowIso(),
    };
    setTasks((prev) => [newTask, ...prev]);
    return id;
  };

  const updateTask = (id: string, patch: TaskUpdate) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch, updatedAt: nowIso() } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <Routes>
      <Route path="/" element={<Home tasks={tasks} deleteTask={deleteTask} />} />
      <Route path="/task/new" element={<EditTask tasks={tasks} createTask={createTask} updateTask={updateTask} />} />
      <Route
        path="/task/:id/edit"
        element={<EditTask tasks={tasks} createTask={createTask} updateTask={updateTask} />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
