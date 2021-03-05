<template>
  <td
    ref="cell"
    :style="style"
    :class="classes"
    class="
      p-4"
    >
      {{content}}
</td>
</template>

<script>
export default {
  props: {
    color: String,
    difficulty: Number,
    oppositions: Array,
  },
  computed: {
    style() {
      return {
        "background-color": this.color
      };
    },
    classes() {
      return {
        "text-black dark:text-white": this.isBlank,
        "text-white dark:text-white": !this.isBlank,
      };
    },
    isBlank() {
      return isNaN(this.difficulty) || !this.oppositions.length;
    },  
    content() {
      if (this.isBlank) return "Blank";
      return this.oppositions.map(({teamShortName, difficulty}) => `${teamShortName} (${difficulty})`).join(", ");
    },
  },
};
</script>