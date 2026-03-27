import React, { createContext, useContext, useReducer, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.selectedSize === action.payload.selectedSize &&
          item.selectedColor === action.payload.selectedColor,
      );

      let updatedItems;
      if (existingItemIndex >= 0) {
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity:
            updatedItems[existingItemIndex].quantity + action.payload.quantity,
        };
      } else {
        updatedItems = [...state.items, action.payload];
      }

      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      const newItemCount = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );

      // Remove toast from reducer - move to action
      return {
        items: updatedItems,
        total: newTotal,
        itemCount: newItemCount,
      };
    }

    case "REMOVE_FROM_CART": {
      const updatedItems = state.items.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.selectedSize === action.payload.selectedSize &&
            item.selectedColor === action.payload.selectedColor
          ),
      );
      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      const newItemCount = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      return {
        items: updatedItems,
        total: newTotal,
        itemCount: newItemCount,
      };
    }

    case "UPDATE_QUANTITY": {
      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id &&
        item.selectedSize === action.payload.selectedSize &&
        item.selectedColor === action.payload.selectedColor
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item,
      );
      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      const newItemCount = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      return {
        items: updatedItems,
        total: newTotal,
        itemCount: newItemCount,
      };
    }

    case "CLEAR_CART":
      return {
        items: [],
        total: 0,
        itemCount: 0,
      };

    case "LOAD_CART": {
      const items = action.payload || [];
      const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
      return {
        items: items,
        total: total,
        itemCount: itemCount,
      };
    }

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
  });

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        let itemsToLoad = [];
        if (parsed.items) {
          itemsToLoad = parsed.items;
        } else if (Array.isArray(parsed)) {
          itemsToLoad = parsed;
        }
        dispatch({ type: "LOAD_CART", payload: itemsToLoad });
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      dispatch({ type: "LOAD_CART", payload: [] });
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify({ items: state.items }));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [state.items]);

  const addToCart = (product, quantity, size, color) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...product,
        quantity,
        selectedSize: size,
        selectedColor: color,
      },
    });
    toast.success("Added to cart!");
  };

  const removeFromCart = (id, size, color) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { id, selectedSize: size, selectedColor: color },
    });
    toast.success("Removed from cart");
  };

  const updateQuantity = (id, quantity, size, color) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id, quantity, selectedSize: size, selectedColor: color },
    });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    toast.success("Cart cleared");
  };

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
