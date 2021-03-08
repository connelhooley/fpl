<template>
  <div
    class="
      flex-none
      flex
      flex-row
      w-56
      uppercase
      text-white"
    >
      <div v-if="!oppositions.length" class="p-4 flex-1 bg-gray-800 border border-black truncate">
        Blank
      </div>
      <div v-for="opposition in oppositions" :key="opposition.oppositionId" :class="getDifficultyColorClass(opposition.difficulty)" class="p-4 flex-1 border border-black truncate">
        {{opposition.teamShortName}} ({{opposition.difficulty}})
      </div>
  </div>
</template>

<script>
export default {
  props: {
    oppositions: Array,
  },
  methods: {
    getDifficultyColorClass(difficulty) {
      switch (difficulty) {
        case 5:
          return "bg-red-900";
        case 4:
          return "bg-red-600";
        case 3:
          return "bg-yellow-500";
        case 2:
          return "bg-green-700";
        case 1:
          return "bg-green-500";
      }
    },
  },
};
</script>