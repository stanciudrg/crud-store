<script setup>
import Button from "./Button.vue";

defineEmits(["cancel-edit"]);
</script>

<template>
  <Button @click="$emit('cancel-edit')" name="Cancel" />
</template>

<style scoped></style>
