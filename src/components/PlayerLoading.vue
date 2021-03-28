<template>
  <div class="grid grid-cols-4 gap-8">
    <div class="col-span-4">
      <Loading :width="96" :height="12" />
    </div>
    <div class="col-span-4">
      <LoadingLineChart :width="1000" :height="200" />
    </div>
    <div class="col-span-4 md:col-span-3 lg:col-span-2">
      <LoadingBarChart />
    </div>
  </div>
</template>

<script>
import Loading from "./Loading";
import LoadingLineChart from "./LoadingLineChart";
import LoadingBarChart from "./LoadingBarChart";

export default {
  components: {
    Loading,
    LoadingLineChart,
    LoadingBarChart,
  },
};
</script>