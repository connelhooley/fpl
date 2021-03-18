<template>
  <div
    v-on:click="$emit('input', !value)"
    class="rounded-full inline-block h-8 w-16 text-white bg-gray-400 dark:bg-gray-800 relative cursor-pointer"
  >
    <div class="h-6 w-6 transition-all duration-500 absolute inset-y-1 bg-white dark:bg-white rounded-full" :class="style"></div>
    <div v-show="value" class="absolute inset-y-1 left-2">
      <slot name="true" />      
    </div>
    <div v-show="!value" class="absolute inset-y-1 right-2">
      <slot name="false" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean,
  },
  computed: {
    style() {
      return {
        "left-2": !this.value,
        "right-2": this.value,
      };
    },
  },
}
</script>