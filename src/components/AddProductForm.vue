<!-- Form modal for adding a new product -->
<script setup>
import Button from "./Button.vue";
defineEmits(["clicked-outside", "form-submit"]);

// Models used to bind the input values and send them upwards via the 'form-submit' event
let name = defineModel("name");
let description = defineModel("description");
let price = defineModel("price");
</script>

<template>
  <form
    @mousedown.self="$emit('clicked-outside')"
    @submit.prevent
    class="add-product"
  >
    <fieldset>
      <!-- Name textarea -->
      <div class="form-control name">
        <label>Name</label>
        <textarea v-model.trim="name" placeholder="Product name"></textarea>
      </div>
      <!-- Description textarea -->
      <div class="form-control description">
        <label>Description</label>
        <textarea
          v-model.trim="description"
          placeholder="Product description"
        ></textarea>
      </div>
      <!-- Price number input -->
      <div class="form-control price form-control-check">
        <label>Price ($)</label>
        <input
          type="number"
          min="0"
          max="1000000"
          v-model.trim="price"
          name="price"
          placeholder="Product price ($)"
        />
      </div>
      <!-- Submit button -->
      <Button
        name="Add product"
        @click.prevent="$emit('form-submit', { name, description, price })"
        :disabled="!name"
      />
    </fieldset>
  </form>
</template>

<style scoped>
/* Turns the form into a modal */
form {
  z-index: 2;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(25, 25, 25, 0.7);
  backdrop-filter: blur(10px);
}

fieldset {
  width: 390px;
  height: 350px;
  display: flex;
  flex-direction: column;
  background-color: rgb(250, 250, 250);
  border: 0;
  border-radius: 1rem;
  margin: 6rem auto 0 auto;
  padding: 1rem;
  overflow: hidden;
}

/* Form inputs styling */
.name,
.description,
.price {
  background-color: white;
  outline: 1px solid rgba(25, 25, 25, 0.2);
}

.name,
.description {
  flex: 1;
  padding: 0.5rem 0.85rem 0.5rem 0.5rem;
}

.description,
.price {
  font-size: 18px;
  margin-top: 0.5rem;
}

.name {
  font-size: 22px;
  font-weight: 600;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.price {
  font-weight: 600;
  padding: 0.5rem;
}

textarea,
input {
  width: 100%;
  font-weight: inherit;
  border: 0;
  outline: none;
}

/* Scrollable, non-resizable textarea */
textarea {
  height: 100%;
  display: block;
  overflow: auto;
  resize: none;
  white-space: break-spaces;
  padding-right: 8px;
}

/* Styling for textarea scrollbars */
textarea::-webkit-scrollbar {
  width: 7px;
  background: rgb(230, 230, 230);
}

textarea::-webkit-scrollbar-thumb {
  background: rgb(25, 25, 25);
  cursor: default;
}

textarea::-webkit-scrollbar-thumb:hover {
  background-color: rgb(45, 45, 45);
}

/* Form submit button */
button {
  background-color: rgb(25, 25, 25);
  color: rgb(250, 250, 250);
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  margin-top: 1rem;
}

button:disabled {
  cursor: not-allowed;
  background-color: rgb(200, 200, 200);
}

button:hover:enabled {
  background-color: rgb(45, 45, 45);
}
</style>
