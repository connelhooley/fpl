const Home = require("./home");
const FdrSideBySideChart = require("./fdr/charts/side-by-side");
const FdrTable = require("./fdr/table");

module.exports = [
  { path: "/", component: Home },
  { path: "/fdr/chart/side-by-side", component: FdrSideBySideChart },
  { path: "/fdr/table", component: FdrTable },
];