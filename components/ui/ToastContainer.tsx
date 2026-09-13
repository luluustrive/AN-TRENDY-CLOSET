"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/lib/toast-context";
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from "lucide-react";

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col space-y-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto bg-white/95 backdrop-blur-md border border-[#E9DED4] rounded-2xl p-4 shadow-2xl flex items-start space-x-3 text-[#2F2F2F] relative overflow-hidden"
          >
            {/* Left indicator accent */}
            <div
              className={`w-1 absolute left-0 top-0 bottom-0 ${
                toast.type === "success"
                  ? "bg-[#25D366]"
                  : toast.type === "warning"
                  ? "bg-[#D4AF37]"
                  : toast.type === "error"
                  ? "bg-red-500"
                  : "bg-[#C89C7A]"
              }`}
            />

            {toast.image ? (
              <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E9DED4] flex items-center justify-center shrink-0 text-xl font-bold text-[#C89C7A] overflow-hidden">
                <span className="text-sm">✨</span>
              </div>
            ) : (
              <div className="shrink-0 mt-0.5">
                {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-[#25D366]" />}
                {toast.type === "warning" && <AlertTriangle className="w-5 h-5 text-[#D4AF37]" />}
                {toast.type === "error" && <XCircle className="w-5 h-5 text-red-500" />}
                {(!toast.type || toast.type === "info") && <Info className="w-5 h-5 text-[#C89C7A]" />}
              </div>
            )}

            <div className="flex-1 min-w-0 pr-4">
              <h4 className="text-xs font-bold tracking-tight text-[#2F2F2F]">{toast.title}</h4>
              {toast.description && (
                <p className="text-[11px] text-[#666666] mt-0.5 line-clamp-2 leading-snug">
                  {toast.description}
                </p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-[#2F2F2F] transition-colors p-1 shrink-0"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
