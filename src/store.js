import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    teams: [],
    events: [],
    fixtures: [],
  },
  mutations: {
    RESET_STATIC_DATA(state) {
      state.teams = [];
      state.events = [];
    },
    STATIC_DATA(state, data) {
      state.teams = data.teams;
      state.events = data.events;
    },
    RESET_FIXTURE_DATA(state) {
      state.fixtures = [];
    },
    FIXTURE_DATA(state, data) {
      state.fixtures = data;
    },
  },
  getters: {
    isStaticDataLoaded(state) {
      return state.teams.length && state.events.length;
    },
    isFixtureDataLoaded(state) {
      return !!state.fixtures.length;
    },
    teams(state) {
      return state.teams.toLookUp((team) => team.id, (team) => team.name);
    },
    futureWeeks(state) {
      return state.events
        .filter((week) => !week.finished && !week.is_current)
        .toLookUp((event) => event.id, (event) => event.name);
    },
    fdr(state, getters) {
      if (!getters.isStaticDataLoaded || !getters.isFixtureDataLoaded) {
        return [];
      }

      const futureWeeks = state.events.filter((week) => !week.finished && !week.is_current);

      return state.teams.map((team) => ({
        teamId: team.id,
        teamName: team.name,
        teamShortName: team.short_name,
        weeks: futureWeeks.map((week) => {
          const weekFixtures = state.fixtures
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
            weekNumber: week.id,
            weekName: week.name,
            difficulty: weekFixtures.map((wf) => wf.difficulty).average(),
            oppositions: weekFixtures.map((wf) => ({
              teamName: state.teams.find((t) => t.id === wf.oppositionId).name,
              teamShortName: state.teams.find((t) => t.id === wf.oppositionId).short_name,
              difficulty: wf.difficulty,
            })),
          };
        }),
      }));
    },
  },
  actions: {
    async getStatic({commit}) {
      commit("RESET_STATIC_DATA");
      const data = await window.electron.invoke("static-api");
      commit("STATIC_DATA", data);
    },
    async getFixtures({commit}) {
      commit("RESET_FIXTURE_DATA");
      const data = await window.electron.invoke("fixture-api");
      commit("FIXTURE_DATA", data);
    },
  },
});