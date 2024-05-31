<script setup>
defineProps({
  name: String,
});
defineEmits([""]);
</script>

<template>
  <button>
    {{ name }}
  </button>
</template>

<style scoped>
button {
  appearance: none;
  border: 0;
  outline: 0;
  padding: 1rem 2rem;
  cursor: pointer;
}
</style>
