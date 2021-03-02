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

.tippy-box {
  @apply text-white dark:text-gray-900 bg-black dark:bg-white rounded-md p-1.5;
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
