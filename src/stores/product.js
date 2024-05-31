import { defineStore } from "pinia";

export const useProduct = defineStore("product", () => {
  const product = ref({
    name: "",
    description: "",
    price: null,
    isInCart: false,
    id: null,
  });

  function updateName(newName) {
    this.name = newName;
  }

  function updateDescription(newDescription) {
    this.description = newDescription;
  }

  function updatePrice(newPrice) {
    this.price = newPrice;
  }

  return { product, updateName, updateDescription, updatePrice };
});
