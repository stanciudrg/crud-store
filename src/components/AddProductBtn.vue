<script setup>
import Button from "./Button.vue";
</script>

<template>
  <Button name="+" />
</template>

<style scoped>
button {
  align-self: center;
  width: 75px;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  background-color: rgb(25, 25, 25);
  color: rgb(250, 250, 250);
  padding: 2rem;
  border-radius: 100%;
}

button:hover {
  background-color: rgb(45, 45, 45);
}
</style>
