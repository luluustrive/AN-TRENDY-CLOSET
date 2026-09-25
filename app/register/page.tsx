"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, User, Phone, ArrowRight, ShieldCheck } from "lucide-react";
import { useToast } from "@/lib/toast-context";

export default function RegisterPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Registration failed.");
      }

      showToast({
        title: "Account Created!",
        description: "Welcome to AN Trendy Closet membership.",
        type: "success",
      });

      router.push("/account");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to create account.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 bg-[#FAF7F2] min-h-[80vh] flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-white rounded-3xl p-8 border border-[#E9DED4] shadow-lg">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#C89C7A]/10 text-[#C89C7A] flex items-center justify-center mx-auto mb-3">
              <User className="w-7 h-7" />
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#2F2F2F]">
              Create Customer Account
            </h1>
            <p className="text-xs text-[#666666] mt-1">
              Join AN Trendy Closet to track orders, save delivery addresses, and sync your cart.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#2F2F2F] uppercase tracking-wider mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#C89C7A] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Nusrat Jahan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E9DED4] focus:outline-none focus:border-[#C89C7A] text-xs text-[#2F2F2F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2F2F2F] uppercase tracking-wider mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#C89C7A] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E9DED4] focus:outline-none focus:border-[#C89C7A] text-xs text-[#2F2F2F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2F2F2F] uppercase tracking-wider mb-2">
                Phone Number (BD)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#C89C7A] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder="+880 1700-000000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E9DED4] focus:outline-none focus:border-[#C89C7A] text-xs text-[#2F2F2F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2F2F2F] uppercase tracking-wider mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#C89C7A] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E9DED4] focus:outline-none focus:border-[#C89C7A] text-xs text-[#2F2F2F]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#C89C7A] hover:bg-[#D4AF37] text-white rounded-2xl font-bold text-sm transition-all flex items-center justify-center space-x-2 shadow-md mt-6"
            >
              <span>{loading ? "Creating Account..." : "Create Account"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#E9DED4] text-center text-xs text-[#666666]">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-[#C89C7A] hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
