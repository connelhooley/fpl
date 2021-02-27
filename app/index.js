const Vue = require("vue/dist/vue.common");
const VueRouter = require("vue-router");
Vue.use(VueRouter);

require("./site-extensions");
const routes = require("./site-routes");
const SiteHeader = require("./site-header");

new Vue({
  el: "#root",
  template: `<div id="root"><site-header/><router-view/></div>`,
  router:  new VueRouter({routes}),
  components: {
    SiteHeader,
  },
});