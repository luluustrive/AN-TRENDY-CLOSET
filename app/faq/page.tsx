"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How long does delivery take inside Bangladesh?",
      a: "Inside Dhaka, delivery takes 24 to 48 hours. Outside Dhaka (district towns & sub-districts), delivery takes 48 to 72 hours via express courier.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept Cash on Delivery (COD) across all districts in Bangladesh, bKash, Nagad, and Visa/Mastercard payments.",
    },
    {
      q: "Are all your luxury watches & jewelry 100% authentic?",
      a: "Yes! Every single product at AN Trendy Closet is 100% authentic, sourced from verified manufacturers, and passes strict quality control before being dispatched.",
    },
    {
      q: "What is your return & exchange policy?",
      a: "We offer a 7-day hassle-free exchange policy. If an item arrives damaged, defective, or incorrect, contact us on WhatsApp (+880 1700-000000) within 48 hours for immediate replacement.",
    },
    {
      q: "Does AN Trendy Closet provide gift packaging?",
      a: "Yes, complimentary signature gift boxes & luxury ribbon packaging are included with all watch, jewelry, and perfume orders upon request.",
    },
    {
      q: "Can I place an order directly over WhatsApp or Phone?",
      a: "Absolutely! You can message us directly on WhatsApp (+880 1700-000000) or call our helpline to place an order without registering.",
    },
  ];

  return (
    <div className="py-16 bg-[#FAF7F2] min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white border border-[#E9DED4] text-[#C89C7A] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Help Center</span>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#2F2F2F]">
            Frequently Asked Questions
          </h1>
          <p className="text-xs md:text-sm text-[#666666] max-w-xl mx-auto">
            Find quick answers regarding shipping times, payment methods, authenticity, and returns.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 mb-16">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-[#E9DED4] shadow-sm overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 text-left font-serif font-bold text-base text-[#2F2F2F] flex items-center justify-between hover:text-[#C89C7A] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#C89C7A] transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-xs md:text-sm text-[#666666] leading-relaxed border-t border-[#FAF7F2] pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Help Banner */}
        <div className="bg-white rounded-3xl p-8 border border-[#E9DED4] shadow-sm text-center space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#2F2F2F]">
            Still have questions?
          </h3>
          <p className="text-xs text-[#666666]">
            Our support concierge is ready to assist you on WhatsApp with instant answers.
          </p>
          <a
            href="https://wa.me/8801700000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-8 py-3 bg-[#25D366] text-white font-bold text-xs rounded-full shadow-md hover:bg-[#20ba5a] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
