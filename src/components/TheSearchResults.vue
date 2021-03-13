<template>
  <div v-if="searchTerm.length">
    <router-link
      v-for="result in searchResults"      
      :key="result.to"
      :to="result.to"
      class="
        block
        hover:bg-gray-100
        px-4
        py-2"
    >
      {{result.label}}
    </router-link>
    <div
      v-if="!searchResults.length"
      class="
        text-gray-400
        block
        p-2"
    >
      No matching results...
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  computed: {
    ... mapState("search", ["searchTerm"]),
    ...mapGetters("search", ["searchResults"]),
  },
};
</script>