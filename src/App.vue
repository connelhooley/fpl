<template>
  <div id="app">
    <the-keyboard-controls>
      <the-header />
      <the-modal :isOpen="openModel">
        <template #default>
          <the-content />
        </template>
        <template #modal>
          <the-search-results />
        </template>
      </the-modal>
    </the-keyboard-controls>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TheHeader from "./components/TheHeader";
import TheContent from "./components/TheContent";
import TheModal from "./components/TheModal";
import TheSearchResults from "./components/TheSearchResults";
import TheKeyboardControls from './components/TheKeyboardControls.vue';

export default {
  name: "App",
  components: {
    TheKeyboardControls,
    TheHeader,
    TheContent,
    TheModal,
    TheSearchResults,
  },
  created() {
    this.fetchStatic();
  },
  computed: {
    ...mapGetters("search", ["openModel"]),
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
