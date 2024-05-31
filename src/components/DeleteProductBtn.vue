<script setup>
import Button from "./Button.vue";
</script>

<template>
  <Button @click="$emit('delete-product')" name="Delete" />
</template>

<style scoped></style>
