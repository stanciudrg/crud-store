<script setup>
import { useProducts } from "../stores/products";

defineProps({
  name: String,
  description: String,
  price: Number,
});

const name = defineModel("name");
const description = defineModel("description");
const price = defineModel("price");

const productsStore = useProducts();

function addProduct() {
  productsStore.addProduct(this.name, this.description, this.price);
  this.name = "";
  this.description = "";
  this.price = "";
}
</script>

<template>
  <form @submit.prevent="() => addProduct()" class="add-product">
    <div class="form-control">
      <label>Name</label>
      <input
        type="text"
        v-model="name"
        name="text"
        placeholder="Product name"
      />
    </div>
    <div class="form-control">
      <label>Description</label>
      <textarea
        v-model="description"
        placeholder="Product description"
      ></textarea>
    </div>
    <div class="form-control form-control-check">
      <label>Price</label>
      <input
        type="number"
        v-model="price"
        name="price"
        placeholder="Product price"
      />
    </div>
    <input type="submit" value="Add product" />
  </form>
</template>

<style scoped></style>
