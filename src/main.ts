import "./style.css";
import { createApp } from "vue";
import { defaultConfig, plugin } from "@formkit/vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import VueSkeletonLoader from "vue3-skeleton-loader";
import App from "./App.vue";
import router from "./router";
import formkitConfig from "./config/formkit.config";
import "vue3-skeleton-loader/dist/style.css";

// Instantiate vue createApp
const app = createApp(App);

// Add middlewares
app.use(router);
app.use(plugin, defaultConfig(formkitConfig));
app.use(VueQueryPlugin);

// Mount App
app.mount("#app");

// Register global components
app.component("v-skeleton", VueSkeletonLoader);
