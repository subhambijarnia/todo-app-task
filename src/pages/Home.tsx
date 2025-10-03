import React, { Fragment, useMemo, useState } from "react";
import { Header } from "../components/Header";
import { SearchInput } from "../components/SearchInput";
import { Section } from "../components/Section";
import { TaskCard } from "../components/TaskCard";
import { AddTaskBtn } from "../components/AddTaskBtn";
import type { Task } from "../types";
import { useNavigate } from "react-router-dom";

interface Props {
  tasks: Task[];
  deleteTask: (id: string) => void;
}

export const Home: React.FC<Props> = ({ tasks, deleteTask }) => {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    if (!query.trim()) return tasks;
    const lower = query.toLowerCase();
    return tasks.filter((t) => t.title.toLowerCase().includes(lower) || t.description.toLowerCase().includes(lower));
  }, [tasks, query]);

  const inProgress = filtered.filter((t) => t.status === "in_progress");
  const pending = filtered.filter((t) => t.status === "pending");
  const completed = filtered.filter((t) => t.status === "completed");

  return (
    <>
      <Header title="TODO APP" />
      <div className="container">
        <SearchInput value={query} onChange={setQuery} />

        <Section title="In Progress" count={inProgress.length} defaultOpen>
          {inProgress.map((t) => (
            <Fragment key={t.id}>
              <TaskCard
                task={t}
                selected={selectedId === t.id}
                onSelect={setSelectedId}
                onDelete={(id) => {
                  if (confirm("Delete this task?")) deleteTask(id);
                }}
              />
              <div className="divider" />
            </Fragment>
          ))}
        </Section>

        <Section title="Pending" count={pending.length}>
          {pending.map((t) => (
            <Fragment key={t.id}>
              <TaskCard
                task={t}
                selected={selectedId === t.id}
                onSelect={setSelectedId}
                onDelete={(id) => {
                  if (confirm("Delete this task?")) deleteTask(id);
                }}
              />
              <div className="divider" />
            </Fragment>
          ))}
        </Section>

        <Section title="Completed" count={completed.length}>
          {completed.map((t) => (
            <Fragment key={t.id}>
              <TaskCard
                task={t}
                selected={selectedId === t.id}
                onSelect={setSelectedId}
                onDelete={(id) => {
                  if (confirm("Delete this task?")) deleteTask(id);
                }}
              />
              <div className="divider" />
            </Fragment>
          ))}
        </Section>

        {/* Desktop full-width button */}
        <div className="only-desktop" style={{ padding: "0 16px 24px" }}>
          <button
            className="btn primary"
            style={{ display: "inline-grid", placeItems: "center", width: "100%" }}
            onClick={() => navigate("/task/new")}
          >
            Add New Task
          </button>
        </div>
      </div>

      {/* Mobile FAB */}
      <div className="only-mobile">
        <AddTaskBtn />
      </div>
    </>
  );
};
