import React from "react";
import { HiOutlineSearch } from "react-icons/hi";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export const SearchInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="search">
      <div className="input-wrap">
        <HiOutlineSearch className="left-icon" size={18} />
        <input className="input" placeholder="Search To-Do" value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    </div>
  );
};
