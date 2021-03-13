<template>
  <toggle-button v-model="isDark" :css-colors="true" :font-size="15" :height="30" :width="60" :margin="3" :labels="{checked: '🌙', unchecked: '☀️'}" />
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
    const mode = localStorage.getItem("darkMode");
    if (mode === null) {
      localStorage.setItem("darkMode", this.isDark);
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
      localStorage.setItem("darkMode", val);
    },
  },
};
</script>

<style lang="postcss" scoped>
/deep/ .v-switch-core {
  @apply bg-gray-400;
}
</style>