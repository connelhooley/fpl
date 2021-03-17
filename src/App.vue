<template>
  <div id="app">
    <the-header />
    <the-content />
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
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyHandler);
  },
  methods: {
    ...mapActions("search", ["focusSearchBar"]),
    ...mapActions(["fetchStatic"]),
    keyHandler(e) {
      if (e.code === "KeyK" && e.ctrlKey) {
        this.focusSearchBar();
      }
    },
  },
};
</script>

<style lang="postcss">
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
