import React from "react";
import { Star, CheckCircle, Quote } from "lucide-react";
import reviewsData from "@/data/reviews.json";

export default function ReviewsSection() {
  return (
    <section className="py-16 bg-[#FAF7F2]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#C89C7A] font-bold">
            Real Customer Feedback
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2F2F2F] mt-1">
            Loved by Fashion Enthusiasts
          </h2>
          <p className="text-sm text-[#666666] mt-2">
            See what our valued customers say about our luxury products, fast delivery, and premium packaging.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviewsData.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-6 border border-[#E9DED4] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(review.rating)
                            ? "fill-[#D4AF37]"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#EECFCB]" />
                </div>

                <p className="text-xs text-[#2F2F2F] italic leading-relaxed mb-6">
                  &quot;{review.comment}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-[#E9DED4]/60 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#F4EADF] text-[#C89C7A] flex items-center justify-center font-bold text-sm font-serif">
                  {review.customerName.slice(0, 2)}
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-bold text-[#2F2F2F]">
                      {review.customerName}
                    </span>
                    {review.verified && (
                      <span title="Verified Buyer">
                        <CheckCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-[#666666]">
                    Purchased: {review.productName}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
