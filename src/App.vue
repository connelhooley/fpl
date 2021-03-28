<template>
  <div id="app" class="flex flex-col">
    <the-header class="flex-none" />
    <the-content class="flex-grow overflow-y-auto" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import TheHeader from "./components/TheHeader";
import TheContent from "./components/TheContent";

export default {
  name: "App",
  components: {
    TheHeader,
    TheContent,
  },
  created() {
    window.addEventListener("keydown", this.keyHandler);
    this.fetchStatic();
    this.fetchFixtures();
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyHandler);
  },
  methods: {
    ...mapActions("search", ["focusSearchBar"]),
    ...mapActions(["fetchStatic"]),
    ...mapActions("fixtures", ["fetchFixtures"]),
    keyHandler(e) {
      if (e.code === "KeyK" && e.ctrlKey) {
        this.focusSearchBar();
      }
    },
  },
};
</script>

<style lang="postcss">
html,
body,
#app {
    height: 100%;
    overflow-y: hidden;
}

body {
  @apply bg-white text-black dark:text-white dark:bg-gray-800;
}

.tippy-box {
  @apply bg-black text-white dark:bg-white dark:text-black;
}

.tippy-box[data-placement^='top'] > .tippy-arrow::before {
  border-top-color: black;
}

html.dark .tippy-box[data-placement^='top'] > .tippy-arrow::before {
  border-top-color: white;
}

.tippy-box[data-placement^='bottom'] > .tippy-arrow::before {
  border-bottom-color: black;
}

html.dark .tippy-box[data-placement^='bottom'] > .tippy-arrow::before {
  border-bottom-color: white;
}

.tippy-box[data-placement^='left'] > .tippy-arrow::before {
  border-left-color: black;
}

html.dark .tippy-box[data-placement^='left'] > .tippy-arrow::before {
  border-left-color: white;
}

.tippy-box[data-placement^='right'] > .tippy-arrow::before {
  border-right-color: black;
}

html.dark .tippy-box[data-placement^='right'] > .tippy-arrow::before {
  border-right-color: white;
}
</style>
