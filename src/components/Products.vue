<script setup>
import Product from "./Product.vue";
import Button from "./Button.vue";
import { useProducts } from "../stores/products";
import { ref } from "vue";

defineProps({
  products: Object,
});

const showSortMethods = ref(false);

const productsStore = useProducts();

function toggleSortMethodsList() {
  showSortMethods.value = !showSortMethods.value;

  if (showSortMethods.value) {
    document.addEventListener(
      "click",
      (e) => {
        if (!e.target.closest(".sort-methods")) showSortMethods.value = false;
      },
      { once: true }
    );
  }
}

function handleSortMethodsEvents(e) {
  productsStore.changeSortMethod(e.target.classList[1]);
  toggleSortMethodsList();
}

function deleteProduct(product) {
  productsStore.deleteProduct(product.id);
}

function editProduct(product, newProps) {
  productsStore.updateProduct(product.id, {
    name: newProps.name,
    description: newProps.description,
    price: newProps.price,
  });
}
</script>

<template>
  <div class="sort-by">
    <Button
      @click.stop="toggleSortMethodsList"
      :class="{ active: showSortMethods }"
      name="Sort by"
    />
    <ul
      @click="handleSortMethodsEvents"
      v-if="showSortMethods"
      class="sort-methods"
    >
      <li>
        <Button
          :class="[
            'sort-by-button',
            'default',
            { active: productsStore.sortMethod === 'default' },
          ]"
          name="Default"
        />
      </li>
      <li>
        <Button
          :class="[
            'sort-by-button',
            'name',
            { active: productsStore.sortMethod === 'name' },
          ]"
          name="Name"
        />
      </li>
      <li>
        <Button
          :class="[
            'sort-by-button',
            'price',
            { active: productsStore.sortMethod === 'price' },
          ]"
          name="Price"
        />
      </li>
    </ul>
  </div>
  <ul class="products">
    <Product
      @request-delete="deleteProduct"
      @request-edit="editProduct"
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </ul>
</template>

<style scoped>
.sort-by {
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 2rem;
  align-self: center;
  width: 80px;
}

.sort-by > button {
  background-color: transparent;
  padding: 0.5rem 0.25rem;
  border-radius: 0.25rem;
}

.sort-by > button:hover,
.sort-by > button.active {
  background-color: rgb(250, 250, 250);
}

.sort-by ul {
  position: absolute;
  top: 40px;
  right: 0;
  left: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  background-color: rgb(250, 250, 250);
  border-radius: 0.25rem;
  box-shadow: 0 5px 10px 0 rgba(29, 29, 31, 0.04);
  border: 1px solid rgba(29, 29, 31, 0.2);
}

.sort-by ul button {
  background-color: transparent;
  width: 100%;
  padding: 0.5rem;
  font-weight: 500;
  font-size: 16px;
}

.sort-by ul button.active {
  font-weight: 600;
}

.sort-by ul button:hover {
  background-color: rgb(235, 235, 235);
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fit, 390px);
  grid-template-rows: repeat(auto-fit, 350px);
  grid-auto-rows: 350px;
  gap: 2rem;
  justify-content: center;
  list-style-type: none;
  padding: 0;
  margin-top: 1rem;
}
</style>
