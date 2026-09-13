"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import categoriesDataRaw from "@/data/categories.json";
import { Category } from "@/lib/types";

interface CategoriesContextType {
  categories: Category[];
  addCategory: (newCategory: Omit<Category, "id" | "productCount">) => Category;
  deleteCategory: (categoryId: string) => void;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export function CategoriesProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>(categoriesDataRaw as unknown as Category[]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("an_custom_categories");
      if (saved) {
        setCategories(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load custom categories from localStorage", e);
    }
  }, []);

  const saveCategories = (newList: Category[]) => {
    setCategories(newList);
    try {
      localStorage.setItem("an_custom_categories", JSON.stringify(newList));
    } catch (e) {
      console.error("Failed to save custom categories to localStorage", e);
    }
  };

  const addCategory = (catData: Omit<Category, "id" | "productCount">): Category => {
    const created: Category = {
      ...catData,
      id: `cat-${Date.now()}`,
      productCount: 0,
      slug: catData.slug || catData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      icon: catData.icon || "Grid",
    };

    const updated = [...categories, created];
    saveCategories(updated);
    return created;
  };

  const deleteCategory = (categoryId: string) => {
    const updated = categories.filter((c) => c.id !== categoryId);
    saveCategories(updated);
  };

  return (
    <CategoriesContext.Provider value={{ categories, addCategory, deleteCategory }}>
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }
  return context;
}
