<template>
  <div class="relative">
    <input
      id="search-bar"
      type="text"
      placeholder="Search for a team or player... (ctrl+k)"
      ref="searchInputRef"
      v-model="searchInputValue"
      @keyup.arrow-up.prevent
      @keydown.arrow-up.prevent="moveUp"
      @keyup.arrow-down.prevent
      @keydown.arrow-down.prevent="moveDown"
      @keydown.esc.prevent="clear"
      @keydown.enter.prevent="select(selectedIndex)"
      @keyup.tab.prevent
      @keydown.tab.prevent
      @blur="blur"
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
    <div
      v-if="searchTerm.length"
      class="
        absolute
        w-full
        mt-2
        p-2
        text-white
        dark:text-black
        bg-gray-800
        dark:bg-white
        rounded-lg"
    >
      <div ref="resultsContainerRef" class="
        w-full
        max-h-80
        overflow-y-auto">
        <TheSearchBarResult
          v-for="(result, index) in searchResults"
          :key="result.to"
          :result="result"
          :selected="index === selectedIndex"
          @click="select(index)"
        />
        <div
          v-if="!searchResults.length"
          class="
            text-gray-400
            italic
            p-2
            px-4
            py-2"
        >
          No matching results...
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheSearchBarResult from "./TheSearchBarResult";
import { mapActions, mapState } from 'vuex';
export default {
  data() {
    return {
      selectedIndex: 0,
    };
  },
  components: {
    TheSearchBarResult,
  },
  computed: {
    ...mapState("search", ["searchTerm", "searchResults", "searchBarFocused"]),
    searchInputValue: {
      get() {
        return this.searchTerm;
      },
      set(val) {
        this.updateSearchTerm(val);
      },
    },
  },
  methods: {
    ...mapActions("search", ["updateSearchTerm"]),
    select(index) {
      this.$router.push(this.searchResults[index].to);
      this.clear();
    },
    moveUp() {
      const newIndex = this.selectedIndex-1;
      if (newIndex >= 0 && newIndex < this.searchResults.length) {
        this.selectedIndex = newIndex;
      }
    },
    moveDown() {
      const newIndex = this.selectedIndex+1;
      if (newIndex >= 0 && newIndex < this.searchResults.length) {
        this.selectedIndex = newIndex;
      }
    },
    clear() {
      this.searchInputValue = "";
      this.$refs.searchInputRef.blur();
    },
    blur(e) {
      if (!this.$refs.resultsContainerRef || !this.$refs.resultsContainerRef.contains(e.relatedTarget)) {
        this.clear();
      }
    },
  },
  watch: {
    searchBarFocused() {
      this.$refs.searchInputRef.focus();
    },
    searchTerm() {
      this.selectedIndex = 0;
    },
  },
};
</script>