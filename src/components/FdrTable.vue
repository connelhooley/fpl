<template>
  <table v-if="fdr.length" class="
    block
    overflow-x-auto
    w-full
    m-3
    bg-gray-200
    dark:bg-gray-700
    rounded-lg"
  >
    <tbody class="table table-fixed w-full">
      <tr>
        <td class="w-48"></td>
        <td v-for="(weekId, weekName) in futureWeeks" :key="weekId" class="
          w-40
          font-bold
          text-center
          p-4"
        >
          {{weekName}}
        </td>
      </tr>
      <tr v-for="team in fdr" :key="team.teamId">
        <td class="

          font-bold
          text-right
          p-4"
        >
          {{team.teamName}}
        </td>
        <fdr-table-cell
          v-for="week in team.weeks"
          :key="week.weekId"
          :color="color(week.difficulty)"
          :difficulty="week.difficulty"
          :oppositions="week.oppositions"
          class="
            p-4"
        />
      </tr>
    </tbody>
  </table>
  <div v-else>
    <fdr-loading-chart v-for="n in 5" :key="n" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import * as d3 from "d3";
import FdrTableCell from "./FdrTableCell";
import FdrLoadingChart from "./FdrSideBySideLoadingChart";

export default {
  components: {
    FdrTableCell,
    FdrLoadingChart,
  },
  computed: {
    color() {
      const color = d3.scaleLinear()
        .domain([1, 5])
        .range(["green", "red"]);
      return (difficulty) => {
        if (isNaN(difficulty)) {
          return "none";
        } else {
          return color(difficulty);
        }
      };
    },
    ...mapGetters(["teams", "futureWeeks", "fdr"]),
  },
};
</script>