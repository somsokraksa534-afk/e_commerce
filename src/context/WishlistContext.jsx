import React, { createContext, useContext, useReducer, useEffect } from "react";
import toast from "react-hot-toast";

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST": {
      if (state.items.some((item) => item.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    case "REMOVE_FROM_WISHLIST": {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }

    case "LOAD_WISHLIST": {
      return {
        ...state,
        items: action.payload || [],
      };
    }

    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, {
    items: [],
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("wishlist");
      if (saved) {
        const parsed = JSON.parse(saved);
        const itemsToLoad = parsed?.items || [];
        dispatch({ type: "LOAD_WISHLIST", payload: itemsToLoad });
      }
    } catch (error) {
      console.error("Error loading wishlist from localStorage:", error);
      dispatch({ type: "LOAD_WISHLIST", payload: [] });
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(state));
    } catch (error) {
      console.error("Error saving wishlist to localStorage:", error);
    }
  }, [state]);

  const addToWishlist = (product) => {
    dispatch({ type: "ADD_TO_WISHLIST", payload: product });
    toast.success("Added to wishlist");
  };

  const removeFromWishlist = (productId) => {
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: productId });
    toast.success("Removed from wishlist");
  };

  const isInWishlist = (productId) => {
    return state.items.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist: state,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
