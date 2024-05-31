import { defineStore } from "pinia";

export const useProducts = defineStore("products", () => {
  const products = ref([]);
  const sortMethod = ref("default");
  const nextID = ref(0);

  const sortBy = computed((value) => {
    return products.sort((a, b) => a[value] - b[value]);
  });

  const sortedProducts = computed(() => {
    if (this.sortMethod === "default") {
      return products;
    } else {
      return this.sortBy(this.sortMethod);
    }
  });

  function addProduct(name, description, price) {
    const productToAdd = {
      name,
      description,
      price,
      id: nextID++,
      isInCart: false,
    };

    this.products.push(productToAdd);
  }

  function updateProduct(newProduct, values) {
    const productToUpdate = this.products.find(
      (product) => (product.id = newProduct.id)
    );

    if (!productToUpdate) return;

    for (const [key, newValue] of Object.entries(values)) {
      if (productToUpdate.hasOwnProperty(key)) productToUpdate[key] = newValue;
    }
  }

  function deleteProduct(product) {
    const productToDelete = this.products.find(
      (item) => (item.id = product.id)
    );

    if (!productToDelete) return;

    const index = this.products.indexOf(productToDelete);
    this.products.splice(index, 1);
  }
});
