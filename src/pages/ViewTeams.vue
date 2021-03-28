<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <template v-if="teams.length">
      <RouterLink
        v-for="team in teams"
        :key="team.teamId"
        :to="{name: 'view-team', params: {teamId: team.teamId}}"
        class="
          block
          text-xl
          xl:text-2xl
          p-4
          rounded
          bg-gray-200
          dark:bg-gray-900
          border
          border-gray-300
          dark:border-gray-700
          hover:border-blue-400
          dark:hover:border-blue-500
          "
      >
        {{team.teamName}}
      </RouterLink>
    </template>
    <template v-else>
      <div v-for="n in 5" :key="n">
        <Loading :width="48" />
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Loading from "../components/Loading";

export default {
  components: {
    Loading,
  },
  computed: {
    ...mapState(["teams"]),
  },
};
</script>