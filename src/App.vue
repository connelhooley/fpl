<template>
  <div id="app">
    <the-header />
    <the-content />
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader";
import TheContent from "./components/TheContent";

export default {
  name: "App",
  components: {
    TheHeader,
    TheContent,
  },
};
</script>

<style lang="postcss">
body {
  @apply bg-white dark:bg-gray-800 text-black dark:text-white;
}

text {
  @apply fill-current text-black dark:text-white;
}

.tooltip {
  @apply text-white dark:text-gray-900 bg-black dark:bg-white rounded-md p-1.5;
}
</style>
