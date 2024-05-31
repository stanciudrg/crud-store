<script setup>
import { useProducts } from "../stores/products";

defineProps({
  name: String,
  description: String,
  price: Number,
});
defineEmits(["product-added"]);

const name = defineModel("name");
const description = defineModel("description");
const price = defineModel("price");

const productsStore = useProducts();

function addProduct() {
  productsStore.addProduct(this.name, this.description, this.price || 0);
  this.name = "";
  this.description = "";
  this.price = "";
}
</script>

<template>
  <form
    @click.self="$emit('product-added')"
    @submit.prevent="() => addProduct()"
    class="add-product"
  >
    <fieldset>
      <div class="form-control">
        <label>Name</label>
        <input type="text" v-model="name" name="text" required="required" />
      </div>
      <div class="form-control">
        <label>Description</label>
        <textarea v-model="description"></textarea>
      </div>
      <div class="form-control form-control-check">
        <label>Price ($)</label>
        <input
          type="number"
          min="0"
          max="1000000"
          v-model="price"
          name="price"
        />
      </div>
      <input
        type="submit"
        @click="$emit('product-added')"
        value="Add product"
        :disabled="!name"
      />
    </fieldset>
  </form>
</template>

<style scoped>
form {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
}

fieldset {
  border: 0;
  max-width: 350px;
  width: 100%;
  margin: 4rem auto 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
  padding: 2rem;
  box-shadow: 0px 0px 50px 0px rgba(29, 29, 31, 0.3);
  border-radius: 2rem;
}

fieldset > div {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

fieldset input,
fieldset textarea {
  padding: 0.5rem;
}

fieldset input[type="submit"] {
  width: 100%;
  background-color: black;
  color: white;
  border-radius: 2rem;
}

fieldset input[type="submit"]:disabled {
  background-color: grey;
}
</style>
