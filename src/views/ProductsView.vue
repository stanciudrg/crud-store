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
  if (isAddProductFormVisible.value)
    window.addEventListener(
      "keyup",
      (e) => {
        if (e.key == "Escape") isAddProductFormVisible.value = false;
      },
      { once: true }
    );
}
</script>

<template>
  <div class="products-view">
    <AddProductBtn @toggle-add-product="toggleAddProduct" />
    <AddProductForm
      @product-added="toggleAddProduct"
      v-show="isAddProductFormVisible"
    />
    <Products :products="productsStore.products" />
  </div>
</template>

<style scoped>
.products-view {
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
  max-width: 1300px;
  width: 100%;
}
</style>
