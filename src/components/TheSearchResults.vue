<template>
  <div v-if="searchResults.length">
    <div
      v-for="(result, index) in searchResults"
      :key="result.to"
      :to="result.to"
      @click="select(index)"
      class="
        hover:bg-gray-100
        px-4
        py-2"
      :class="{'font-bold': index === focusedSearchResultIndex}"
    >
      {{result.label}}
    </div>
  </div>
  <div
    v-else
    class="
      text-gray-400
      italic
      p-2
      px-4
      py-2"
  >
    No matching results...
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState("search", ["searchResults", "focusedSearchResultIndex"]),
  },
  methods: {
    ...mapActions("search", ["moveSelection", "confirmSelection"]),
  }
};
</script>