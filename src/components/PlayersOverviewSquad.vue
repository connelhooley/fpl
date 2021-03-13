<template>
  <div>
    <div class="
      p-4
      text-4xl
      font-bold
      uppercase
      rounded-t
      bg-gray-300
      dark:bg-gray-900"
    >
      {{teamName}}
    </div>
    <div
      v-for="position in positions"
      :key="`position-${position.positionId}`"
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
        :key="`player-${player.playerId}`"
        :to="`/players/player/${player.playerId}`"
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
</template>

<script>
export default {
  props: {
    teamName: String,
    positions: Array,
  },
};
</script>