import "tailwindcss/tailwind.css";
import "tippy.js/dist/tippy.css";

import Vue from "vue";

import "./extensions";
import "./icons";

import App from "./App";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount("#app");