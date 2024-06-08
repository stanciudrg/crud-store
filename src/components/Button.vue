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
  font-weight: 600;
  font-size: 18px;
  border: 0;
  outline: 0;
  padding: 1rem 1.5rem;
  cursor: pointer;
}
</style>
