import { ProductType } from "@/types/product";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";

interface CartStore {
  items: ProductType[];
  addItem: (data: ProductType) => void;
  removeItem: (id: number) => void;
  removeAll: () => void;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: ProductType) => {
        const currrentItems = get().items;
        const existingItem = currrentItems.find((item) => item.id === data.id);

        if (existingItem) {
          return toast("Este producto ya está en el carrito", {
            description: "No se añadió nuevamente.",
          });
        }

        set({ items: [...get().items, data] });
        toast("Producto añadido", {
          description: "Se agregó correctamente al carrito.",
        });
      },

      removeItem: (id: number) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast("Producto eliminado", {
          description: "Se quitó del carrito.",
        });
      },

      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
