import Vue from "vue";
import VueRouter from "vue-router";

import Fdr from "./components/Fdr";
import FdrCharts from "./components/FdrCharts";
import FdrTable from "./components/FdrTable";
import Players from "./components/Players";
import PlayersTeams from "./components/PlayersTeams";
import PlayersViewTeam from "./components/PlayersViewTeam";
import PlayersViewPlayer from "./components/PlayersViewPlayer";

Vue.use(VueRouter);

export default new VueRouter({routes: [
  {
    path: "/fdr", component: Fdr, children: [
      {
        path: "charts",
        component: FdrCharts,
      },
      {
        path: "table",
        component: FdrTable,
      },
      {
        path: "*",
        redirect: "/fdr/charts"
      },
    ],
  },
  {
    path: "/players", component: Players, children: [
      {
        path: "teams",
        component: PlayersTeams,
      },
      {
        path: "teams/:teamId",
        component: PlayersViewTeam,
      },
      {
        path: "player/:playerId",
        component: PlayersViewPlayer,
      },
      {
        path: "*",
        redirect: "/players/teams"
      },
    ],
  },
  { 
    path: "*",
    redirect: "/fdr/charts"
  },
]});