<script setup>
import { useCart } from "../stores/cart";

const cart = useCart();
</script>

<template>
  <div class="cart-info">
    <div class="total-quantity">
      {{
        cart.totalQuantity > 0
          ? "Total quantity: " + cart.totalQuantity
          : "Cart is empty"
      }}
    </div>
    <div class="total-price">
      {{ "Total price: " + cart.totalPrice + " $" }}
    </div>
  </div>
</template>

<style scoped></style>
