import { create } from 'zustand';

export interface CartProduct {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
}

interface CartStore {
  products: CartProduct[];
  addProduct: (product: Omit<CartProduct, 'quantidade'>) => void;
  removeProduct: (id: string) => void;
  updateQuantity: (id: string, quantidade: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>((set) => ({
  products: [],

  addProduct: (product) => set((state) => {
    const existingProduct = state.products.find((p) => p.id === product.id);

    if (existingProduct) {
      return {
        products: state.products.map((p) =>
          p.id === product.id
            ? { ...p, quantidade: p.quantidade + 1 }
            : p
        ),
      };
    }

    return {
      products: [...state.products, { ...product, quantidade: 1 }],
    };
  }),

  removeProduct: (id) => set((state) => ({
    products: state.products.filter((p) => p.id !== id),
  })),

  updateQuantity: (id, quantidade) => set((state) => {
    if (quantidade <= 0) {
      return {
        products: state.products.filter((p) => p.id !== id),
      };
    }

    return {
      products: state.products.map((p) =>
        p.id === id ? { ...p, quantidade } : p
      ),
    };
  }),

  clearCart: () => set({ products: [] }),
}));

// Seletores reativos para usar nos componentes
export const useTotalItems = () => useCart((state) =>
  state.products.reduce((total, product) => total + product.quantidade, 0)
);

export const useTotalPrice = () => useCart((state) =>
  state.products.reduce((total, product) => total + product.preco * product.quantidade, 0)
);
