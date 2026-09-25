"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Sparkles, X, Send, Bot, User, ShoppingBag, ArrowRight, RefreshCw, PhoneCall, ShieldCheck } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

interface MessageItem {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  suggestedProducts?: Product[];
}

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIChatDrawer({ isOpen, onClose }: AIChatDrawerProps) {
  const { addItem } = useCart();
  const [inputMsg, setInputMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: "welcome-1",
      sender: "assistant",
      text: "👋 Assalamu Alaikum! Welcome to **AN Trendy Closet**. I am your 24/7 AI Fashion & Shopping Assistant. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMsg).trim();
    if (!query || loading) return;

    const userMsg: MessageItem = {
      id: `user_${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });
      const data = await res.json();
      if (data.success && data.message) {
        setMessages((prev) => [...prev, data.message]);
      } else {
        throw new Error();
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          sender: "assistant",
          text: "I am having trouble connecting to live store server right now. You can browse our products or contact our hotline directly at +880 1700-000000.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const promptChips = [
    "Watches under ৳5,000",
    "Show me ladies bags",
    "What is the delivery fee?",
    "Return & Refund Policy",
    "Track my order",
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-sm animate-fade-in flex justify-end">
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#E9DED4]">
        {/* Chat Drawer Header */}
        <div className="p-4 md:p-5 bg-[#2F2F2F] text-white flex items-center justify-between border-b border-[#3D3D3D]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C89C7A] text-white flex items-center justify-center shadow-md relative">
              <Bot className="w-6 h-6" />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#2F2F2F]" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="font-serif font-bold text-base text-white">AN AI Assistant</h3>
                <span className="px-2 py-0.5 text-[9px] font-bold bg-[#C89C7A]/20 text-[#C89C7A] border border-[#C89C7A]/40 rounded-full">
                  24/7 LIVE
                </span>
              </div>
              <p className="text-[11px] text-stone-300">Grounded Factual Store Assistant</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-white transition-colors"
            aria-label="Close Assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 md:p-5 overflow-y-auto bg-[#FAF7F2] space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
            >
              <div className="flex items-start space-x-2 max-w-[85%]">
                {msg.sender === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-[#C89C7A] text-white flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}
                <div>
                  <div
                    className={`p-4 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-[#C89C7A] text-white rounded-tr-none font-medium"
                        : "bg-white text-[#2F2F2F] rounded-tl-none border border-[#E9DED4]"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Product Cards inside AI Chat */}
                  {msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {msg.suggestedProducts.map((prod) => (
                        <div
                          key={prod.id}
                          className="bg-white rounded-xl p-2.5 border border-[#E9DED4] flex items-center justify-between shadow-xs hover:border-[#C89C7A] transition-colors"
                        >
                          <div className="flex items-center space-x-2.5">
                            <img
                              src={prod.images[0]}
                              alt={prod.name}
                              className="w-12 h-12 rounded-lg object-cover bg-stone-100"
                            />
                            <div>
                              <Link
                                href={`/products/${prod.id}`}
                                onClick={onClose}
                                className="font-bold text-xs text-[#2F2F2F] hover:text-[#C89C7A] line-clamp-1"
                              >
                                {prod.name}
                              </Link>
                              <div className="text-xs font-extrabold text-[#C89C7A]">
                                {formatPrice(prod.price, prod.currency)}
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => addItem(prod, 1)}
                            className="p-2 bg-[#FAF7F2] hover:bg-[#C89C7A] hover:text-white rounded-lg text-[#2F2F2F] transition-colors flex items-center space-x-1 text-[11px] font-bold"
                            title="Add to Cart"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Add</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] text-[#666666] mt-1 block text-right px-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-2 text-xs text-[#666666] bg-white p-3 rounded-2xl border border-[#E9DED4] max-w-[200px]">
              <RefreshCw className="w-4 h-4 text-[#C89C7A] animate-spin" />
              <span>AI is thinking...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompt Chips */}
        <div className="p-3 bg-white border-t border-[#E9DED4] overflow-x-auto no-scrollbar flex items-center space-x-2">
          {promptChips.map((chip) => (
            <button
              key={chip}
              onClick={() => handleSendMessage(chip)}
              className="px-3 py-1.5 bg-[#FAF7F2] hover:bg-[#C89C7A] hover:text-white border border-[#E9DED4] text-[#2F2F2F] rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors shadow-xs"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-[#E9DED4]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="Ask about products, sizes, prices, shipping..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              className="flex-1 px-4 py-3 bg-[#FAF7F2] border border-[#E9DED4] rounded-2xl text-xs focus:outline-none focus:border-[#C89C7A] text-[#2F2F2F]"
            />
            <button
              type="submit"
              disabled={!inputMsg.trim() || loading}
              className="w-10 h-10 rounded-2xl bg-[#C89C7A] hover:bg-[#D4AF37] disabled:opacity-50 text-white flex items-center justify-center shadow-md transition-all flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between text-[10px] text-[#666666] pt-2">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Verified Store Data</span>
            </span>
            <Link href="/contact" onClick={onClose} className="text-[#C89C7A] hover:underline font-semibold flex items-center space-x-1">
              <PhoneCall className="w-3 h-3" />
              <span>Human Support Hotline</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
