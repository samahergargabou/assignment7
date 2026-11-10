import { create } from 'zustand';

function loadInitialCart() {
  try {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
    return [];
  }
}

export const useCartStore = create((set) => ({
  items: loadInitialCart(),

  addItem: (product) => {
    set((state) => {
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return {
        items: [
          ...state.items,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1,
          },
        ],
      };
    });
  },

  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  setQuantity: (id, quantity) => {
    set((state) => {
      if (quantity < 1) {
        return {
          items: state.items.filter((item) => item.id !== id),
        };
      }
      return {
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    });
  },

  clear: () => set({ items: [] }),
}));

// Sauvegarde synchrone hors React
useCartStore.subscribe((state) => {
  try {
    localStorage.setItem('cart', JSON.stringify(state.items));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
});