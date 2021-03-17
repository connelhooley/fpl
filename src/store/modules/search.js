export default {
  namespaced: true,
  state: {
    searchTerm: "",
    searchResults: [],
    searchBarFocused: 0,
  },
  mutations: {
    SET_SEARCH_TERM(state, searchTerm) {
      state.searchTerm = searchTerm;
    },
    CLEAR_SEARCH_TERM(state) {
      state.searchTerm = "";
    },
    SET_SEARCH_RESULTS(state, searchResults) {
      state.searchResults = searchResults;
    },
    CLEAR_SEARCH_RESULTS(state) {
      state.searchResults = [];
    },
    INCREMENT_SEARCH_BAR_FOCUS(state) {
      state.searchBarFocused++;
    },
  },
  actions: {
    updateSearchTerm({commit, rootState}, searchTerm) {
      commit("SET_SEARCH_TERM", searchTerm);
      const teamResults = rootState.teams
        .filter((team) => team.teamName.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
        .slice(0, 3)
        .map((team) => ({
          type: "team",
          to: `/team/${team.teamId}`,
          ...team,
        }));

      const playerResults = rootState.players
        .filter((player) => player.playerName.stripAccents().toLocaleLowerCase().includes(searchTerm.stripAccents().toLocaleLowerCase()))
        .sort((a, b) => b.playerTotalPoints - a.playerTotalPoints)
        .slice(0, 10)
        .map((player) => ({
          type: "player",
          to: `/players/player/${player.playerId}`,
          ...player,
          ...rootState.teams.find((t) => t.teamId === player.teamId),
        }));
        
      commit("SET_SEARCH_RESULTS", [...teamResults, ...playerResults]);
    },
    clear({commit}) {
      commit("CLEAR_SEARCH_TERM");
      commit("CLEAR_SEARCH_RESULTS");
    },
    focusSearchBar({commit}) {
      commit("INCREMENT_SEARCH_BAR_FOCUS");
    },
  },
};