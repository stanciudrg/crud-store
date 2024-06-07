<script setup>
import Product from "./Product.vue";
import { useProducts } from "../stores/products";

defineProps({
  products: Object,
});

const productsStore = useProducts();

function deleteProduct(product) {
  productsStore.deleteProduct(product.id);
}

function editProduct(product, newProps) {
  console.log(product, newProps);
  productsStore.updateProduct(product.id, {
    name: newProps.name,
    description: newProps.description,
    price: newProps.price,
  });
}
</script>

<template>
  <ul>
    <Product
      @request-delete="deleteProduct"
      @request-edit="editProduct"
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
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
