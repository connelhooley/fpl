<template>
<div class="
    bg-gray-100
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
        <div class="
          animate-pulse
          w-30
          h-10
          bg-gray-200
          dark:bg-gray-800
          rounded"
        ></div>
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
            <div class="
              animate-pulse
              mx-auto
              w-20
              h-10
              bg-gray-200
              dark:bg-gray-800
              rounded"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>