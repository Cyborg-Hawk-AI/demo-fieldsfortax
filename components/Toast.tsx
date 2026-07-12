"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

export function Toast({ message, visible, onClose }: ToastProps) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] toast-enter">
      <div className="flex items-center gap-3 rounded-lg border border-brand-500/30 bg-surface-800 px-4 py-3 shadow-2xl">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/20 text-brand-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-sm text-slate-200">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="ml-2 text-slate-500 hover:text-white"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  );
}
