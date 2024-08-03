import { ProductProps } from "@/utils/data/products";
import { ProductCartProps } from "../car-store";

export function add(products: ProductCartProps[], newProduct: ProductProps) {
  const existingProduct = products.find(({ id }) => newProduct.id === id);

  // Verificar se ja existir um produto igual no carrinho ira simples mento inrementar mais 1
  //
  if (existingProduct) {
    return products.map((product) =>
      product.id === existingProduct.id
        ? { ...product, qnt: product.qnt + 1 }
        : product
    );
  }

  return [...products, { ...newProduct, qnt: 1 }];
}

export function remove(products: ProductCartProps[], productRemoveId: string) {
  const updatedProducts = products.map((product) =>
    product.id === productRemoveId
      ? {
          ...product,
          qnt: product.qnt > 1 ? product.qnt - 1 : 0,
        }
      : product
  );

  return updatedProducts.filter((product) => product.qnt > 0);
}
