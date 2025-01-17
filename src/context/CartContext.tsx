import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

/**
 * Represents a single item in the shopping cart.
 *
 * @interface CartItem
 * @property {number} id - Unique identifier for the product.
 * @property {string} name - The name of the product.
 * @property {number} price - The price of the product.
 * @property {number} quantity - The quantity of the product added to the cart.
 * @property {string} image - The image URL of the product.
 */
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

/**
 * Defines the context API for the shopping cart, including operations
 * to manipulate the cart state.
 *
 * @interface CartContextType
 * @property {CartItem[]} cart - An array of items in the cart.
 * @property {function} addToCart - Function to add a product to the cart.
 * @property {function} updateQuantity - Function to update the quantity of a product in the cart.
 * @property {function} removeFromCart - Function to remove a product from the cart.
 */
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
}

/**
 * CartContext is a React Context that provides the shopping cart data and actions
 * (add, update, remove) to the components that subscribe to it.
 *
 * It is initialized with an empty cart or a cart loaded from localStorage.
 */
const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * A React provider component that provides the cart context to its children.
 * 
 * This component manages the state of the cart, loads it from localStorage on initial mount, 
 * and saves it back to localStorage whenever the cart changes.
 *
 * @param {ReactNode} children - The child components that can access the cart context.
 */
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Hiba a localStorage betöltésekor:", error);
      return [];
    }
  });

  // Update localStorage whenever the cart changes.
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /**
   * Adds a product to the cart. If the product already exists in the cart, 
   * its quantity is increased by 1. If it is a new product, it is added to the cart 
   * with a quantity of 1.
   *
   * @param {CartItem} product - The product to add to the cart.
   */
  const addToCart = (product: CartItem) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  /**
   * Updates the quantity of an item in the cart. The quantity is set to the specified 
   * value, but will not go below 1.
   *
   * @param {number} id - The ID of the product to update.
   * @param {number} quantity - The new quantity for the product.
   */
  const updateQuantity = (id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    );
  };

  /**
   * Removes a product from the cart.
   *
   * @param {number} id - The ID of the product to remove from the cart.
   */
  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const value = React.useMemo(() => ({ cart, addToCart, updateQuantity, removeFromCart }), [cart]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

/**
 * Custom hook to access the cart context.
 * 
 * This hook provides access to the current cart and the functions to add, update, or remove products.
 * It throws an error if used outside of a CartProvider.
 *
 * @returns {CartContextType} The cart data and functions.
 * @throws {Error} If the hook is used outside of a CartProvider.
 */
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
