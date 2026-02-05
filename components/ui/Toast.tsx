"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string;
  open: boolean;
  onClose: () => void;
  duration?: number;
};

export default function Toast({
  message,
  open,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (!open) return;
    const id = setTimeout(onClose, duration);
    return () => clearTimeout(id);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-md bg-black px-5 py-3 text-sm font-medium text-white shadow-xl"
    >
      {message}
    </div>
  );
}