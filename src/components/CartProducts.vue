<script setup>
import CartProduct from "./CartProduct.vue";
import { useCart } from "../stores/cart";

defineProps({
  cartProducts: Object,
});

const cart = useCart();

function reduceQuantity(cartProduct) {
  cart.reduceProductQuantity(cartProduct.id);
}

function increaseQuantity(cartProduct) {
  cart.increaseProductQuantity(cartProduct.id);
}

function removeFromCart(cartProduct) {
  cart.removeCartProduct(cartProduct);
}
</script>

<template>
  <ul class="cart-products">
    <CartProduct
      @request-reduce-quantity="reduceQuantity"
      @request-increase-quantity="increaseQuantity"
      @request-remove-from-cart="removeFromCart"
      v-for="cartProduct in cartProducts"
      :key="cartProduct.id"
      :cartProduct="cartProduct"
    />
  </ul>
</template>

<style scoped>
ul {
  width: 100%;
  display: flex;
  flex-direction: column;
  list-style-type: none;
  gap: 1rem;
}
</style>
