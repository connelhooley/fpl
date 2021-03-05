<template>
  <div v-if="fdr.length" class="
    bg-gray-200
    dark:bg-gray-700
    rounded-l-lg"
  >
    <div class="flex flex-row">
      <div class="flex flex-col pt-14">
        <div v-for="(teamName, teamId) in teams" :key="teamId" class="
          w-40
          font-bold
          text-right
          border-l
          border-t
          last:border-r
          border-gray-200
          dark:border-gray-700
          p-4"
        >
          {{teamName}}
        </div>
      </div>
      <div class="flex flex-col flex-auto overflow-x-auto">
        <div class="flex flex-row">
          <div v-for="(_, weekId) in futureWeeks" :key="weekId" class="
            flex-none
            w-40
            h-14
            font-bold
            text-center
            border-l
            border-t
            last:border-r
            border-gray-200
            dark:border-gray-700
            p-4"
          >
            {{weekId}}
          </div>
        </div>
        <div v-for="team in fdr" :key="team.teamId" class="
          flex
          flex-row"
        >
          <fdr-table-cell
            v-for="week in team.weeks"
            :key="week.weekId"
            :difficulty="week.difficulty"
            :oppositions="week.oppositions"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <fdr-loading-chart v-for="n in 5" :key="n" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import FdrTableCell from "./FdrTableCell";
import FdrLoadingChart from "./FdrSideBySideLoadingChart";

export default {
  components: {
    FdrTableCell,
    FdrLoadingChart,
  },
  computed: {
    ...mapGetters(["teams", "futureWeeks", "fdr"]),
  },
};
</script>