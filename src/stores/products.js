import { ref, watch, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useProducts = defineStore("products", () => {
  // Holds all product objects
  const products = ref([]);

  // Fetches all products from MongoDB
  async function fetchProducts() {
    try {
      const response = await axios.get("http://localhost:5038/store/products");
      products.value = response.data;
      // Deletes the _id set by MongoDB for it to be re-added on post requests
      // Ensures the ID of products in the database are always refreshed
      products.value.map(({ _id, ...rest }) => rest);
      // Finds the nextID based on the highest ID in the list of products
      nextID.value =
        products.value.length > 0
          ? Math.max(...products.value.map((product) => product.id)) + 1
          : 0;
    } catch (error) {
      console.error("Failed fetching products:", error);
    }
  }

  // Requests for the products in the database to be replaced with the current products data
  // each time the products data is modified
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

  // Holds the current products sorting method
  const sortMethod = ref("default");

  // Fetches the sortingMethod from the database
  async function fetchSortMethod() {
    try {
      const response = await axios.get("http://localhost:5038/store/settings");
      if (response.data.length === 0) return;
      sortMethod.value = response.data[0].sortMethod;
    } catch (error) {
      console.error("Failed fetching settings:", error);
    }
  }

  // Requests for the sortingMethod in the database to be replaced with the current sortingMethod
  // each time the sortingMethod is modified
  watch(sortMethod, async () => {
    try {
      await axios.post("http://localhost:5038/store/settings", {
        sortMethod: sortMethod.value,
      });
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  });

  // Computed value returning the sorted version of the products array based
  // on the current sortingMethod
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

  // Holds the nextID that should be applied to the new product that will be added
  // Helps other components loop through the array of products inside HTML templates
  const nextID = ref(0);

  // Changes the current sortingMethod
  function changeSortMethod(newMethod) {
    sortMethod.value = newMethod;
  }

  // Creates a new product object containing the passed properties and adds it into the products array
  function addProduct(name, description, price) {
    const productToAdd = {
      name: name || "",
      description: description || "",
      price: price || 0,
      id: nextID.value++,
    };

    products.value.push(productToAdd);
  }

  // Updates the product containing the passed productID with the newValues
  function updateProduct(productID, newValues) {
    const productToUpdate = products.value.find(
      (product) => product.id === productID
    );

    if (!productToUpdate) return;

    for (const [key, newValue] of Object.entries(newValues)) {
      if (productToUpdate.hasOwnProperty(key)) productToUpdate[key] = newValue;
    }
  }

  // Deletes the product containing the passed productID
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
