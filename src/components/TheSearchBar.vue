<template>
  <input
    type="text"
    placeholder="Search for a team or player... (CTRL+K)"
    ref="searchRef"
    v-model="searchTerm"
    @keyup.arrow-up.prevent
    @keydown.arrow-up.prevent
    @keyup.arrow-down.prevent
    @keydown.arrow-down.prevent
    @blur="searchBlur"
    class="
      text-gray-500
      placeholder-gray-400
      focus:outline-none
      focus:ring-4
      focus:ring-opacity-50
      focus:ring-blue-500
      dark:focus:ring-blue-400
      bg-white
      block
      w-full
      h-10
      p-4
      rounded-lg"
  />
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  computed: {
    ...mapState("search", [
      "isSearchBarFocused",
      "isSearchBarBlurred",
      "isSearchResultConfirmed",
    ]),
    ...mapGetters("search", [
      "selectedSearchResult",
    ]),
    searchTerm: {
      get() {
        return this.$store.state.search.searchTerm;
      },
      set(value) {
        this.$store.dispatch("search/search", value);
      },
    },
  },
  watch: {
    isSearchBarFocused(val) {
      if (this.$refs.searchRef && val) {
        this.$refs.searchRef.focus();
        this.focusedSearchBar();
      }
    },
    isSearchBarBlurred(val) {
      if (this.$refs.searchRef && val) {
        this.$refs.searchRef.blur();
        this.blurredSearchBar();
      }
    },
    isSearchResultConfirmed(val) {
      if (this.$refs.searchRef && val) {
        this.$router.push(this.selectedSearchResult.to);
        this.clear();
      }
    },
  },
  methods: {
    ...mapActions("search", ["focusedSearchBar", "blurredSearchBar", "clear"]),
    searchBlur() {
    },
  },
};
</script>