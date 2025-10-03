import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineChevronLeft } from "react-icons/hi";

interface HeaderProps {
  title: string;
  back?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, back }) => {
  const nav = useNavigate();

  const style: React.CSSProperties = {
    background: "#034EA2",
    color: "#FFFFFF",
  };

  return (
    <header className="header" style={style}>
      <div className="container" style={{ padding: 0 }}>
        <div className="header-row">
          {back ? (
            <button
              className="icon-btn"
              onClick={() => nav(-1)}
              aria-label="Back"
            >
              <HiOutlineChevronLeft size={22} />
            </button>
          ) : null}
          <Link to="/" className="back-link" aria-label="Home">
            <h1 className="header-title">{title}</h1>
          </Link>
        </div>
      </div>
    </header>
  );
};
