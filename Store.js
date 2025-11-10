import { create } from "zustand";

export const useDommy = create((set) => ({
  value: [],
  Cart: JSON.parse(localStorage.getItem("cart")) || [],
  Favorites: JSON.parse(localStorage.getItem("favorites")) || [], // ✅ Favorites state

  // ✅ Fetch products
  Fetchdata: async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      set({ value: data });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },

  // ✅ Add to Cart
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.Cart.find((item) => item.id === product.id);
      let updatedCart;

      if (existingItem) {
        updatedCart = state.Cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...state.Cart, { ...product, quantity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return { Cart: updatedCart };
    }),

  // ✅ Remove from Cart
  removeFromCart: (productId) =>
    set((state) => {
      const updatedCart = state.Cart.filter((item) => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { Cart: updatedCart };
    }),

  // ✅ Add / Remove from Favorites dynamically
  addToFavorite: (product) =>
    set((state) => {
      const isFav = state.Favorites.some((item) => item.id === product.id);
      let updatedFavorites;

      if (isFav) {
        // Remove if already favorite
        updatedFavorites = state.Favorites.filter((item) => item.id !== product.id);
      } else {
        // Add if not favorite
        updatedFavorites = [...state.Favorites, product];
      }

      // Save to localStorage
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      return { Favorites: updatedFavorites };
    }),
}));
