<script setup>
import { RouterLink, useRoute } from "vue-router";

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
          <RouterLink to="/cart" activeClass="active">Cart</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  padding: 1rem 2rem;
  color: rgb(25, 25, 25);
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
  color: rgb(130, 130, 130);
  font-size: 1.3rem;
  font-weight: 600;
}

a.active {
  color: inherit;
}
</style>
