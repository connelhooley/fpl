<template>
  <div>
    <div class="
      p-4
      text-4xl
      font-bold
      uppercase
      rounded-t
      bg-gray-300
      dark:bg-gray-900"
    >
      <Loading :width="48" :height="14" />
    </div>
    <div v-for="n in 3" :key="n">
      <div class="
        px-4
        py-2
        bg-gray-200
        dark:bg-gray-600"
      >
        <Loading :width="72" :height="10" :bg="300" />
      </div>
      <div
        v-for="n in 5"
        :key="n"
        class="
          block
          px-4
          py-2
          text-blue-400
          hover:text-blue-600
          bg-gray-100
          dark:bg-gray-700"
      >
        <Loading :width="60" :height="6" />
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "./Loading";

export default {
  props: {
    teamName: String,
    positions: Array,
  },
  components: {
    Loading,
  },
};
</script>