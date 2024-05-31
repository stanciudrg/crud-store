import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useProducts = defineStore("products", () => {
  const products = ref(JSON.parse(localStorage.getItem("products") || "[]"));
  const sortMethod = ref("default");

  let nextID = ref(
    products.value.length > 0
      ? Math.max(...products.value.map((product) => product.id)) + 1
      : 0
  );

  const sortBy = computed(() => {
    return this.products.sort(
      (a, b) => a[this.sortMethod] - b[this.sortMethod]
    );
  });

  const sortedProducts = computed(() => {
    if (sortMethod === "default") {
      return products;
    } else {
      return sortBy;
    }
  });

  function addProduct(name, description, price) {
    const productToAdd = {
      name,
      description,
      price,
      id: this.nextID++,
      isInCart: false,
    };

    this.products.push(productToAdd);
  }

  function updateProduct(newProductID, values) {
    const productToUpdate = this.products.find(
      (product) => product.id === newProductID
    );

    if (!productToUpdate) return;

    for (const [key, newValue] of Object.entries(values)) {
      if (productToUpdate.hasOwnProperty(key)) productToUpdate[key] = newValue;
    }
  }

  function deleteProduct(productID) {
    const productToDelete = this.products.find(
      (product) => product.id === productID
    );

    if (!productToDelete) return;

    const index = this.products.indexOf(productToDelete);
    this.products.splice(index, 1);
  }

  return {
    products,
    sortMethod,
    nextID,
    sortedProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
});
