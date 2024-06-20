<!-- Holds all the product elements and a sorting utility -->
<!-- Is responsible for handling all the events passed by each Product component -->
<script setup>
import Product from "./Product.vue";
import Button from "./Button.vue";
import { useProducts } from "../stores/products";
import { useCart } from "../stores/cart";
import { ref } from "vue";

defineProps({
  products: Object,
});

const cart = useCart();

// Represents the current state of the sortMethods context menu (open vs closed)
const showSortMethods = ref(false);

// Products store that manages the state of product objects
const productsStore = useProducts();

// Toggles the sorting context menu
function toggleSortMethodsList() {
  showSortMethods.value = !showSortMethods.value;

  // Close the context menu as soon as user clicks outside it
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

// If user clicked on one of the sorting methods, changes the sortingMethod in the products store,
// then closes the context menu
function handleSortMethodsEvents(e) {
  if (!e.target.classList.contains("sort-by-button")) return;
  productsStore.changeSortMethod(e.target.classList[1]);
  toggleSortMethodsList();
}

// Deletes the product from products store and from the cart store if found
function deleteProduct(product) {
  productsStore.deleteProduct(product.id);

  const cartProduct = cart.findCartProduct(product.id);
  if (cartProduct) cart.removeCartProduct(cartProduct);
}

// Updates the product with the new properties both in products and cart stores
function editProduct(product, newProps) {
  productsStore.updateProduct(product.id, {
    name: newProps.name,
    description: newProps.description,
    price: newProps.price,
  });

  const cartProduct = cart.findCartProduct(product.id);

  if (cartProduct)
    cart.updateCartProduct(cartProduct, {
      name: newProps.name,
      description: newProps.description,
      price: newProps.price,
    });
}

// Adds the product into the cart store
function addToCart(product) {
  cart.addToCart(product);
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
      @request-add-to-cart="addToCart"
      @request-delete="deleteProduct"
      @request-edit="editProduct"
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </ul>
</template>

<style scoped>
/* Sort button */
.sort-by {
  align-self: center;
  width: 80px;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 2rem;
}

.sort-by > button {
  text-decoration: underline;
  background-color: transparent;
  padding: 0.5rem 0.25rem;
  border-radius: 0.25rem;
}

.sort-by > button:hover,
.sort-by > button.active {
  background-color: rgb(250, 250, 250);
}

/* Context menu containing all sortingMethods */
.sort-by ul {
  z-index: 1;
  position: absolute;
  top: 40px;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  background-color: rgb(250, 250, 250);
  border: 1px solid rgba(29, 29, 31, 0.2);
  border-radius: 0.25rem;
  box-shadow: 0 20px 30px 0 rgba(29, 29, 31, 0.1);
  list-style-type: none;
}

.sort-by ul button {
  width: 100%;
  padding: 0.5rem;
  font-weight: 500;
  font-size: 16px;
  background-color: transparent;
}

.sort-by ul button.active {
  font-weight: 600;
}

.sort-by ul button:hover {
  background-color: rgb(235, 235, 235);
}

/* Products grid */
.products {
  display: grid;
  grid-template-columns: repeat(auto-fit, 390px);
  grid-template-rows: repeat(auto-fit, 360px);
  grid-auto-rows: 360px;
  justify-content: center;
  list-style-type: none;
  padding: 0;
  margin-top: 1rem;
  gap: 2rem;
}
</style>
