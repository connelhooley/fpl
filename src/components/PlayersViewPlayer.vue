<template>
  <div v-if="currentPlayer">
    <h1 class="text-4xl font-bold mb-8">{{currentPlayer.playerName}} ({{currentPlayer.positionShortName}})</h1>
    <form-chart :history="currentPlayer.history"  />
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import FormChart from "./PlayersViewPlayerFormChart";

export default {
  components: {
    FormChart,
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