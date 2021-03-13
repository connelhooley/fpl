<template>
  <input ref="search" :value="searchTerm" @input="searchInput" @blur="searchBlur" type="text" placeholder="Search for a team or player..." class="
    text-gray-500
    placeholder-gray-400
    focus:outline-none
    focus:ring-1
    dark:focus:ring-3
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
import { mapActions, mapState} from "vuex";

export default {
  computed: {
    ...mapState("search", ["searchTerm"]),
  },
  methods: {
    ...mapActions("search", ["search", "clear"]),
    searchInput(e) {
      this.search(e.target.value);
    },
    searchBlur() {
      // this.clear();
    },
  },
};
</script>