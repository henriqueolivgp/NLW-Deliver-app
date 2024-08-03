import { ProductProps } from "@/utils/data/products";
import { create } from "zustand";
import * as cartInMemory from "@/stores/Functions/cart-in-memory";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";

export type ProductCartProps = ProductProps & {
  qnt: number;
};

type StateProps = {
  products: ProductCartProps[];
  add: (product: ProductProps) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

export const userCartStore = create(
  persist<StateProps>(
    (set) => ({
      products: [],

      add: (product: ProductProps) =>
        set((state) => ({
          products: cartInMemory.add(state.products, product),
        })),

      remove: (producId: string) =>
        set((state) => ({
          products: cartInMemory.remove(state.products, producId),
        })),

      clear: () => set(() => ({ products: [] })),
    }),
    {
      name: "nlw-expert:cart",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
