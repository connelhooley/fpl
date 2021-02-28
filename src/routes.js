import FdrSideBySide from "./components/FdrSideBySide";
import FdrTable from "./components/FdrTable";

export default [
  { path: "/fdr/chart/side-by-side", component: FdrSideBySide },
  { path: "/fdr/table", component: FdrTable },
  { path: "*", redirect: "/fdr/chart/side-by-side" },
];