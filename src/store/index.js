import Vue from "vue";
import Vuex from "vuex";

import fixtures from "./modules/fixtures";
import playerDetails from "./modules/playerDetails";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isStaticDataLoaded: false,
    teams: [],
    weeks: [],
    players: [],
    positions: [],
  },
  mutations: {
    CLEAR_STATIC_DATA(state) {
      state.isStaticDataLoaded = false;
      state.teams = [];
      state.weeks = [];
      state.players = [];
      state.positions = [];
    },
    SET_STATIC_DATA(state, data) {
      state.isStaticDataLoaded = true;
      state.teams = data.teams;
      state.weeks = data.weeks;
      state.players = data.players;
      state.positions = data.positions;
    },
  },
  getters: {
    futureWeeks(state) {
      return state.weeks.filter((week) => !week.isFinished && !week.isCurrent);
    },
    completedWeeks(state) {
      return state.weeks.filter((week) => week.isFinished);
    },
    currentWeek(state) {
      return state.weeks.find((week) => week.isCurrent);
    },
  },
  actions: {
    async fetchStatic({commit}) {
      commit("CLEAR_STATIC_DATA");
      const data = await window.electron.invoke("static-api");
      const teams = data.teams.map((team) => ({
        teamId: team.id,
        teamName: team.name,
        teamShortName: team.short_name,
      }));

      const weeks = data.events.map((week) => ({
        weekNumber: week.id,
        weekName: week.name,
        isCurrent: week.is_current,
        isFinished: week.finished,
      }));
      weeks.sort((a, b) => a.weekNumber - b.weekNumber);

      const players = data.elements
        .filter((element) => element.status != "u")
        .map((element) => ({
          playerId: element.id,
          playerName: element.web_name,
          totalPoints: element.total_points,
          teamId: element.team,
          positionId: element.element_type,
        }));

      const positions = data.element_types.map((team) => ({
        positionId: team.id,
        positionSingularName: team.singular_name,
        positionPluralName: team.plural_name,
        positionShortName: team.singular_name_short,
      }));

      commit("SET_STATIC_DATA", {teams, weeks, players, positions});
    },
  },
  modules: {
    fixtures,
    playerDetails,
  },
});