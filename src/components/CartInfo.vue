<!-- Holds cart information (total quantity and total price) and cart controls (empty cart) -->
<script setup>
import { useCart } from "../stores/cart";
import ClearCartBtn from "./ClearCartBtn.vue";

defineEmits(["request-clear-cart"]);

const cart = useCart();
</script>

<template>
  <div class="cart-info">
    <div class="title">Cart details</div>
    <div class="total-quantity">
      <span>Total quantity: </span>
      <span>{{ cart.totalQuantity }}</span>
    </div>
    <div class="total-price">
      <span>Total price: </span>
      <span>{{ cart.totalPrice }} $</span>
    </div>
    <ClearCartBtn @click="$emit('request-clear-cart')" />
  </div>
</template>

<style scoped>
.cart-info {
  max-width: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgb(250, 250, 250);
  color: rgb(25, 25, 25);
  padding: 1rem;
  border: 1px solid rgba(29, 29, 31, 0.2);
  border-radius: 1rem;
  box-shadow: 0 5px 10px 0 rgba(29, 29, 31, 0.04);
}

.title {
  font-size: 22px;
  font-weight: 600;
}

/* Cart information elements */
.total-quantity,
.total-price {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
}

/* Span's that hold the values */
.total-quantity span:last-of-type,
.total-price span:last-of-type {
  font-weight: 600;
}

.total-quantity {
  margin-top: 2rem;
}

.total-price {
  margin-top: 0.5rem;
}

/* "Clear cart" button */
button {
  background-color: rgb(25, 25, 25);
  color: rgb(250, 250, 250);
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  margin-top: 1rem;
}

button:hover {
  background-color: rgb(45, 45, 45);
}
</style>
