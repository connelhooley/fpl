<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <template v-if="fdr.length">
      <chart
        v-for="team in fdr"
        :key="team.teamId"
        :team="team.teamName"
        :weeks="team.weeks.slice(0, 14)"
        :color="color(team.teamId)"
      />
    </template>
    <template v-else>
      <loading-chart v-for="n in 5" :key="n" />
    </template>
  </div>
</template>

<script>
import * as d3 from "d3";
import { mapGetters } from "vuex";

import Chart from "./FdrChartsChart";
import LoadingChart from "./FdrChartsLoadingChart";

export default {
  components: {
    Chart,
    LoadingChart,
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