const GKP = 1;
const DEF = 2;
const MID = 3;
const FWD = 4;

const calcMinutesPoints = (minutesPlayed) => {
  if (minutesPlayed < 1) {
    return 0;
  } else if (minutesPlayed < 60) {
    return 1;
  } else {
    return 2;
  }
};

const pointsPerGoalMap = new Map([
  [GKP, 6],
  [DEF, 6],
  [MID, 5],
  [FWD, 4],
]);

const pointsPerCleanSheetMap = new Map([
  [GKP, 4],
  [DEF, 4],
  [MID, 1],
  [FWD, 0],
]);

const pointsPerGoalConcededMap = new Map([
  [GKP, -1],
  [DEF, -1],
  [MID, 0],
  [FWD, 0],
]);

export function calcPoints(history, {positionId}) {
  const result = {
    minutesPlayed: calcMinutesPoints(history.minutesPlayed),
    bonusPoints: history.bonusPoints ? history.bonusPoints : 0,
    goals: history.goals * pointsPerGoalMap.get(positionId),
    assists: history.assists * 3,
    cleanSheets: history.cleanSheets * pointsPerCleanSheetMap.get(positionId),
    conceded: Math.floor(history.conceded / 2) * pointsPerGoalConcededMap.get(positionId),
    ownGoals: history.ownGoals * -2,
    yellows: history.yellows * -1,
    reds: history.reds * -3,
    penaltiesSaved: history.penaltiesSaved * 5,
    penaltiesMissed: history.penaltiesMissed * -2,
    saves: Math.floor(history.saves / 3) * 1,
  };
  result.calculatedTotal = 
    result.minutesPlayed +
    result.bonusPoints +
    result.goals +
    result.assists +
    result.cleanSheets +
    result.conceded +
    result.ownGoals +
    result.yellows +
    result.reds +
    result.penaltiesSaved +
    result.penaltiesMissed +
    result.saves;
  result.calculationsAreCorrect = result.calculatedTotal === history.totalPoints;
  return result;
}