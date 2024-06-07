<script setup>
import { useProducts } from "../stores/products";
import { computed, ref, reactive, defineEmits } from "vue";
import EditProductBtn from "./EditProductBtn.vue";
import DeleteProductBtn from "./DeleteProductBtn.vue";
import ToggleEditBtn from "./ToggleEditBtn.vue";
import CancelEditBtn from "./CancelEditBtn.vue";

const emit = defineEmits(["request-delete", "request-edit"]);

const props = defineProps({
  product: Object,
});

const editModeProps = {};

let editMode = ref(false);

function updateEditModeProps() {
  editModeProps.name = props.product.name;
  editModeProps.description = props.product.description;
  editModeProps.price = props.product.price;
}

function enableEditMode() {
  updateEditModeProps();
  editMode.value = true;
}

function disableEditMode() {
  editMode.value = false;
}

function handleApplyEdit(product) {
  emit("request-edit", product, editModeProps);
  disableEditMode();
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
        v-model="editModeProps.name"
      />
    </div>
    <div v-else class="name">{{ product.name }}</div>
    <div v-if="editMode" class="form-control">
      <label>Description</label>
      <textarea
        v-model="editModeProps.description"
        placeholder="Product description"
      ></textarea>
    </div>
    <div v-else class="description">{{ product.description }}</div>
    <div v-if="editMode" class="form-control form-control-check">
      <label>Price</label>
      <input
        type="number"
        v-model="editModeProps.price"
        name="price"
        placeholder="Product price"
      />
    </div>
    <div v-else class="price">{{ product.price + " " + "$" }}</div>
    <div class="product-controls">
      <CancelEditBtn v-if="editMode" @click="disableEditMode" />
      <DeleteProductBtn v-else @click="$emit('request-delete', product)" />

      <EditProductBtn v-if="editMode" @click="handleApplyEdit(product)" />
      <ToggleEditBtn v-else @click="enableEditMode" />
    </div>
  </li>
</template>

<style scoped>
li {
  gap: 20px;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  color: black;
  box-shadow: 0px 0px 50px 0px rgba(29, 29, 31, 0.1);
  border-radius: 2rem;
  justify-content: space-between;
}

li div {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  overflow-wrap: break-word;
  word-break: break-word;
}

.form-control {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-control input,
.form-control textarea {
  padding: 0.5rem;
}

.product-controls {
  display: flex;
  gap: 1rem;
}

.product-controls button {
  width: 100%;
  background-color: black;
  color: white;
}
</style>
