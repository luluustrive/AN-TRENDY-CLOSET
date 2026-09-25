"use client";

import React, { useState } from "react";
import { Sparkles, Bot } from "lucide-react";
import AIChatDrawer from "./AIChatDrawer";

export default function AIChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center space-x-2.5 px-4 py-3 bg-[#2F2F2F] hover:bg-[#C89C7A] text-white rounded-full shadow-2xl border-2 border-[#C89C7A] transition-all duration-300 hover:scale-105"
          aria-label="Open 24/7 AI Shopping Assistant"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
          </div>

          <div className="hidden sm:flex flex-col text-left">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#C89C7A] group-hover:text-white leading-none">
              24/7 AI ASSISTANT
            </span>
            <span className="text-xs font-serif font-bold text-white leading-tight">
              Ask Anything
            </span>
          </div>

          <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
        </button>
      </div>

      <AIChatDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
