<template>
  <div>
    <FdrNav />
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <template v-if="fdr.length">
        <FdrTeamChart
          v-for="team in fdr"
          :key="team.teamId"
          :team="team.teamName"
          :weeks="team.weeks.slice(0, 14)"
          :color="color(team.teamId)"
        />
      </template>
      <template v-else>
        <LoadingLineChart v-for="n in 5" :key="n" />
      </template>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import { mapGetters } from "vuex";

import FdrNav from "../components/FdrNav";
import FdrTeamChart from "../components/FdrTeamChart";
import LoadingLineChart from "../components/LoadingLineChart";

export default {
  components: {
    FdrNav,
    FdrTeamChart,
    LoadingLineChart,
  },
  computed: {
    color() {
      return d3.scaleOrdinal()
        .domain(Object.keys(this.teams || {}))
        .range(d3.schemeSet2);
    },
    ...mapGetters("fixtures", ["fdr"]),
  },
};
</script>