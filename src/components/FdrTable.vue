<template>
  <div v-if="loaded">Table to go here</div>
  <div v-else>
    <div v-for="n in 5" :key="n" class="inline-block w-1/3 h-44 p-2">
      <loading-chart />
    </div>
  </div>
</template>

<script>
import LoadingChart from './LoadingChart.vue';
export default {
  data() {
    return {
      loaded: false,
    };
  },
  components: {
    LoadingChart
  },
  created() {
    setTimeout(() => {
      this.loaded = true;
    }, 2000);
  },
};
</script>