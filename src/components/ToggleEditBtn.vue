<script setup>
import Button from "./Button.vue";
defineEmits(["toggle-edit-product"]);
</script>

<template>
  <Button @click="$emit('toggle-edit-product')" name="Edit product" />
</template>

<style scoped></style>
