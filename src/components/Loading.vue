<template>
  <div :class="classes"
    ></div>
</template>

<script>
export default {
  props: {
    width: Number,
    height: Number,
    bg: Number,
    darkBg: Number,
  },
  computed: {
    classes() {
      return [
        "animate-pulse",
        `w-${this.width}`,
        `h-${this.height || 10}`,
        `bg-gray-${this.bg || 200}`,
        `dark:bg-gray-${this.darkBg || 800}`,
        "rounded",
      ];
    }
  }
}
</script>