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

const isNameProvided = ref(true);

const editModeProps = {};

let editMode = ref(false);

function checkNameInput(e) {
  isNameProvided.value = e.target.value.length > 0;
}

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
    <div v-if="editMode" class="form-control name-input">
      <label>Name</label>
      <textarea
        @input="checkNameInput"
        v-model.trim="editModeProps.name"
        placeholder="Product name"
      ></textarea>
    </div>
    <div v-else class="name">{{ product.name }}</div>
    <div v-if="editMode" class="form-control description-input">
      <label>Description</label>
      <textarea
        v-model.trim="editModeProps.description"
        placeholder="Product description"
      ></textarea>
    </div>
    <div v-else class="description">{{ product.description }}</div>
    <div v-if="editMode" class="form-control price-input form-control-check">
      <label>Price</label>
      <input
        type="number"
        v-model.trim="editModeProps.price"
        name="price"
        placeholder="Product price ($)"
      />
    </div>
    <div v-else class="price">
      {{ product.price ? product.price + " " + "$" : "Free" }}
    </div>
    <div class="product-controls">
      <CancelEditBtn v-if="editMode" @click="disableEditMode" />
      <DeleteProductBtn v-else @click="$emit('request-delete', product)" />

      <EditProductBtn
        v-if="editMode"
        @click="handleApplyEdit(product)"
        :disabled="!isNameProvided"
      />
      <ToggleEditBtn v-else @click="enableEditMode" />
    </div>
  </li>
</template>

<style scoped>
li {
  display: flex;
  flex-direction: column;
  color: rgb(25, 25, 25);
  background-color: rgb(250, 250, 250);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 5px 10px 0 rgba(29, 29, 31, 0.04);
  border: 1px solid rgba(29, 29, 31, 0.2);
}

li div {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow-wrap: break-word;
  overflow: hidden;
  word-break: break-word;
}

.name {
  font-weight: 600;
  font-size: 22px;
  padding: 1.5rem 1.5rem 0 1.5rem;
  -webkit-line-clamp: 3;
}

.description,
.price {
  font-size: 18px;
  padding: 0 1.5rem;
}

.description {
  margin-top: 1rem;
  -webkit-line-clamp: 5;
}

.price {
  font-weight: 600;
  margin-top: auto;
  margin-bottom: 1.5rem;
  -webkit-line-clamp: 1;
}

.name-input,
.description-input,
.price-input {
  background-color: white;
  outline: 1px solid rgba(25, 25, 25, 0.2);
}

.name-input,
.description-input {
  flex: 1;
  scrollbar-gutter: stable;
  padding: 0.5rem 0 0.5rem 0.5rem;
}

.name-input {
  font-weight: 600;
  font-size: 22px;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  margin: 1rem 1rem 0 1rem;
}

.description-input,
.price-input {
  font-size: 18px;
  margin-top: 0.5rem;
  margin-right: 1rem;
  margin-left: 1rem;
}

.price-input {
  font-weight: 600;
  margin-bottom: 1rem;
  padding: 0.5rem;
}

textarea,
input {
  width: 100%;
  font-weight: inherit;
  border: 0;
  outline: none;
}

textarea {
  height: 100%;
  display: block;
  resize: none;
  white-space: break-spaces;
  padding-right: 8px;
  overflow: auto;
}

textarea::-webkit-scrollbar {
  width: 7px;
  background: rgb(230, 230, 230);
}

textarea::-webkit-scrollbar-thumb {
  background: rgb(25, 25, 25);
  cursor: default;
}

textarea::-webkit-scrollbar-thumb:hover {
  background-color: rgb(45, 45, 45);
}

.product-controls {
  display: flex;
  gap: 2px;
}

.product-controls button {
  width: 100%;
  background-color: rgb(25, 25, 25);
  color: rgb(250, 250, 250);
  border-radius: 0;
}

.product-controls button:disabled {
  cursor: not-allowed;
  background-color: rgb(200, 200, 200);
}

.product-controls button:enabled:hover {
  background-color: rgb(45, 45, 45);
}
</style>
