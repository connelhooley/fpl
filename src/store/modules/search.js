export default {
  namespaced: true,
  state: {
    searchTerm: "",
  },
  mutations: {
    SET_SEARCH_TERM(state, searchTerm) {
      state.searchTerm = searchTerm;
    },
    CLEAR_SEARCH_TERM(state) {
      state.searchTerm = "";
    },
  },
  getters: {
    searchResults(state, _getters, rootState) {
      if (!rootState.isStaticDataLoaded) {
        return [];
      }

      if (!state.searchTerm) {
        return [];
      }

      const teamResults = rootState.teams
        .filter((team) => team.teamName.toLowerCase().includes(state.searchTerm.toLowerCase()))
        .slice(0, 5)
        .map((team) => ({
          type: "team",
          label: team.teamName,
          to: `/team/${team.teamId}`,
        }));

      const playerResults = rootState.players
        .filter((player) => player.playerName.toLowerCase().includes(state.searchTerm.toLowerCase()))
        .slice(0, 10)
        .map((player) => ({
          type: "player",
          label: player.playerName,
          to: `/players/player/${player.playerId}`,
        }));

      return [...teamResults, ...playerResults];
    },
  },
  actions: {
    search({commit}, searchTerm) {
      commit("SET_SEARCH_TERM", searchTerm);
    },
    clear({commit}) {
      commit("CLEAR_SEARCH_TERM");
    },
  },
};