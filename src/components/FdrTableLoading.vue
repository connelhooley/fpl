<template>
<div class="
    bg-gray-200
    dark:bg-gray-700
    rounded-l-lg"
  >
    <div class="flex flex-row">
      <div class="flex flex-col pt-14">
        <div v-for="n in 5" :key="n" class="
          w-40
          font-bold
          p-4"
        >
        <Loading :bg="300" :darkBg="800" :width="30" /> 
        </div>
      </div>
      <div class="flex flex-col flex-auto overflow-x-auto">
        <div class="flex flex-row">
          <div v-for="n in 3" :key="n" class="
            flex-none
            w-56
            h-14
            p-4"
          >
            <Loading :bg="300" :darkBg="800" :width="30" centerX /> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "./Loading";

export default {
  components: {
    Loading,
  }
}
</script>