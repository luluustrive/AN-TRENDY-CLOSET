"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface StoreSettings {
  shopName: string;
  shopTagline: string;
  hotline: string;
  announcement: string;
  supportEmail: string;
  currencySymbol: string;
}

const defaultSettings: StoreSettings = {
  shopName: "AN TRENDY CLOSET",
  shopTagline: "Premium Fashion & Tech Hub",
  hotline: "+880 1700-000000",
  announcement: "AN Marketplace Hub — Verified Sellers BD",
  supportEmail: "support@antrendycloset.com",
  currencySymbol: "৳",
};

interface StoreSettingsContextType {
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  resetSettings: () => void;
}

const StoreSettingsContext = createContext<StoreSettingsContextType | undefined>(undefined);

export function StoreSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<StoreSettings>(defaultSettings);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("an_store_settings");
      if (saved) {
        setSettings((prev) => ({ ...prev, ...JSON.parse(saved) }));
      }
    } catch (e) {
      console.error("Failed to load store settings from localStorage", e);
    }
  }, []);

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem("an_store_settings", JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save store settings to localStorage", e);
      }
      return updated;
    });
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    try {
      localStorage.removeItem("an_store_settings");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <StoreSettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </StoreSettingsContext.Provider>
  );
}

export function useStoreSettings() {
  const context = useContext(StoreSettingsContext);
  if (!context) {
    throw new Error("useStoreSettings must be used within a StoreSettingsProvider");
  }
  return context;
}
