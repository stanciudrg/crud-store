import { ref, watch, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useProducts = defineStore("products", () => {
  const products = ref([]);

  async function fetchProducts() {
    try {
      const response = await axios.get("http://localhost:5038/store/products");
      products.value = response.data;
      products.value.map(({ _id, ...rest }) => rest);
      nextID.value =
        products.value.length > 0
          ? Math.max(...products.value.map((product) => product.id)) + 1
          : 0;
    } catch (error) {
      console.error("Failed fetching products:", error);
    }
  }

  watch(
    products,
    async () => {
      try {
        await axios.post(
          "http://localhost:5038/store/products",
          products.value
        );
      } catch (error) {
        console.error("Error saving products:", error);
      }
    },
    { deep: true }
  );

  const sortMethod = ref("default");

  async function fetchSortMethod() {
    try {
      const response = await axios.get("http://localhost:5038/store/settings");
      sortMethod.value = response.data[0].sortMethod;
    } catch (error) {
      console.error("Failed fetching settings:", error);
    }
  }

  watch(sortMethod, async () => {
    try {
      await axios.post("http://localhost:5038/store/settings", {
        sortMethod: sortMethod.value,
      });
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  });

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

  const nextID = ref(0);

  function changeSortMethod(newMethod) {
    sortMethod.value = newMethod;
  }

  function addProduct(name, description, price) {
    const productToAdd = {
      name: name || "",
      description: description || "",
      price: price || 0,
      id: nextID.value++,
    };

    products.value.push(productToAdd);
  }

  function updateProduct(productID, newValues) {
    const productToUpdate = products.value.find(
      (product) => product.id === productID
    );

    if (!productToUpdate) return;

    for (const [key, newValue] of Object.entries(newValues)) {
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
    fetchProducts,
    fetchSortMethod,
    sortedProducts,
    nextID,
    changeSortMethod,
    addProduct,
    updateProduct,
    deleteProduct,
  };
});
