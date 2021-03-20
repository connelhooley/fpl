<template>
  <div class="
    bg-gray-200
    dark:bg-gray-700
    rounded-lg"
  >
    <div v-if="title" class="
      p-3
      text-center"
    >
      {{title}}
    </div>
    <slot /> 
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>