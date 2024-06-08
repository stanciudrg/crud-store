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
    <div class="name">
      {{ cartProduct.name }}
    </div>
    <div class="description">
      {{ cartProduct.description }}
    </div>
    <div class="price">
      {{ cartProduct.price ? cartProduct.price + " " + "$" : "Free" }}
    </div>
    <div class="cart-product-controls">
      <div class="quantity-control">
        <Button
          @click="$emit('request-reduce-quantity', cartProduct)"
          class="reduce-quantity"
          name="-"
        ></Button>
        <div class="quantity">{{ cartProduct.quantity }}</div>
        <Button
          @click="$emit('request-increase-quantity', cartProduct)"
          class="increase-quantity"
          name="+"
        />
      </div>
      <RemoveFromCartBtn
        @click="$emit('request-remove-from-cart', cartProduct)"
      />
    </div>
  </li>
</template>

<style scoped></style>
