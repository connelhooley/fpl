<template>
  <button
    v-on:click="$emit('input', !value)"
    class="
      rounded-full
      focus:outline-none
      inline-block
      h-8
      w-16
      text-white
      bg-gray-400
      dark:bg-gray-700
      relative"
  >
    <div
      class="
        toggle
        h-6
        w-6
        absolute
        inset-y-1
        bg-white
        rounded-full"
      :class="style"></div>
    <div v-show="value" class="label absolute inset-y-1 left-2">
      <slot name="true" />      
    </div>
    <div v-show="!value" class="label absolute inset-y-1 right-2">
      <slot name="false" />
    </div>
  </button>
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

<style lang="postcss" scoped>
  button:hover .toggle {
    @apply bg-blue-300 dark:bg-blue-400;
  }
  button:hover .label  {
    @apply text-blue-300 dark:text-blue-400;
  }
/*   
  text-blue-500
  dark:text-blue-400
   */
</style>