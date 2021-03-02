<template>
  <div v-if="loaded">Table to go here</div>
  <div v-else>Loading...</div>
</template>

<script>
export default {
  data() {
    return {
      loaded: false,
    };
  },
  created() {
    setTimeout(() => {
      this.loaded = true;
    }, 2000);
  },
};
</script>