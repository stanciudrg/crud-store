<script setup>
import { useProducts } from "../stores/products";
import AddProductBtn from "../components/AddProductBtn.vue";
import AddProductForm from "../components/AddProductForm.vue";
import Products from "../components/Products.vue";
import { ref, watch } from "vue";

// The "Products" page of the application, which is also the homepage ("/").
// Has its on memory data managed by Pinia's products.js.

const productsStore = useProducts();

// Represents the current state of the formModal (open vs closed)
let isFormVisible = ref(false);

// Closes the formModal after submit and adds the product into the products store
function addProduct(product) {
  hideForm();

  productsStore.addProduct(
    product.name,
    product.description,
    product.price || 0
  );
}

// Opens the formModal
function showForm() {
  isFormVisible.value = true;

  // Close the modal when user presses the Escape key
  window.addEventListener(
    "keyup",
    (e) => {
      if (e.key == "Escape") hideForm();
    },
    { once: true }
  );
}

// Hides the form modal
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
  margin-top: 4rem;
  margin-bottom: 4rem;
}
</style>
