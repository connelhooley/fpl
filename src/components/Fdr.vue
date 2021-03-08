<template>
  <div>
    <the-nav :links="links" />
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import TheNav from './TheNav.vue';

export default {
  components: {
    TheNav,
  },
  created() {
    this.fetchFixtures();
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
  methods: {
    ...mapActions("fixtures", ["fetchFixtures"]),
  },
}
</script>