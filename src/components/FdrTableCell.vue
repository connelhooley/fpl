<template>
  <div
    ref="cell"
    :class="classes"
    class="
      flex-none
      w-40
      uppercase
      p-4
      text-white
      border-t
      border-l
      last:border-r
      border-black"
    >
      {{content}}
  </div>
</template>

<script>
export default {
  props: {
    // color: String,
    difficulty: Number,
    oppositions: Array,
  },
  computed: {
    classes() {
      return {
        "bg-gray-800": this.isBlank,
        "bg-red-900": Math.round(this.difficulty) === 5,
        "bg-red-600": Math.round(this.difficulty) === 4,
        "bg-yellow-500": Math.round(this.difficulty) === 3,
        "bg-green-700": Math.round(this.difficulty) === 2,
        "bg-green-500": Math.round(this.difficulty) === 1,
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