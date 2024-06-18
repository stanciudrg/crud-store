<script setup>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import { useProducts } from "./stores/products";
import { useCart } from "./stores/cart";
import { onMounted } from "vue";

// State managers for store products and cart products
const productsStore = useProducts();
const cart = useCart();

// Update in memory values with data from MongoDB
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
