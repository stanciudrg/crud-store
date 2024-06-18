import "./assets/normalize.css";
import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

// Initialization logic
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

// Pinia for state managing, router for SPA routing
app.use(createPinia());
app.use(router);

app.mount("#app");
