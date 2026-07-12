"use client";

import { useState } from "react";

interface DevNoteProps {
  text: string;
}

export function DevNote({ text }: DevNoteProps) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex align-middle">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-amber-500/20 text-[10px] font-bold text-amber-400 ring-1 ring-amber-500/40 transition hover:bg-amber-500/30"
        aria-label="Developer note"
        title="DEV NOTE"
      >
        i
      </button>
      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default bg-transparent"
            onClick={() => setOpen(false)}
            aria-label="Close developer note"
          />
          <div className="absolute left-0 top-6 z-50 w-72 rounded-lg border border-amber-500/30 bg-surface-800 p-3 text-left shadow-xl">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">
              DEV NOTE
            </p>
            <p className="text-xs leading-relaxed text-slate-300">{text}</p>
          </div>
        </>
      )}
    </span>
  );
}
