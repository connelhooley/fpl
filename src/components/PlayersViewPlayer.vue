<template>
  <div v-if="currentPlayer" class="grid grid-cols-4 gap-8">
    <h1 class="col-span-4 text-4xl font-bold mb-8">{{currentPlayer.playerName}} ({{currentPlayer.positionShortName}})</h1>
    <form-chart class="col-span-4 xl:col-span-3" :history="currentPlayer.history" />
    <points-chart class="col-span-4 md:col-span-3 lg:col-span-2 xl:col-span-2" :history="currentPlayer.history"  />
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import FormChart from "./PlayersViewPlayerFormChart";
import PointsChart from "./PlayersViewPlayerPointsChart";

export default {
  components: {
    FormChart,
    PointsChart,
  },
  created() {
    const playerId = this.$route.params.playerId;
    this.fetchCurrentPlayerHistory(playerId);
  },
  methods: {
    ...mapActions("playerDetails", ["fetchCurrentPlayerHistory"]),
  },
  computed: {
    ...mapGetters("playerDetails", ["currentPlayer"]),
  },
};
</script>