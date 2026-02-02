import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  visible: boolean;
  onDismiss: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  visible,
  onDismiss,
  duration = 3000,
}) => {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [visible, duration, onDismiss]);

  if (!visible) return null;

  return (
    <div
      role="alert"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-4 py-3 bg-gray-900 text-white text-sm font-medium rounded-lg shadow-lg flex items-center gap-2"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="flex-shrink-0 text-emerald-400"
      >
        <path
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3l-4 4-2.4-2.4 1.4-1.4L9.7 11l2.6-2.6 1.4 1.4z"
          fill="currentColor"
        />
      </svg>
      <span>{message}</span>
    </div>
  );
};
