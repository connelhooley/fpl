<template>
  <div :class="classes"></div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
    },
    height: {
      type: Number,
      default: 10,
    },
    bg: {
      type: Number,
      default: 200,
    },
    darkBg: {
      type: Number,
      default: 700,
    },
    centerX: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return [
        "animate-pulse",
        `w-${this.width}`,
        `h-${this.height}`,
        `bg-gray-${this.bg}`,
        `dark:bg-gray-${this.darkBg}`,
        "rounded",
        this.centerX ? "mx-auto" : "",
      ];
    }
  }
}
</script>