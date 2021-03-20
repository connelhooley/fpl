import { calcPoints } from "../../fplPointsRules";

export default {
  namespaced: true,
  state: {
    isCurrentPlayerHistoryDataLoaded: false,
    currentPlayerId: 0,
    currentPlayerHistory: [],
  },
  mutations: {
    SET_CURRENT_PLAYER_ID(state, currentPlayerId) {
      state.currentPlayerId = parseInt(currentPlayerId);
    },
    CLEAR_CURRENT_PLAYER_ID(state) {
      state.currentPlayerId = 0;
    },
    SET_CURRENT_PLAYER_HISTORY_DATA(state, data) {
      state.isCurrentPlayerHistoryDataLoaded = true;
      state.currentPlayerHistory = data.currentPlayerHistory;
    },
    CLEAR_CURRENT_PLAYER_HISTORY_DATA(state) {
      state.isCurrentPlayerHistoryDataLoaded = false;
      state.currentPlayerHistory = [];
    },
  },
  getters: {
    currentPlayer(state, _getters, rootState, rootGetters) {
      if (!rootState.isStaticDataLoaded || !state.isCurrentPlayerHistoryDataLoaded) {
        return null;
      }

      const player = rootState.players.find((player) => player.playerId === state.currentPlayerId);
      const position = rootState.positions.find((position) => position.positionId === player.positionId);

      return {
        ...player,
        ...position,
        history: rootGetters.completedWeeks.map((week) => {
          const history = state.currentPlayerHistory.find((history) => history.weekNumber == week.weekNumber);
          if (!history) {
            return {
              ...week,
              isBlank: true,
            };
          }
          return {
            ...history,
            ...week,
            oppositionName: rootState.teams.find((team) => team.teamId === history.oppositionId).teamName,
            isBlank: false,
            points: calcPoints(history, position),
          };
        }),
      };
    },
  },
  actions: {
    async fetchCurrentPlayerHistory({commit}, playerId) {
      commit("CLEAR_CURRENT_PLAYER_HISTORY_DATA");
      commit("SET_CURRENT_PLAYER_ID", playerId);
      const data = await window.electron.invoke("element-summary-api", playerId);
      const currentPlayerHistory = data.history
        .map((history) => ({
          totalPoints: history.total_points,
          minutesPlayed: history.minutes,
          weekNumber: history.round,
          oppositionId: history.opponent_team,
          bonusPoints: history.bonus,
          goals: history.goals_scored,
          assists: history.assists,
          cleanSheets: history.clean_sheets,
          conceded: history.goals_conceded,
          ownGoals: history.own_goals,
          yellows: history.yellow_cards,
          reds: history.red_cards,
          penaltiesSaved: history.penalties_saved,
          penaltiesMissed: history.penalties_missed,
          saves: history.saves,
        }))
        .sort((a, b) => a.weekNumber - b.weekNumber);
      commit("SET_CURRENT_PLAYER_HISTORY_DATA", {currentPlayerHistory});
    },
  },
};