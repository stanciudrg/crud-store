<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <header>
    <h1>CRUD Store</h1>
    <nav>
      <ul>
        <li>
          <RouterLink to="/">Products</RouterLink>
          <RouterLink to="/cart">Cart</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding: 1rem 2rem;
}

h1 {
  padding: 0;
  margin: 0;
  font-weight: 600;
}

ul {
  display: flex;
  gap: 2rem;
  list-style-type: none;
  padding: 0;
}

a {
  text-decoration: none;
  color: black;
  font-size: 1.3rem;
  font-weight: 500;
}
</style>
