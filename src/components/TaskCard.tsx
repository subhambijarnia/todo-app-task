import React from "react";
import type { Task } from "../types";
import { StatusBadge } from "./StatusBadge";
import { prettyDate } from "../utils/date";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { Link } from "react-router-dom";

interface Props {
  task: Task;
  selected?: boolean;
  onSelect?: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<Props> = ({ task, selected, onSelect, onDelete }) => {
  const first = task.title.trim().charAt(0).toUpperCase() || "T";

  return (
    <div className={`card task ${selected ? "selected" : ""}`} onClick={() => onSelect?.(task.id)}>
      <div className="avatar" aria-hidden>
        {first}
      </div>

      <div className="task-main">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
          <h3 className="task-title">{task.title}</h3>
          <StatusBadge status={task.status} />
        </div>
        <p className="task-desc">{task.description}</p>
        <div className="task-date">{prettyDate(task.updatedAt)}</div>
      </div>

      {selected && (
        <div className="task-right" onClick={(e) => e.stopPropagation()}>
          <Link to={`/task/${task.id}/edit`} className="action edit" title="Edit">
            <HiOutlinePencil size={18} />
          </Link>
          <button className="action delete" title="Delete" onClick={() => onDelete(task.id)}>
            <HiOutlineTrash size={18} />
          </button>
        </div>
      )}
    </div>
  );
};
