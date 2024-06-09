<script setup>
import Button from "./Button.vue";
import RemoveFromCartBtn from "./RemoveFromCartBtn.vue";

defineEmits([
  "request-reduce-quantity",
  "request-increase-quantity",
  "request-remove-from-cart",
]);

const props = defineProps({
  cartProduct: Object,
});
</script>

<template>
  <li class="cart-product">
    <div class="cart-product-info">
      <div class="name">
        {{ cartProduct.name }}
      </div>
      <div class="description">
        {{ cartProduct.description }}
      </div>
      <div class="price">
        {{
          cartProduct.totalPrice ? cartProduct.totalPrice + " " + "$" : "Free"
        }}
      </div>
    </div>
    <div class="cart-product-controls">
      <div class="quantity-control">
        <Button
          @click="$emit('request-increase-quantity', cartProduct)"
          class="increase-quantity"
          name="+"
        />
        <div class="quantity">{{ cartProduct.quantity }}</div>
        <Button
          @click="$emit('request-reduce-quantity', cartProduct)"
          class="reduce-quantity"
          name="-"
        ></Button>
      </div>
      <RemoveFromCartBtn
        class="remove-from-cart-btn"
        @click="$emit('request-remove-from-cart', cartProduct)"
      />
    </div>
  </li>
</template>

<style scoped>
.cart-product {
  height: 250px;
  display: flex;
  justify-content: space-between;
  background-color: rgb(250, 250, 250);
  color: rgb(25, 25, 25);
  border: 1px solid rgba(29, 29, 31, 0.2);
  border-radius: 1rem;
  padding: 1rem;
  gap: 4rem;
  box-shadow: 0 5px 10px 0 rgba(29, 29, 31, 0.04);
}

.cart-product-info {
  display: flex;
  flex-direction: column;
}

.cart-product-info div {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow-wrap: break-word;
  overflow: hidden;
  word-break: break-word;
}

.name {
  font-size: 22px;
  font-weight: 600;
  -webkit-line-clamp: 3;
}

.description,
.price {
  font-size: 18px;
}

.description {
  margin-top: 1rem;
  -webkit-line-clamp: 4;
}

.price {
  font-weight: 600;
  margin-top: auto;
  -webkit-line-clamp: 1;
}

.cart-product-controls {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.quantity-control {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.quantity-control button {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(25, 25, 25);
  color: rgb(250, 250, 250);
  border-radius: 100%;
}

.quantity-control button:hover {
  background-color: rgb(45, 45, 45);
}

.quantity {
  font-weight: 600;
}

.remove-from-cart-btn {
  align-self: center;
  width: 40px;
  height: 40px;
  appearance: none;
  background-color: transparent;
  border: 0;
  outline: 0;
  padding: 0.5rem;
  margin-left: 2px;
}

.remove-from-cart-btn:hover {
  color: #d11a2a;
  cursor: pointer;
}
</style>
