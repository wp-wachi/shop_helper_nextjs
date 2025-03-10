// src/lib/productService.ts
import { realtimeDB } from "./firebaseConfig";
import { ref, get, update, remove } from "firebase/database";
import { Product } from "@/types/product";

// Fetch a single product by ID
export const getProductById = async (productId: string): Promise<Product> => {
  const productRef = ref(realtimeDB, `products/${productId}`);
  const snapshot = await get(productRef);

  if (snapshot.exists()) {
    const productData = snapshot.val();
    return { ...productData, id: productId } as Product;
  } else {
    throw new Error("Product not found");
  }
};

// Update a product by ID
export const updateProduct = async (
  productId: string,
  productData: Product
) => {
  console.log("productData", productId);
  const productRef = ref(realtimeDB, `products/${productId}`);
  await update(productRef, productData);
};

// Delete a product by ID
export const deleteProduct = async (productId: string) => {
  const productRef = ref(realtimeDB, `products/${productId}`);
  await remove(productRef);
};
