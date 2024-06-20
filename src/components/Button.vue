<!-- Parent Button element with basic styling  -->
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
  font-size: 18px;
  font-weight: 600;
  border: 0;
  outline: 0;
  padding: 1rem 1.5rem;
  cursor: pointer;
}
</style>
