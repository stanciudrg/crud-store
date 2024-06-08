<script setup>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import { useProducts } from "./stores/products";
import { useCart } from "./stores/cart";

const productsStore = useProducts();
const cart = useCart();

productsStore.$subscribe((mutation, state) => {
  localStorage.setItem("sortMethod", JSON.stringify(state.sortMethod));
  localStorage.setItem("products", JSON.stringify(state.products));
});

cart.$subscribe((mutation, state) => {
  localStorage.setItem("cart", JSON.stringify(state.cartProducts));
});
</script>

<template>
  <Header />
  <RouterView />
</template>

<style scoped></style>
