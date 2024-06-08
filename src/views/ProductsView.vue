<script setup>
import { useProducts } from "../stores/products";
import AddProductBtn from "../components/AddProductBtn.vue";
import AddProductForm from "../components/AddProductForm.vue";
import Products from "../components/Products.vue";
import { ref, watch } from "vue";

const productsStore = useProducts();

let isFormVisible = ref(false);

function addProduct(product) {
  hideForm();

  productsStore.addProduct(
    product.name,
    product.description,
    product.price || 0
  );
}

function showForm() {
  isFormVisible.value = true;

  window.addEventListener(
    "keyup",
    (e) => {
      if (e.key == "Escape") hideForm();
    },
    { once: true }
  );
}

function hideForm() {
  isFormVisible.value = false;
}
</script>

<template>
  <div class="products-view">
    <AddProductBtn @click="showForm" />
    <AddProductForm
      @clicked-outside="hideForm"
      @form-submit="addProduct"
      v-if="isFormVisible"
    />
    <Products :products="productsStore.sortedProducts" />
  </div>
</template>

<style scoped>
.products-view {
  max-width: 1300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
  margin-top: 4rem;
  margin-bottom: 4rem;
}
</style>
