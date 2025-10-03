import React from "react";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const AddTaskBtn: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button className="fab" onClick={() => navigate("/task/new")}>
      <IoAdd size={28} color="var(--white)" />
    </button>
  );
};
