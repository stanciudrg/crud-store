<script setup>
import CartProducts from "../components/CartProducts.vue";
import CartInfo from "../components/CartInfo.vue";
import { useCart } from "../stores/cart";

// The "Cart" page of the application. Has its on memory data managed by
// Pinia's cart.js.

const cart = useCart();

function clearCart() {
  cart.clearCart();
}
</script>

<template>
  <div v-if="cart.totalQuantity > 0" class="cart-view">
    <CartProducts :cartProducts="cart.cartProducts" />
    <CartInfo @request-clear-cart="clearCart" />
  </div>
  <div v-else class="cart-view-empty">Cart is empty</div>
</template>

<style scoped>
.cart-view,
.cart-view-empty {
  max-width: 1300px;
  width: 100%;
  display: flex;
  margin-top: 4rem;
  margin-bottom: 4rem;
  gap: 1rem;
}

.cart-view-empty {
  justify-content: center;
  font-size: 1.4rem;
}

.cart-view > div {
  align-self: start;
}

/* Media queries for responsive design */
@media (max-width: 1024px) {
  .cart-view {
    flex-direction: column;
  }

  .cart-view > ul {
    order: 2;
  }

  .cart-view > div {
    align-self: center;
  }
}
</style>
