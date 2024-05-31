<script setup>
import Button from "./Button.vue";
defineEmits(["edit-product"]);
</script>

<template>
  <Button @click="$emit('edit-product')" name="Apply" />
</template>

<style scoped></style>
