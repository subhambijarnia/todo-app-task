import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import type { NewTaskInput, Task, TaskStatus } from "../types";

interface Props {
  tasks: Task[];
  createTask: (input: NewTaskInput) => string;
  updateTask: (id: string, patch: NewTaskInput) => void;
}

const label: Record<TaskStatus, string> = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Completed",
};

export const EditTask: React.FC<Props> = ({ tasks, createTask, updateTask }) => {
  const { id } = useParams<{ id: string }>();
  const isNew = !id;
  const nav = useNavigate();

  const existing = useMemo<Task | undefined>(() => tasks.find((t) => t.id === id), [tasks, id]);

  const [title, setTitle] = useState(existing?.title ?? "");
  const [description, setDescription] = useState(existing?.description ?? "");
  const [status, setStatus] = useState<TaskStatus>(existing?.status ?? "pending");

  useEffect(() => {
    if (!isNew && !existing) {
      nav("/");
    }
  }, [isNew, existing, nav]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");
    const input: NewTaskInput = { title: title.trim(), description: description.trim(), status };
    if (isNew) {
      createTask(input);
    } else if (id) {
      updateTask(id, input);
    }
    nav("/");
  };

  return (
    <>
      <Header title={isNew ? "New Task" : "Edit Task"} back />
      <div className="container">
        <form className="form card" onSubmit={submit}>
          <div style={{ marginBottom: 12 }}>
            <div className="label">Title</div>
            <input
              className="field"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <div className="label">Description</div>
            <textarea
              className="field textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task details"
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <div className="label">{label[status]}</div>
            <div className="status-row">
              {(["pending", "in_progress", "completed"] as TaskStatus[]).map((s) => (
                <div
                  key={s}
                  className={`status-option ${s === status ? "active" : ""}`}
                  onClick={() => setStatus(s)}
                  role="button"
                >
                  <span
                    className={`dot ${s === "pending" ? "pending" : s === "in_progress" ? "inprogress" : "completed"}`}
                  />
                  <span>{label[s]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="actions">
            <button type="button" className="btn ghost" onClick={() => nav(-1)}>
              Cancel
            </button>
            <button type="submit" className="btn primary">
              {isNew ? "Create Task" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
