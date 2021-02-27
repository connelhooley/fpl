const Home = require("./home");
const FdrChart = require("./fdr/charts/all-teams");
const FdrTable = require("./fdr/table");

module.exports = [
  { path: "/", component: Home },
  { path: "/fdr/charts", component: FdrChart },
  { path: "/fdr/table", component: FdrTable },
];