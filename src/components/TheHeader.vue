<template>
  <header class="flex bg-gray-200 dark:bg-gray-900">
    <nav class="flex-auto flex">
      <router-link 
        v-for="(link, index) in menuLinks"
        :key="index"
        :to="link.to"
        active-class=""
        class="flex flex-col justify-center inline-block p-4 hover:bg-gray-300 dark:hover:bg-gray-700">
        <div>
          {{link.label}}
        </div>
      </router-link>
    </nav>
    <div class="flex-none inline-block p-4">
      <toggle-button v-model="isDark" :css-colors="true" :font-size="15" :height="30" :width="60" :margin="3" :labels="{checked: '🌙', unchecked: '☀️'}" />
    </div>
  </header>
</template>

<script>
import { ToggleButton } from "vue-js-toggle-button";

export default {
  data() {
    return {
      isDark: true,
      menuLinks: [
        {
          label: "FDR (Line Chart)",
          to: "/fdr/chart/side-by-side",
        },
        {
          label: "FDR (Table)",
          to: "/fdr/table",
        },
      ],
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
</style>