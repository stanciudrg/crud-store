<script setup>
import { useProducts } from "../stores/products";
import AddProductBtn from "../components/AddProductBtn.vue";
import AddProductForm from "../components/AddProductForm.vue";
import Products from "../components/Products.vue";
import { ref } from "vue";

let isAddProductFormVisible = ref(false);
const productsStore = useProducts();

productsStore.$subscribe((mutation, state) => {
  localStorage.setItem("products", JSON.stringify(state.products));
});

function toggleAddProduct() {
  isAddProductFormVisible.value = !isAddProductFormVisible.value;
}
</script>

<template>
  <AddProductBtn @toggle-add-product="toggleAddProduct" />
  <AddProductForm v-show="isAddProductFormVisible" />
  <Products :products="productsStore.products" />
</template>
