import { useState, useId } from 'react';

export default function ExpandCard({ title, summary, children, defaultOpen = false, className = '' }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  return (
    <div className={`exp-card ${className}`}>
      <button type="button" className="exp-card-header" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-controls={id}>
        <span className="exp-card-title">{title}</span>
        <span className="exp-card-hint">{open ? '(đóng)' : '(mở)'}</span>
        <span className={`exp-chevron ${open ? 'open' : ''}`} aria-hidden="true" />
      </button>
      {summary && <p className="exp-card-summary">{summary}</p>}
      <div id={id} className={`exp-card-body ${open ? 'open' : ''}`} hidden={!open}>
        {children}
      </div>
    </div>
  );
}
