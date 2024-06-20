<!-- Header element containing the logo and the navbar -->
<script setup>
import { RouterLink, useRoute } from "vue-router";
import { useCart } from "../stores/cart";

// Cart store responsible for managing the state of cart products
const cart = useCart();

// Current view location
const location = useRoute();
</script>

<template>
  <header>
    <h1>CRUD Store</h1>
    <nav>
      <ul>
        <li>
          <RouterLink to="/" activeClass="active">Products</RouterLink>
        </li>
        <li>
          <RouterLink to="/cart" activeClass="active">{{
            cart.cartProducts.length === 0
              ? "Cart"
              : "Cart " + "(" + cart.cartProducts.length + ")"
          }}</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(250, 250, 250);
  color: rgb(25, 25, 25);
  border: 1px solid rgba(29, 29, 31, 0.2);
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  box-shadow: 0 0 10px 0 rgba(29, 29, 31, 0.04);
  margin: 0 auto;
  padding: 1.5rem;
}

h1 {
  font-weight: 600;
  padding: 0;
  margin: 0;
}

ul {
  display: flex;
  gap: 2rem;
  padding: 0;
  list-style-type: none;
}

a {
  font-size: 1.3rem;
  font-weight: 600;
  text-decoration: none;
  color: rgb(130, 130, 130);
}

a.active {
  color: inherit;
}
</style>
