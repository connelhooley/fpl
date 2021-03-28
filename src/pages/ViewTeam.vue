<template>
  <div v-if="currentTeam">
    <div class="
      p-4
      text-4xl
      font-bold
      uppercase
      rounded-t
      bg-gray-300
      dark:bg-gray-900"
    >
      {{currentTeam.teamName}}
    </div>
    <div
      v-for="position in currentTeam.positions"
      :key="position.positionId"
    >
      <div class="
        px-4
        py-2
        text-xl
        font-bold
        bg-gray-200
        dark:bg-gray-600
        uppercase"
      >
        {{position.positionPluralName}}
      </div>
      <router-link
        v-for="player in position.players"
        :key="player.playerId"
        :to="{name: 'view-player', params: {playerId: player.playerId}}"
        class="
          block
          px-4
          py-1
          text-blue-400
          hover:text-blue-600
          bg-gray-100
          dark:bg-gray-700"
      >
        {{player.playerName}} ({{player.playerTotalPoints}})
      </router-link>
    </div>
  </div>
  <TeamLoading v-else />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TeamLoading from "../components/TeamLoading"

export default {
  props: {
    teamId: {
      type: String,
      required: true,
    }
  },
  components: {
    TeamLoading,
  },
  created() {
    this.setCurrentTeamId(this.teamId);
  },
  methods: {
    ...mapActions("teamDetails", ["setCurrentTeamId"]),
  },
  computed: {
    ...mapGetters("teamDetails", ["currentTeam"]),
  },
};
</script>