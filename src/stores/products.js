import { ref, watch, computed } from "vue";
import { defineStore } from "pinia";

export const useProducts = defineStore("products", () => {
  const products = ref(JSON.parse(localStorage.getItem("products") || "[]"));

  const sortMethod = ref(
    JSON.parse(localStorage.getItem("sortMethod")) || "default"
  );

  const sortedProducts = computed(() => {
    if (sortMethod.value === "default") {
      return products.value;
    } else if (sortMethod.value === "name") {
      return [...products.value].sort((a, b) =>
        a[sortMethod.value].localeCompare(b[sortMethod.value])
      );
    } else if (sortMethod.value === "price") {
      return [...products.value].sort(
        (a, b) => a[sortMethod.value] - b[sortMethod.value]
      );
    }
  });

  function changeSortMethod(newMethod) {
    sortMethod.value = newMethod;
  }

  const nextID = ref(
    products.value.length > 0
      ? Math.max(...products.value.map((product) => product.id)) + 1
      : 0
  );

  function addProduct(name, description, price) {
    const productToAdd = {
      name,
      description,
      price,
      id: nextID.value++,
      isInCart: false,
    };

    products.value.push(productToAdd);
  }

  function updateProduct(newProductID, values) {
    const productToUpdate = products.value.find(
      (product) => product.id === newProductID
    );

    if (!productToUpdate) return;

    for (const [key, newValue] of Object.entries(values)) {
      if (productToUpdate.hasOwnProperty(key)) productToUpdate[key] = newValue;
    }
  }

  function deleteProduct(productID) {
    const productToDelete = products.value.find(
      (product) => product.id === productID
    );

    if (!productToDelete) return;

    const index = products.value.indexOf(productToDelete);
    products.value.splice(index, 1);
  }

  return {
    products,
    sortMethod,
    sortedProducts,
    nextID,
    changeSortMethod,
    addProduct,
    updateProduct,
    deleteProduct,
  };
});
