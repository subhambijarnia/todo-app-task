import React, { useState } from "react";
import { HiChevronUp, HiChevronDown } from "react-icons/hi";

interface Props {
  title: string;
  count: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export const Section: React.FC<Props> = ({ title, count, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="section">
      <div className="section-head" onClick={() => setOpen((o) => !o)} role="button" aria-expanded={open}>
        <span>
          {title} <span style={{ opacity: 0.7 }}>({count})</span>
        </span>
        {open ? <HiChevronUp /> : <HiChevronDown />}
      </div>
      {open && <div className="section-content">{children}</div>}
    </section>
  );
};
