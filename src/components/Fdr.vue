<template>
  <div>
    <div class="
      flex
      space-x-2
      mb-4"
    >
      <router-link
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        active-class="
          text-white
          bg-blue-500
          hover:bg-blue-500
          dark:bg-blue-400
          dark:hover:bg-blue-400"
        class="
          rounded
          p-4
          hover:bg-gray-100
          dark:hover:bg-gray-700"
      >
        {{link.label}}
      </router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  created() {
    this.getFixtures();
  },
  data() {
    return {
      links: [
        {
          to: "/fdr/charts",
          label: "Charts",
        },
        {
          to: "/fdr/table",
          label: "Table",
        },
      ],
    };
  },
  computed: {
    ...mapGetters([
      "fdr",  
    ]),
  },
  methods: {
    ...mapActions([
      "getFixtures",
    ]),
  },
}
</script>