"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product, WishlistState } from "./types";
import { useToast } from "./toast-context";

const WishlistContext = createContext<WishlistState | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("an_trendy_wishlist");
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (e) {
      console.error("Failed to load wishlist from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("an_trendy_wishlist", JSON.stringify(wishlist));
      } catch (e) {
        console.error("Failed to save wishlist to localStorage", e);
      }
    }
  }, [wishlist, isLoaded]);

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const addToWishlist = (product: Product) => {
    if (!isInWishlist(product.id)) {
      setWishlist((prev) => [...prev, product]);
      showToast({
        title: "Added to Wishlist",
        description: `${product.name} saved to your favorites.`,
        type: "success",
        image: product.images[0]
      });
    }
  };

  const removeFromWishlist = (productId: string) => {
    const itemToRemove = wishlist.find((p) => p.id === productId);
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
    if (itemToRemove) {
      showToast({
        title: "Removed from Wishlist",
        description: `${itemToRemove.name} removed from your favorites.`,
        type: "info",
      });
    }
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
