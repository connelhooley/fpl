<template>
  <div>
    <FdrNav />
    <div v-if="fdr.length" class="
      bg-gray-200
      dark:bg-gray-700
      rounded-l-lg"
    >
      <div class="flex flex-row">
        <div class="flex flex-col pt-14">
          <div v-for="team in teams" :key="team.teamId" class="
            w-40
            font-bold
            text-right
            border
            border-gray-200
            dark:border-gray-700
            p-4"
          >
            {{team.teamName}}
          </div>
        </div>
        <div class="flex flex-col flex-auto overflow-x-auto">
          <div class="flex flex-row">
            <div v-for="week in futureWeeks" :key="week.weekNumber" class="
              flex-none
              w-56
              h-14
              font-bold
              text-center
              border
              border-gray-200
              dark:border-gray-700
              p-4"
            >
              {{week.weekNumber}}
            </div>
          </div>
          <div v-for="team in fdr" :key="team.teamId" class="
            flex
            flex-row"
          >
            <FdrTableCell
              v-for="week in team.weeks"
              :key="week.weekNumber"
              :oppositions="week.oppositions"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <FdrLoadingTable />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

import FdrNav from "../components/FdrNav";
import FdrTableCell from "../components/FdrTableCell";
import FdrLoadingTable from "../components/FdrTableLoading";

export default {
  components: {
    FdrNav,
    FdrTableCell,
    FdrLoadingTable,
  },
  computed: {
    ...mapState(["teams"]),
    ...mapGetters(["futureWeeks"]),
    ...mapGetters("fixtures", ["fdr"]),
  },
};
</script>