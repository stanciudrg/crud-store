<script setup>
import Button from "./Button.vue";
</script>

<template>
  <Button @click="$emit('toggle-add-product')" name="Add product" />
</template>

<style scoped></style>
