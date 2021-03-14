<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  created() {
    window.addEventListener("keydown", this.keyHandler);
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyHandler);
  },
  methods: {
    ...mapActions("search", [
      "focusSearchBar",
      "moveSelectionUp",
      "moveSelectionDown",
      "clear",
      "confirmSelection",
    ]),
    keyHandler(e) {
      if (e.code === "KeyK" && e.ctrlKey) {
        this.focusSearchBar();
      } else if (e.code === "ArrowUp") {
        this.moveSelectionUp();
      } else if (e.code === "ArrowDown") {
        this.moveSelectionDown();
      } else if (e.code === "Escape") {
        this.clear();
      } else if (e.code === "Enter") {
        this.confirmSelection();
      }
    },
  },
};
</script>