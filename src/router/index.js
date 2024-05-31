import { createRouter, createWebHistory } from "vue-router";
import ProductsView from "../views/ProductsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "products",
      component: ProductsView,
    },
    {
      path: "/cart",
      name: "cart",
      // lazy-loading the view
      component: () => import("../views/CartView.vue"),
    },
  ],
});

export default router;
