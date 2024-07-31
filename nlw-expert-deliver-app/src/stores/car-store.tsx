import { ProductProps } from "@/utils/data/products";
import { create } from "zustand";
import * as cartInMemory from "@/stores/Functions/cart-in-memory";

export type ProductCartProps = ProductProps & {
  qnt: number;
};

type StateProps = {
  products: ProductCartProps[];
  add: (product: ProductProps) => void;
};

export const userCartStore = create<StateProps>((set) => ({
  products: [],

  add: (product: ProductProps) =>
    set((state) => ({
      products: cartInMemory.add(state.products, product),
    })),

}));
