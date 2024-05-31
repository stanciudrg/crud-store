<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <header>
    <h1>CRUD store</h1>
    <nav>
      <ul>
        <li><RouterLink to="/">Products</RouterLink></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-around;
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
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
