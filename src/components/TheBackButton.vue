<template>
  <button @click="click"><font-awesome-icon :icon="['fas', 'chevron-left']" /></button>
</template>

<script>
export default {
  methods: {
    click() {
      this.$router.go(-1);
    },
  },
};
</script>