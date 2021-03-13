<template>
  <div class="relative">
    <slot name="default"></slot>
    <div v-if="isOpen" class="
      absolute
      inset-0
      opacity-90
      bg-gray-800"
    ></div>
    <div v-if="isOpen" class="
      absolute
      inset-x-6
      lg:inset-x-32
      xl:inset-x-64
      top-6"
    >
      <div class="
        bg-white
        text-black
        w-full
        rounded-lg
        overflow-y-auto"
      >
        <slot name="modal"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
  },
};
</script>