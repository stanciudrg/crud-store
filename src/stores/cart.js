import { defineStore } from "pinia";

export const useCart = defineStore("cart", () => {
  const cartProducts = ref([]);
  const nextID = ref(0);

  function findProduct(id) {
    return this.cartProducts.find((product) => (product.id = id));
  }

  function addToCart(name, price, id) {
    const isAlreadyAdded = findProduct(id);
    if (isAlreadyAdded) return increaseQuantity(isAlreadyAdded);

    const productToAdd = {
      name,
      price,
      id,
      quantity: 1,
    };

    this.cartProducts.push(productToAdd);
  }

  function increaseQuantity(product) {
    const productToIncrease = findProduct(product.id);
    productToIncrease.quantity = productToIncrease.quantity + 1;
  }

  function removeFromCart(product) {
    const productToRemove = this.cartProducts.find(
      (item) => (item.id = product.id)
    );

    if (!productToRemove) return;

    const index = this.cartProducts.indexOf(productToRemove);
    this.cartProducts.splice(index, 1);
  }
});
