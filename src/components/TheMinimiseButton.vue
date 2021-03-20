<template>
  <button @click="click"><font-awesome-icon :icon="['fas', 'window-minimize']" /></button>
</template>

<script>
export default {
  methods: {
    click() {
      window.electron.invoke("minimize");
    },
  },
};
</script>