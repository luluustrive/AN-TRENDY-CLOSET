"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem, CartState, Product } from "./types";
import { useToast } from "./toast-context";

const CartContext = createContext<CartState | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { showToast } = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("an_trendy_cart");
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("an_trendy_cart", JSON.stringify(items));
      } catch (e) {
        console.error("Failed to save cart to localStorage", e);
      }
    }
  }, [items, isLoaded]);

  const addItem = (product: Product, quantity: number = 1, color?: string, size?: string) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            product,
            quantity,
            selectedColor: color || (product.colors?.[0]?.name ?? undefined),
            selectedSize: size || (product.sizes?.[0] ?? undefined),
          },
        ];
      }
    });

    showToast({
      title: "Added to Cart",
      description: `${quantity}x ${product.name} added to your shopping bag.`,
      type: "success",
      image: product.images[0]
    });
  };

  const removeItem = (productId: string) => {
    const itemToRemove = items.find((i) => i.product.id === productId);
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
    if (itemToRemove) {
      showToast({
        title: "Removed from Cart",
        description: `${itemToRemove.product.name} removed from your bag.`,
        type: "info",
      });
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
