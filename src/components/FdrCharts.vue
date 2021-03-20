<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <template v-if="fdr.length">
      <FdrChart
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
</template>

<script>
import * as d3 from "d3";
import { mapGetters } from "vuex";

import FdrChart from "./FdrChartsChart";
import LoadingLineChart from "./LoadingLineChart";

export default {
  components: {
    FdrChart,
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