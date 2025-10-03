import React from "react";
import type { TaskStatus } from "../types";

const label: Record<TaskStatus, string> = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Completed",
};

export const StatusBadge: React.FC<{ status: TaskStatus }> = ({ status }) => {
  return (
    <div className="badge" title={label[status]}>
      <span
        className={`dot ${status === "pending" ? "pending" : status === "in_progress" ? "inprogress" : "completed"}`}
      />
      <span>{label[status]}</span>
    </div>
  );
};
