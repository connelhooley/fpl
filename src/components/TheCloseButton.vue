<template>
  <button @click="click"><font-awesome-icon :icon="['fas', 'window-close']" /></button>
</template>

<script>
export default {
  methods: {
    click() {
      window.close();
    },
  },
};
</script>