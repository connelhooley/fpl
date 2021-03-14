export default {
  namespaced: true,
  state: {
    searchTerm: "",
    searchResults: [],
    isSearchBarFocused: false,
    isSearchBarBlurred: false,
    focusedSearchResultIndex: -1,
    isSearchResultConfirmed: false,
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
    SET_SEARCH_RESULT_FOCUS(state, searchResultIndex) {
      state.focusedSearchResultIndex = searchResultIndex;
    },
    CLEAR_SEARCH_RESULT_FOCUS(state) {
      state.focusedSearchResultIndex = -1;
    },
    SET_SEARCH_BAR_FOCUS(state, isFocused) {
      state.isSearchBarFocused = isFocused;
    },
    SET_SEARCH_BAR_BLUR(state, isBlurred) {
      state.isSearchBarBlurred = isBlurred;
    },
    SET_SEARCH_RESULT_CONFIRMED(state, isConfirmed) {
      state.isSearchResultConfirmed = isConfirmed;
    },
  },
  getters: {
    openModel(state) {
      return !!state.searchTerm;
    },
    selectedSearchResult(state) {
      if(state.searchTerm) {
        return state.searchResults[state.focusedSearchResultIndex];
      } else {
        return {};
      }
    }
  },
  actions: {
    search({commit, rootState}, searchTerm) {
      commit("SET_SEARCH_TERM", searchTerm);
      const teamResults = rootState.teams
        .filter((team) => team.teamName.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 5)
        .map((team) => ({
          type: "team",
          label: team.teamName,
          to: `/team/${team.teamId}`,
        }));

      const playerResults = rootState.players
        .filter((player) => player.playerName.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 10)
        .map((player) => ({
          type: "player",
          label: player.playerName,
          to: `/players/player/${player.playerId}`,
        }));

      const searchResults = [...teamResults, ...playerResults];
      commit("SET_SEARCH_RESULTS", searchResults);
      commit("SET_SEARCH_RESULT_FOCUS", 0);
    },
    clear({commit}) {
      commit("CLEAR_SEARCH_TERM");
      commit("CLEAR_SEARCH_RESULTS");
      commit("CLEAR_SEARCH_RESULT_FOCUS");
      commit("SET_SEARCH_BAR_BLUR", true);
      commit("SET_SEARCH_RESULT_CONFIRMED", false);
    },
    focusSearchBar({commit}) {
      commit("SET_SEARCH_BAR_FOCUS", true);
    },
    focusedSearchBar({commit}) {
      commit("SET_SEARCH_BAR_FOCUS", false);
    },
    blurSearchBar({commit}) {
      commit("SET_SEARCH_BAR_BLUR", true);
    },
    blurredSearchBar({commit}) {
      commit("SET_SEARCH_BAR_BLUR", false);
    },
    moveSelectionUp({commit, state}) {
      if (state.searchTerm) {
        const newSelection = state.focusedSearchResultIndex - 1;
        if (newSelection >= 0) {
          commit("SET_SEARCH_RESULT_FOCUS", newSelection);
        }
      }
    },
    moveSelectionDown({commit, state}) {
      if (state.searchTerm) {
        const newSelection = state.focusedSearchResultIndex + 1;
        if (newSelection < state.searchResults.length) {
          commit("SET_SEARCH_RESULT_FOCUS", newSelection);
        }
      }
    },
    moveSelection({commit, state}, newSelection) {
      if (state.searchTerm && newSelection >= 0 && newSelection < state.searchResults.length) {
        commit("SET_SEARCH_RESULT_FOCUS", newSelection);
      }
    },
    confirmSelection({commit, state}) {
      if (state.searchTerm) {
        commit("SET_SEARCH_RESULT_CONFIRMED", true);
      }
    },
    confirmedSelection({commit}) {
      commit("SET_SEARCH_RESULT_CONFIRMED", false);
    },
  },
};