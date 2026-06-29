"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
  success: (message: string) => void;
  error: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const COLORS = {
  success: "#0F6D6D",
  error: "#dc2626",
  info: "#2563eb",
};

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, type: ToastType = "info") => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, type, message }]);
      setTimeout(() => remove(id), 4000);
    },
    [remove]
  );

  const value: ToastContextValue = {
    toast,
    success: (m) => toast(m, "success"),
    error: (m) => toast(m, "error"),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {mounted &&
        createPortal(
          <div className="pointer-events-none fixed bottom-6 right-6 z-[200] flex flex-col gap-3">
            {toasts.map((t) => {
              const Icon = ICONS[t.type];
              return (
                <div
                  key={t.id}
                  className="pointer-events-auto flex items-start gap-3 rounded-2xl border bg-white px-4 py-3 shadow-2xl"
                  style={{
                    borderColor: "rgb(18 52 77 / 0.08)",
                    minWidth: 280,
                    maxWidth: 380,
                    animation: "toast-in 0.25s ease",
                  }}
                  role="status"
                >
                  <Icon
                    size={20}
                    className="mt-0.5 shrink-0"
                    style={{ color: COLORS[t.type] }}
                  />
                  <p className="flex-1 text-sm font-medium text-[#12344D]">
                    {t.message}
                  </p>
                  <button
                    type="button"
                    onClick={() => remove(t.id)}
                    aria-label="Dismiss"
                    className="shrink-0 text-[#9aa6ad] transition-colors hover:text-[#12344D]"
                  >
                    <X size={16} />
                  </button>
                </div>
              );
            })}
          </div>,
          document.body
        )}
      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </ToastContext.Provider>
  );
}
