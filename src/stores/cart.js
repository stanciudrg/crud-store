import { ref, watch, computed, reactive } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { debounce } from "lodash";

export const useCart = defineStore("cart", () => {
  // Holds all cartProduct objects
  const cartProducts = ref([]);

  // Fetches all cartProducts from MongoDB
  async function fetchCartProducts() {
    try {
      const response = await axios.get("http://localhost:5038/store/cart");
      response.data.forEach((cartProduct) => {
        // Deletes the _id set by MongoDB for it to be re-added on post requests
        // Ensures the ID of cart products in the database are always refreshed
        delete cartProduct._id;
        addToCart(cartProduct);
      });
    } catch (error) {
      console.error("Failed fetching cart products:", error);
    }
  }

  // Requests for the cart in the database to be replaced with the current cartProducts data
  // Uses debounce to limit the number of API calls and wait for the database to
  // successfully save the changes prior to sending a new request
  const saveCart = debounce(async () => {
    try {
      await axios.post("http://localhost:5038/store/cart", cartProducts.value);
    } catch (error) {
      console.error("Error saving cart products:", error);
    }
  }, 500);

  // Runs saveCart each time cartProducts.value changes
  watch(cartProducts, saveCart, { deep: true });

  // Searches for the product containing the passed productID
  function findCartProduct(productID) {
    return cartProducts.value.find((product) => product.id === productID);
  }

  // Adds a new reactive product object into the cartProducts array
  function addToCart(product) {
    const existingProduct = findCartProduct(product.id);

    if (existingProduct) return;

    const reactiveCartProduct = reactive({
      ...product,
      quantity: product.quantity || 1,
      totalPrice: product.totalPrice || product.price,
    });

    cartProducts.value.push(reactiveCartProduct);

    // Attaches a watcher on the new reactive product object to continuously
    // update the totalPrice property by multiplying product's price with product's quantity
    watch(
      () => [reactiveCartProduct.price, reactiveCartProduct.quantity],
      ([newPrice, newQuantity]) => {
        reactiveCartProduct.totalPrice = newPrice * newQuantity;
      }
    );
  }

  // Updates the productToUpdate with the newValues
  function updateCartProduct(productToUpdate, newValues) {
    for (const [key, newValue] of Object.entries(newValues)) {
      if (productToUpdate.hasOwnProperty(key)) {
        productToUpdate[key] = newValue;
      }
    }
  }

  // Increases the product quantity of the product containing the passed productID
  function increaseProductQuantity(productID) {
    const productToIncreaseQuantity = cartProducts.value.find(
      (product) => product.id === productID
    );

    if (!productToIncreaseQuantity) return;

    productToIncreaseQuantity.quantity += 1;
  }

  // Reduces the product quantity of the product containing the passed productID
  function reduceProductQuantity(productID) {
    const productToReduceQuantity = cartProducts.value.find(
      (product) => product.id === productID
    );

    if (!productToReduceQuantity) return;

    productToReduceQuantity.quantity -= 1;

    if (productToReduceQuantity.quantity === 0) {
      removeCartProduct(productToReduceQuantity);
    }
  }

  // Removes the productToDelete from the cart
  function removeCartProduct(productToDelete) {
    const index = cartProducts.value.indexOf(productToDelete);
    cartProducts.value.splice(index, 1);
  }

  // Clears the cart
  function clearCart() {
    cartProducts.value = [];
  }

  // Returns the product's price multiplied by product's quantity
  function getTotalProductPrice(product) {
    return product.quantity * product.price;
  }

  // Computed value holding the total price of all products
  const totalPrice = computed(() => {
    return cartProducts.value.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  });

  // Computed value holding the total quantity of all products
  const totalQuantity = computed(() => {
    return cartProducts.value.reduce(
      (total, product) => total + product.quantity,
      0
    );
  });

  return {
    cartProducts,
    fetchCartProducts,
    findCartProduct,
    addToCart,
    updateCartProduct,
    increaseProductQuantity,
    reduceProductQuantity,
    removeCartProduct,
    clearCart,
    getTotalProductPrice,
    totalPrice,
    totalQuantity,
  };
});
