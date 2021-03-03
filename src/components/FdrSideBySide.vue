<template>
  <div>
    <fdr-chart
      v-for="team in teamsFdrData"
      :key="team.teamId"
      :teamId="team.teamId"
      :color="team.color"
      :weeks="team.weeks"
      :teams="teams"
    />
    <div v-if="teamsFdrData.length === 0">
      <div v-for="n in 5" :key="n" class="inline-block w-1/3 h-44 p-2">
        <loading-chart />
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import FdrChart from "./FdrSideBySideChart";
import LoadingChart from './LoadingChart.vue';

export default {
  data() {
    return {
      loaded: false,
      teamsFdrData: [],
      teams: {},
    };
  },
  components: {
    FdrChart,
    LoadingChart,
  },
  async mounted() {
    const [staticData, fixtures] = await Promise.all([window.electron.invoke("static-api"), window.electron.invoke("fixture-api")]);
    const color = d3.scaleOrdinal()
      .domain(staticData.teams.map(team => team.id))
      .range(d3.schemeSet2);
    this.teams = staticData.teams.toLookUp((team) => team.id, (team) => team.name);
    this.teamsFdrData = staticData.teams.map(team => ({
      teamId: team.id,
      color: color(team.id),
      weeks: staticData.events
        .filter((week) => !week.finished && !week.is_current)
        .slice(0, 14)
        .map((week) => {
          const weekFixtures = fixtures
            .filter((fixture) => fixture.event === week.id)
            .filter((fixture) => fixture.team_h === team.id || fixture.team_a === team.id)
            .map((fixture) => ({
              difficulty: team.id === fixture.team_h
                ? fixture.team_h_difficulty
                : fixture.team_a_difficulty,
              oppositionId: team.id === fixture.team_h
                ? fixture.team_a
                : fixture.team_h,
            }));
          return {
            weekId: week.id,
            difficulty: weekFixtures.map((wf) => wf.difficulty).average(),
            oppositions: weekFixtures.map((wf) => ({teamId: wf.oppositionId, difficulty: wf.difficulty}))
          };
        }),
    }));
  },
};
</script>