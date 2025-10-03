export type TaskStatus = "pending" | "in_progress" | "completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  updatedAt: string;
}

export type NewTaskInput = Pick<Task, "title" | "description" | "status">;

export type TaskUpdate = Partial<Pick<Task, "title" | "description" | "status">>;
