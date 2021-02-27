const { ipcRenderer } = require("electron");
const d3 = require("d3");

const FdrChart = require("./chart");

module.exports = {
  template: `
<div id="fdr-all-teams">
  <fdr-chart
    v-for="team in teamsFdrData" :key="team.teamId"
    v-bind:teamId="team.teamId"
    v-bind:color="team.color"
    v-bind:weeks="team.weeks"
    v-bind:teams="teams" />
</div>`,
  components: {
    FdrChart,
  },
  data() {
    return {
      teamsFdrData: [],
    };
  },
  mounted() {
    const vm = this;
    Promise.all([ipcRenderer.invoke("static-api"), ipcRenderer.invoke("fixture-api")]).then(([static, fixtures]) => {
      const color = d3.scaleOrdinal()
        .domain(static.teams.map(team => team.id))
        .range(d3.schemeSet2);
      vm.teams = static.teams.toLookUp((team) => team.id, (team) => team.name);
      vm.teamsFdrData = static.teams.map(team => ({
        teamId: team.id,
        color: color(team.id),
        weeks: static.events
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
              oppositions: weekFixtures.map((wf) => ({ teamId: wf.oppositionId, difficulty: wf.difficulty }))
            };
          }),
      }));
    });
  },
};