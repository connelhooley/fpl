import Vue from "vue";
import VueRouter from "vue-router";

import FdrCharts from "../pages/FdrCharts";
import FdrTable from "../pages/FdrTable";
import ViewTeams from "../pages/ViewTeams";
import ViewTeam from "../pages/ViewTeam";
import ViewPlayer from "../pages/ViewPlayer";

Vue.use(VueRouter);

export default new VueRouter({routes: [
  {
    path: "/fdr/charts",
    name: "fdr-charts",
    component: FdrCharts,
  },
  {
    path: "/fdr/table",
    name: "fdr-table",
    component: FdrTable,
  },
  {
    path: "/fdr",
    name: "fdr",
    redirect: {
      name: "fdr-charts",
    },
  },
  {
    path: "/view/teams",
    name: "view-teams",
    component: ViewTeams,
  },
  {
    path: "/view/teams/:teamId",
    name: "view-team",
    component: ViewTeam,
    props: true,
  },
  {
    path: "/view/player/:playerId",
    name: "view-player",
    component: ViewPlayer,
    props: true,
  },
  {
    path: "/view",
    name: "view",
    redirect: {
      name: "view-teams",
    },
  },
  { 
    path: "*",
    redirect: {
      name: "fdr-charts",
    },
  },
]});