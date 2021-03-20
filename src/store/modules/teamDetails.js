export default {
  namespaced: true,
  state: {
    currentTeamId: 0,
  },
  mutations: {
    SET_CURRENT_TEAM_ID(state, currentTeamId) {
      state.currentTeamId = parseInt(currentTeamId);
    },
    CLEAR_CURRENT_TEAM_ID(state) {
      state.currentTeamId = 0;
    },
  },
  getters: {
    currentTeam(state, _getters, rootState) {
      if (!rootState.isStaticDataLoaded) {
        return null;
      }

      const team = rootState.teams.find((team) => team.teamId === state.currentTeamId);
      return {
        ...team,
        positions: rootState.positions.map((position) => ({
          ...position,
          players: rootState.players
            .filter((player) => player.teamId === team.teamId)
            .filter((player) => player.positionId === position.positionId)
            .map((player) => ({
              playerId: player.playerId,
              playerName: player.playerName,
              playerTotalPoints: player.playerTotalPoints,
            }))
            .sort((a,b) => b.playerTotalPoints - a.playerTotalPoints),
        })),
      };
    },
  },
  actions: {
    setCurrentTeamId({commit}, teamId) {
      commit("SET_CURRENT_TEAM_ID", teamId);
    },
    clearCurrentTeamId({commit}) {
      commit("CLEAR_CURRENT_TEAM_ID");
    },
  },
};