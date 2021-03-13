<template>
  <div id="app">
    <the-header />
    <the-modal :isOpen="!!searchTerm">
      <template #default>
        <the-content />
      </template>
      <template #modal>
        <the-search-results />
      </template>
    </the-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import TheHeader from "./components/TheHeader";
import TheContent from "./components/TheContent";
import TheModal from "./components/TheModal";
import TheSearchResults from "./components/TheSearchResults";

export default {
  name: "App",
  components: {
    TheHeader,
    TheModal,
    TheContent,
    TheSearchResults,
  },
  created() {
    this.fetchStatic();
  },
  computed: {
    ...mapState("search", ["searchTerm"]),
    ...mapGetters("search", ["searchResults"]),
  },
  methods: {
    ...mapActions(["fetchStatic"]),
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
