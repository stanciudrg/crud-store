<script setup>
import Product from "./Product.vue";

defineProps({
  products: Object,
});
</script>

<template>
  <ul>
    <Product v-for="product in products" :key="product.id" :product="product" />
  </ul>
</template>

<style scoped>
ul {
  display: flex;
  gap: 2rem;
  list-style-type: none;
  padding: 0;
}
</style>
