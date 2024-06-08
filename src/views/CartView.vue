<script setup>
import CartProducts from "../components/CartProducts.vue";
import CartInfo from "../components/CartInfo.vue";
import { useCart } from "../stores/cart";

const cart = useCart();
</script>

<template>
  <div class="cart-view">
    <CartProducts :cartProducts="cart.cartProducts" />
    <CartInfo />
  </div>
</template>

<style scoped></style>
