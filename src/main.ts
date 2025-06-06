import { createApp } from "vue";
import App from "./App.vue";
import { pinia } from "./stores";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import "./styles/main.scss";

createApp(App).use(pinia).use(autoAnimatePlugin).mount("#app");