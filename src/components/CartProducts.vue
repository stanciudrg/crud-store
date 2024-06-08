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
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style-type: none;
}
</style>
