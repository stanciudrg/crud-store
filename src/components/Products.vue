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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
  list-style-type: none;
  padding: 0;
}
</style>
