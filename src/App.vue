<script setup>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import { useProducts } from "./stores/products";
import { useCart } from "./stores/cart";
import { onMounted } from "vue";

const productsStore = useProducts();
const cart = useCart();

onMounted(() => {
  productsStore.fetchSortMethod();
  productsStore.fetchProducts();
  cart.fetchCartProducts();
});
</script>

<template>
  <Header />
  <RouterView />
</template>

<style scoped></style>
