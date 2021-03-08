<template>
  <div v-if="squads.length" class="space-y-6">
    <overview-squad
      v-for="squad in squads"
      :key="`team-${squad.teamId}`"
      :teamName="squad.teamName"
      :positions="squad.positions"
    />
  </div>
  <loading-squad v-else />
</template>

<script>
import { mapGetters } from "vuex";
import OverviewSquad from "./PlayersOverviewSquad";
import LoadingSquad from "./PlayersOverviewLoadingSquad";

export default {
  components: {
    OverviewSquad,
    LoadingSquad,
  },
  computed: {
    ...mapGetters("playerDetails", ["squads"]),
  },
};
</script>