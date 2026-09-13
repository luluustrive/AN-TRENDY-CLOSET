"use client";

import React, { useState } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Clock, 
  CheckCircle2, 
  Send
} from "lucide-react";

import { useStoreSettings } from "@/lib/store-settings-context";

export default function ContactPage() {
  const { settings } = useStoreSettings();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-16 bg-[#FAF7F2] min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs uppercase tracking-widest text-[#C89C7A] font-bold">
            Customer Support & Concierge
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#2F2F2F]">
            We&apos;re Here to Help You
          </h1>
          <p className="text-sm text-[#666666]">
            Have a question about an order, custom gift wrapping, or product availability? Contact {settings.shopName}.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Cards & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-[#E9DED4] shadow-sm space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#2F2F2F]">Get in Touch</h2>

              <div className="space-y-4 text-xs text-[#2F2F2F]">
                <a
                  href={`https://wa.me/${settings.hotline.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors border border-[#25D366]/20 font-semibold"
                >
                  <MessageCircle className="w-6 h-6 shrink-0" />
                  <div>
                    <div>WhatsApp Live Concierge</div>
                    <div className="text-[11px] opacity-80">{settings.hotline} (Fastest response)</div>
                  </div>
                </a>

                <div className="flex items-start space-x-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E9DED4]">
                  <Phone className="w-5 h-5 text-[#C89C7A] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">Phone Helpline</div>
                    <div className="text-[#666666]">{settings.hotline} (10:00 AM - 9:00 PM)</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E9DED4]">
                  <Mail className="w-5 h-5 text-[#C89C7A] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">Email Support</div>
                    <div className="text-[#666666]">{settings.supportEmail}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E9DED4]">
                  <MapPin className="w-5 h-5 text-[#C89C7A] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">Boutique Showroom</div>
                    <div className="text-[#666666]">Dhaka 1212, Bangladesh</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E9DED4]">
                  <Clock className="w-5 h-5 text-[#C89C7A] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">Business Hours</div>
                    <div className="text-[#666666]">Saturday - Thursday: 10:00 AM - 8:00 PM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#E9DED4] shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-[#2F2F2F] mb-6">
                Send Us a Message
              </h2>

              {submitted ? (
                <div className="p-8 bg-[#FAF7F2] rounded-2xl border border-[#25D366]/40 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#25D366] mx-auto" />
                  <h3 className="font-serif text-xl font-bold text-[#2F2F2F]">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-xs text-[#666666]">
                    Thank you for contacting AN Trendy Closet. Our customer concierge will reply within 2 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2 bg-[#C89C7A] text-white text-xs font-bold rounded-full shadow-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#2F2F2F] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-[#FAF7F2] border border-[#E9DED4] rounded-xl py-2.5 px-3 text-xs text-[#2F2F2F]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#2F2F2F] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-[#FAF7F2] border border-[#E9DED4] rounded-xl py-2.5 px-3 text-xs text-[#2F2F2F]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#2F2F2F] mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="01700-000000"
                        className="w-full bg-[#FAF7F2] border border-[#E9DED4] rounded-xl py-2.5 px-3 text-xs text-[#2F2F2F]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#2F2F2F] mb-1">
                        Subject *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Inquiry about watch collection"
                        className="w-full bg-[#FAF7F2] border border-[#E9DED4] rounded-xl py-2.5 px-3 text-xs text-[#2F2F2F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2F2F2F] mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your message here..."
                      className="w-full bg-[#FAF7F2] border border-[#E9DED4] rounded-xl p-3 text-xs text-[#2F2F2F]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-[#C89C7A] hover:bg-[#D4AF37] text-white rounded-full text-xs font-bold shadow-md transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Send Inquiry</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
