<template>
  <div v-if="currentPlayer" class="grid grid-cols-4 gap-8">
    <h1 class="col-span-4 text-4xl font-bold">{{currentPlayer.playerName}} ({{currentPlayer.positionShortName}})</h1>
    <FormChart class="col-span-4" :history="currentPlayer.history" />
    <PointsChart class="col-span-4 md:col-span-3 lg:col-span-2" :history="currentPlayer.history"  />
    <!-- <minutes-chart class="col-span-4 md:col-span-3 lg:col-span-2 xl:col-span-2" :history="currentPlayer.history"  /> -->
  </div>
  <div v-else>
    <PlayerLoading />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import FormChart from "./PlayersViewPlayerFormChart";
import PointsChart from "./PlayersViewPlayerPointsChart";
import PlayerLoading from './PlayersViewPlayerLoading.vue';

export default {
  components: {
    FormChart,
    PointsChart,
    PlayerLoading,
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