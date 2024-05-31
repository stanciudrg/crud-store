<script setup>
import { useProducts } from "../stores/products";
import { computed, ref } from "vue";
import EditProductBtn from "./EditProductBtn.vue";
import DeleteProductBtn from "./DeleteProductBtn.vue";
import ToggleEditBtn from "./ToggleEditBtn.vue";
import CancelEditBtn from "./CancelEditBtn.vue";

defineProps({
  product: Object,
});

let name = ref("");
let description = ref("");
let price = ref("");

const productsStore = useProducts();

let editMode = ref(false);

function toggleEditMode(product) {
  editMode.value = true;
  name.value = product.name;
  description.value = product.description;
  price.value = product.price;
}

function deleteProduct(product) {
  productsStore.deleteProduct(product.id);
}

function cancelEdit() {
  editMode.value = false;
}

function editProduct(product) {
  productsStore.updateProduct(product.id, {
    name: name.value,
    description: description.value,
    price: price.value,
  });
  cancelEdit();
}
</script>

<template>
  <li class="product">
    <div v-if="editMode" class="form-control">
      <label>Name</label>
      <input
        type="text"
        name="text"
        placeholder="Product name"
        v-model="name"
      />
    </div>
    <div v-else class="name">{{ product.name }}</div>
    <div v-if="editMode" class="form-control">
      <label>Description</label>
      <textarea
        v-model="description"
        placeholder="Product description"
      ></textarea>
    </div>
    <div v-else class="description">{{ product.description }}</div>
    <div v-if="editMode" class="form-control form-control-check">
      <label>Price</label>
      <input
        type="number"
        v-model="price"
        name="price"
        placeholder="Product price"
      />
    </div>
    <div v-else class="price">{{ product.price + " " + "$" }}</div>
    <div class="product-controls">
      <CancelEditBtn v-if="editMode" @cancel-edit="cancelEdit" />
      <DeleteProductBtn v-else @delete-product="deleteProduct(product)" />

      <EditProductBtn v-if="editMode" @edit-product="editProduct(product)" />
      <ToggleEditBtn v-else @toggle-edit-product="toggleEditMode(product)" />
    </div>
  </li>
</template>

<style scoped>
li {
  gap: 20px;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: black;
  color: white;
}

.product-controls {
  display: flex;
  gap: 1rem;
}
</style>
