<template>
  <slider v-model="isDark">
    <template #true>
      <font-awesome-icon :icon="['fas', 'moon']" />
    </template>
    <template #false>
      <font-awesome-icon :icon="['fas', 'sun']" />
    </template>
  </slider>
</template>

<script>
import Slider from './Slider.vue';

export default {
  data() {
    return {
      isDark: true,
    };
  },
  components: {
    Slider,
  },
  created() {
    const mode = localStorage.getItem("darkMode");
    if (mode === null) {
      localStorage.setItem("darkMode", this.isDark);
    } else {
      this.isDark = mode === "true";
    }
  },
  watch: {
    isDark(val) {
      if (val) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("darkMode", val);
    },
  },
};
</script>