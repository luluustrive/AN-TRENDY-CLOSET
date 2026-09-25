"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Package, MapPin, Heart, LogOut, ShieldCheck, Clock, CheckCircle2, FileText, ArrowRight, Plus } from "lucide-react";
import { useWishlist } from "@/lib/wishlist-context";
import { formatPrice } from "@/lib/utils";

interface AddressItem {
  id: string;
  label: string;
  recipientName: string;
  phone: string;
  division: string;
  district: string;
  upazila: string;
  details: string;
  isDefault: boolean;
}

export default function AccountPage() {
  const router = useRouter();
  const { wishlist } = useWishlist();
  const [user, setUser] = useState<{ name: string; email: string; phone?: string; role: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "wishlist" | "profile">("orders");
  const [loading, setLoading] = useState(true);

  // Address book state
  const [addresses, setAddresses] = useState<AddressItem[]>([
    {
      id: "addr-1",
      label: "Home (Primary)",
      recipientName: "Customer User",
      phone: "+880 1711-000000",
      division: "Dhaka",
      district: "Dhaka",
      upazila: "Banani",
      details: "House 12, Road 5, Block F, Banani",
      isDefault: true,
    },
  ]);

  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [newAddr, setNewAddr] = useState({
    label: "Work",
    recipientName: "",
    phone: "",
    division: "Dhaka",
    district: "Dhaka",
    upazila: "Gulshan",
    details: "",
  });

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser(data.user);
        } else {
          // Fallback guest user for customer portal
          setUser({
            name: "Nusrat Jahan",
            email: "nusrat@example.com",
            phone: "+880 1711-889900",
            role: "customer",
          });
        }
      })
      .catch(() => {
        setUser({
          name: "Nusrat Jahan",
          email: "nusrat@example.com",
          phone: "+880 1711-889900",
          role: "customer",
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.recipientName || !newAddr.phone || !newAddr.details) return;
    const added: AddressItem = {
      ...newAddr,
      id: `addr-${Date.now()}`,
      isDefault: addresses.length === 0,
    };
    setAddresses([...addresses, added]);
    setShowAddAddressModal(false);
    setNewAddr({ label: "Work", recipientName: "", phone: "", division: "Dhaka", district: "Dhaka", upazila: "Gulshan", details: "" });
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-xs text-[#666666]">
        Loading your account dashboard...
      </div>
    );
  }

  return (
    <div className="py-12 bg-[#FAF7F2] min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        {/* Profile Banner */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E9DED4] shadow-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-[#C89C7A] text-white flex items-center justify-center font-serif text-2xl font-bold shadow-md">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-serif text-2xl font-bold text-[#2F2F2F]">
                  {user?.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase">
                  Verified Member
                </span>
              </div>
              <p className="text-xs text-[#666666] mt-0.5">
                {user?.email} • {user?.phone || "+880 1700-000000"}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-all flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Account Nav Tabs */}
        <div className="flex border-b border-[#E9DED4] mb-8 space-x-6 overflow-x-auto no-scrollbar">
          {[
            { id: "orders", label: "My Orders (2)", icon: Package },
            { id: "addresses", label: "Saved Addresses", icon: MapPin },
            { id: "wishlist", label: `Wishlist (${wishlist.length})`, icon: Heart },
            { id: "profile", label: "Account Settings", icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-4 text-xs font-bold transition-all flex items-center space-x-2 border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-[#C89C7A] text-[#C89C7A]"
                    : "border-transparent text-[#666666] hover:text-[#2F2F2F]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content: Orders */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-[#E9DED4] shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-[#E9DED4] mb-4">
                <div>
                  <span className="text-xs font-bold text-[#C89C7A] font-mono">
                    ANC-ORD-948102
                  </span>
                  <div className="text-xs text-[#666666] mt-0.5">Placed on Sept 11, 2026</div>
                </div>
                <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-bold">
                  Shipped
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-xs text-[#2F2F2F]">
                  <span>1x Rose Gold Elegance Watch</span>
                  <span className="font-bold">৳4,500</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#2F2F2F]">
                  <span>1x Velvet Matte Lipstick Set</span>
                  <span className="font-bold">৳1,800</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#E9DED4] text-xs">
                <span className="text-[#666666]">Total Paid: <strong className="text-[#2F2F2F]">৳6,370</strong></span>
                <Link
                  href="/track-order?id=ANC-ORD-948102"
                  className="px-4 py-2 bg-[#C89C7A] text-white rounded-xl font-bold text-xs hover:bg-[#D4AF37] transition-all flex items-center space-x-1"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Track Parcel</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Addresses */}
        {activeTab === "addresses" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-lg font-bold text-[#2F2F2F]">Saved Bangladesh Addresses</h3>
              <button
                onClick={() => setShowAddAddressModal(true)}
                className="px-4 py-2 bg-[#C89C7A] text-white rounded-xl text-xs font-bold hover:bg-[#D4AF37] transition-all flex items-center space-x-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Address</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map((addr) => (
                <div key={addr.id} className="bg-white rounded-3xl p-6 border border-[#E9DED4] shadow-sm relative space-y-2">
                  {addr.isDefault && (
                    <span className="absolute top-4 right-4 text-[10px] font-bold bg-[#C89C7A]/20 text-[#C89C7A] border border-[#C89C7A]/40 px-2.5 py-0.5 rounded-full uppercase">
                      Default Address
                    </span>
                  )}
                  <h4 className="font-bold text-sm text-[#2F2F2F]">{addr.label}</h4>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    <strong>{addr.recipientName}</strong> ({addr.phone})<br />
                    {addr.details}, {addr.upazila}, {addr.district}, {addr.division}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content: Wishlist */}
        {activeTab === "wishlist" && (
          <div>
            {wishlist.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 border border-[#E9DED4] text-center">
                <p className="text-xs text-[#666666] mb-4">No saved items in your wishlist.</p>
                <Link href="/products" className="px-6 py-2.5 bg-[#C89C7A] text-white rounded-full text-xs font-bold">
                  Browse Catalog
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {wishlist.map((prod) => (
                  <div key={prod.id} className="bg-white p-4 rounded-2xl border border-[#E9DED4]">
                    <img src={prod.images[0]} alt={prod.name} className="w-full h-32 object-cover rounded-xl mb-2" />
                    <h5 className="font-bold text-xs text-[#2F2F2F] line-clamp-1">{prod.name}</h5>
                    <div className="text-xs font-extrabold text-[#C89C7A] mt-1">{formatPrice(prod.price, prod.currency)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Content: Profile */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E9DED4] shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#2F2F2F]">Account Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-[#666666] uppercase tracking-wider mb-1">Full Name</label>
                <input type="text" readOnly value={user?.name} className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#E9DED4] text-[#2F2F2F]" />
              </div>
              <div>
                <label className="block font-bold text-[#666666] uppercase tracking-wider mb-1">Email Address</label>
                <input type="email" readOnly value={user?.email} className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#E9DED4] text-[#2F2F2F]" />
              </div>
            </div>
          </div>
        )}

        {/* Add Address Modal */}
        {showAddAddressModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-[#E9DED4] shadow-2xl">
              <h3 className="font-serif text-lg font-bold text-[#2F2F2F] mb-4">Add Delivery Address</h3>
              <form onSubmit={handleAddAddress} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-[#2F2F2F] mb-1">Address Label</label>
                  <input type="text" required value={newAddr.label} onChange={(e) => setNewAddr({ ...newAddr, label: e.target.value })} className="w-full p-3 bg-[#FAF7F2] border rounded-xl" />
                </div>
                <div>
                  <label className="block font-bold text-[#2F2F2F] mb-1">Recipient Name *</label>
                  <input type="text" required value={newAddr.recipientName} onChange={(e) => setNewAddr({ ...newAddr, recipientName: e.target.value })} className="w-full p-3 bg-[#FAF7F2] border rounded-xl" />
                </div>
                <div>
                  <label className="block font-bold text-[#2F2F2F] mb-1">Phone Number *</label>
                  <input type="tel" required value={newAddr.phone} onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })} className="w-full p-3 bg-[#FAF7F2] border rounded-xl" />
                </div>
                <div>
                  <label className="block font-bold text-[#2F2F2F] mb-1">Address Details *</label>
                  <textarea required value={newAddr.details} onChange={(e) => setNewAddr({ ...newAddr, details: e.target.value })} className="w-full p-3 bg-[#FAF7F2] border rounded-xl" />
                </div>
                <div className="flex space-x-2 pt-2">
                  <button type="button" onClick={() => setShowAddAddressModal(false)} className="flex-1 py-3 bg-stone-100 rounded-xl font-bold">Cancel</button>
                  <button type="submit" className="flex-1 py-3 bg-[#C89C7A] text-white rounded-xl font-bold">Save Address</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
