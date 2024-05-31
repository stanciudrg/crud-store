<script setup>
import Button from "./Button.vue";
</script>

<template>
  <Button @click="$emit('toggle-add-product')" name="Add product" />
</template>

<style scoped>
button {
  max-width: 300px;
  width: 100%;
  align-self: center;
  background-color: transparent;
  border: 2px solid black;
}
</style>
