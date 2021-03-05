import Vue from "vue";
import VueRouter from "vue-router";

import Fdr from "./components/Fdr";
import FdrSideBySide from "./components/FdrSideBySide";
import FdrTable from "./components/FdrTable";

Vue.use(VueRouter);

export default new VueRouter({routes: [
  {
    path: "/fdr", component: Fdr, children: [
      {
        path: "charts",
        component: FdrSideBySide,
      },
      {
        path: "table",
        component: FdrTable,
      },
      {
        path: "*",
        redirect: "/fdr/charts"
      },
    ]
  },
  { path: "*", redirect: "/fdr/charts" },
]});