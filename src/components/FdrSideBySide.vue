<template>
  <div>
    <div v-if="fdr.length">
      <fdr-chart
        v-for="team in fdr"
        :key="team.teamId"
        :team="team.teamName"
        :weeks="team.weeks.slice(0, 14)"
        :color="color(team.teamId)"
      />
    </div>
    <div v-else>
      <fdr-loading-chart v-for="n in 5" :key="n" />
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import { mapGetters } from "vuex";

import FdrChart from "./FdrSideBySideChart";
import FdrLoadingChart from "./FdrSideBySideLoadingChart";

export default {
  components: {
    FdrChart,
    FdrLoadingChart,
  },
  computed: {
    color() {
      return d3.scaleOrdinal()
        .domain(Object.keys(this.teams || {}))
        .range(d3.schemeSet2);
    },
    ...mapGetters(["teams", "fdr"]),
  },
};
</script>