import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | AN Trendy Closet",
  description: "Enterprise Management Panel for AN Trendy Closet e-commerce platform.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2F2F2F] antialiased">
      {children}
    </div>
  );
}
