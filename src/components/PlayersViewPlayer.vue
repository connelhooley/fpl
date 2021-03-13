<template>
  <div v-if="currentPlayer" class="space-y-8">
    <h1 class="text-4xl font-bold mb-8">{{currentPlayer.playerName}} ({{currentPlayer.positionShortName}})</h1>
    <form-chart :history="currentPlayer.history" />
    <points-chart class="w-1/2" :history="currentPlayer.history"  />
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