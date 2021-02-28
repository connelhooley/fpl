import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from "./routes";

import "./extensions";

// import "tailwindcss";

Vue.config.productionTip = false;
Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  router: new VueRouter({routes}),
}).$mount('#app');