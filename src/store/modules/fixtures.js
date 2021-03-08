export default {
  namespaced: true,
  state: {
    isFixtureDataLoaded: false,
    fixtures: [],
  },
  mutations: {
    CLEAR_FIXTURE_DATA(state) {
      state.isFixtureDataLoaded = false;
      state.fixtures = [];
    },
    SET_FIXTURE_DATA(state, data) {
      state.isFixtureDataLoaded = true;
      state.fixtures = data.fixtures;
    },
  },
  getters: {
    fdr(state, _getters, rootState, rootGetters) {
      if (!rootState.isStaticDataLoaded || !state.isFixtureDataLoaded) {
        return [];
      }

      return rootState.teams.map((team) => ({
        ...team,
        weeks: rootGetters.futureWeeks.map((week) => {
          const oppositions = state.fixtures
            .filter((fixture) => fixture.weekNumber === week.weekNumber)
            .filter((fixture) => fixture.homeTeamId == team.teamId || fixture.awayTeamId == team.teamId)
            .map((fixture) => {
              const oppositionId = fixture.homeTeamId === team.teamId
                ? fixture.awayTeamId
                : fixture.homeTeamId;
              const difficulty = fixture.homeTeamId === team.teamId
                ? fixture.homeTeamDifficulty
                : fixture.awayTeamDifficulty;
              return {
                ...rootState.teams.find((t) => t.teamId === oppositionId),
                difficulty,
              };
            });
          return {
            ...week,
            difficulty: oppositions.map((opposition) => opposition.difficulty).average(),
            oppositions,
          };
        }),
      }));
    },
  },
  actions: {
    async fetchFixtures({commit}) {
      commit("CLEAR_FIXTURE_DATA");
      const data = await window.electron.invoke("fixture-api");
      const fixtures = data
        .filter((fixture) => !fixture.finished && fixture.event)
        .map((fixture) => ({
          weekNumber: fixture.event,
          homeTeamId: fixture.team_h,
          homeTeamDifficulty: fixture.team_h_difficulty,
          awayTeamId: fixture.team_a,
          awayTeamDifficulty: fixture.team_a_difficulty,
        }));
      commit("SET_FIXTURE_DATA", {fixtures});
    },
  },
};