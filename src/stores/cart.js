import { ref, watch, computed } from "vue";
import { defineStore } from "pinia";

export const useCart = defineStore("cart", () => {
  const cartProducts = ref(JSON.parse(localStorage.getItem("cart") || "[]"));

  function findCartProduct(productID) {
    return cartProducts.value.find((product) => product.id === productID);
  }

  function addToCart(product) {
    const existingProduct = findCartProduct(product.id);

    if (existingProduct) {
      return (existingProduct.quantity += 1);
    }

    cartProducts.value.push({ ...product, quantity: 1 });
  }

  function updateCartProduct(productToUpdate, newValues) {
    for (const [key, newValue] of Object.entries(newValues)) {
      if (productToUpdate.hasOwnProperty(key)) productToUpdate[key] = newValue;
    }
  }

  function increaseProductQuantity(productID) {
    const productToIncreaseQuantity = cartProducts.value.find(
      (product) => product.id === productID
    );

    if (!productToIncreaseQuantity) return;

    productToIncreaseQuantity.quantity += 1;
  }

  function reduceProductQuantity(productID) {
    const productToReduceQuantity = cartProducts.value.find(
      (product) => product.id === productID
    );

    if (!productToReduceQuantity) return;

    productToReduceQuantity.quantity -= 1;

    if (productToReduceQuantity.quantity === 0) {
      removeCartProduct(productToReduceQuantity.id);
    }
  }

  function removeCartProduct(productToDelete) {
    const index = cartProducts.value.indexOf(productToDelete);
    cartProducts.value.splice(index, 1);
  }

  const totalPrice = computed(() => {
    return cartProducts.value.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  });

  const totalQuantity = computed(() => {
    return cartProducts.value.reduce(
      (total, product) => total + product.quantity,
      0
    );
  });

  return {
    cartProducts,
    findCartProduct,
    addToCart,
    updateCartProduct,
    increaseProductQuantity,
    reduceProductQuantity,
    removeCartProduct,
    totalPrice,
    totalQuantity,
  };
});
