<script setup>
defineProps({
  name: String,
});
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
  padding: 1rem 1.5rem;
  cursor: pointer;
  font-weight: 600;
  border-radius: 2rem;
}
</style>
