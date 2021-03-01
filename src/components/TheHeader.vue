<template>
  <header class="flex bg-gray-300 dark:bg-gray-900">
    <nav class="flex-1">
      <router-link active-class="" class="inline-block p-4 hover:transition-colors duration-100 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700" to="/fdr/chart/side-by-side">FDR (Line Chart)</router-link>
      <router-link active-class="" class="inline-block p-4 hover:transition-colors duration-100 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700" to="/fdr/table">FDR (Table)</router-link>
    </nav>
    <div class="inline-block p-4">
      <toggle-button v-model="isDark" :css-colors="true" :font-size="12" :height="20" :width="48" :margin="3" :labels="{checked: '🌙', unchecked: '☀️'}" />
    </div>
  </header>
</template>

<script>
import { ToggleButton } from "vue-js-toggle-button";

export default {
  data() {
    return {
      isDark: true,
    };
  },
  components: {
    ToggleButton,
  },
  created() {
    const mode = localStorage.getItem("mode");
    if (mode === null) {
      localStorage.setItem("mode", this.isDark);
    } else {
      this.isDark = mode === "true";
    }
  },
  watch: {
    isDark(val) {
      if (val) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
/deep/ .v-switch-core {
  @apply bg-gray-400;
}
/deep/ .v-switch-core {
  @apply bg-gray-400;
}
</style>