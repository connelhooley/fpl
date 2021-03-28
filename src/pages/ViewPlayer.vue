<template>
  <div v-if="currentPlayer" class="grid grid-cols-4 gap-8">
    <h1 class="col-span-4 text-4xl font-bold">{{currentPlayer.playerName}} ({{currentPlayer.positionShortName}})</h1>
    <PlayerFormChart class="col-span-4" :history="currentPlayer.history" />
    <PlayerPointsChart class="col-span-4 md:col-span-3 lg:col-span-2" :history="currentPlayer.history"  />
  </div>
  <div v-else>
    <PlayerLoading />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PlayerFormChart from "../components/PlayerFormChart";
import PlayerPointsChart from "../components/PlayerPointsChart";
import PlayerLoading from '../components/PlayerLoading.vue';

export default {
  props: {
    playerId: {
      type: String,
      required: true,
    },
  },
  components: {
    PlayerFormChart,
    PlayerPointsChart,
    PlayerLoading,
  },
  created() {
    this.fetchCurrentPlayerHistory(this.playerId);
  },
  methods: {
    ...mapActions("playerDetails", ["fetchCurrentPlayerHistory"]),
  },
  computed: {
    ...mapGetters("playerDetails", ["currentPlayer"]),
  },
};
</script>