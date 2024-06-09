<script setup>
import { useProducts } from "../stores/products";
import { computed, ref, reactive, defineEmits } from "vue";
import AddToCartBtn from "./AddToCartBtn.vue";
import EditProductBtn from "./EditProductBtn.vue";
import DeleteProductBtn from "./DeleteProductBtn.vue";
import ToggleEditBtn from "./ToggleEditBtn.vue";
import CancelEditBtn from "./CancelEditBtn.vue";

const emit = defineEmits([
  "request-add-to-cart",
  "request-delete",
  "request-edit",
]);

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
        maxlength="10"
        max="1000000"
        min="0"
      />
    </div>
    <div v-else class="price">
      {{ product.price ? product.price + " " + "$" : "Free" }}
    </div>
    <AddToCartBtn
      @click="$emit('request-add-to-cart', product)"
      v-if="!editMode"
      class="add-to-cart"
      name="Add to cart"
    />
    <div class="product-controls">
      <CancelEditBtn
        class="cancel-edit"
        v-if="editMode"
        @click="disableEditMode"
      />
      <DeleteProductBtn
        class="delete-product"
        v-else
        @click="$emit('request-delete', product)"
      />
      <EditProductBtn
        class="apply-edit"
        v-if="editMode"
        @click="handleApplyEdit(product)"
        :disabled="!isNameProvided"
      />
      <ToggleEditBtn class="start-edit" v-else @click="enableEditMode" />
    </div>
  </li>
</template>

<style scoped>
li {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: rgb(250, 250, 250);
  color: rgb(25, 25, 25);
  border: 1px solid rgba(29, 29, 31, 0.2);
  border-radius: 1rem;
  box-shadow: 0 5px 10px 0 rgba(29, 29, 31, 0.04);
}

li div {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow-wrap: break-word;
  overflow: hidden;
  word-break: break-word;
}

.name {
  font-size: 22px;
  font-weight: 600;
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
  max-width: 230px;
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
  font-size: 22px;
  font-weight: 600;
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
  padding-right: 8px;
  resize: none;
  white-space: break-spaces;
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

.add-to-cart {
  position: absolute;
  bottom: 88px;
  right: 16px;
  font-size: 14px;
  padding: 0.5rem 1rem;
}

.add-to-cart:hover {
  background-color: rgb(230, 230, 230);
}

.product-controls {
  display: flex;
  gap: 4px;
  padding: 0 1rem 1rem 1rem;
}

.product-controls button {
  width: 100%;
  background-color: rgb(25, 25, 25);
  color: rgb(250, 250, 250);
}

.delete-product,
.cancel-edit {
  border-bottom-left-radius: 0.5rem;
}

.start-edit,
.apply-edit {
  border-bottom-right-radius: 0.5rem;
}

.product-controls button:disabled {
  cursor: not-allowed;
  background-color: rgb(200, 200, 200);
}

.product-controls button:enabled:hover {
  background-color: rgb(45, 45, 45);
}
</style>
