<template>
  <nav class="
    flex
    space-x-2
    mb-4"
  >
    <router-link
      v-for="(link, index) in links"
      :key="index"
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
  </nav>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          label: "Charts",
          to: {
            name: "fdr-charts"
          },
        },
        {
          label: "Table",
          to: {
            name: "fdr-table"
          },
        },
      ],
    };
  },
}
</script>