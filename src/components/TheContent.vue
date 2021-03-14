<template>
  <main class="p-8 w-full">
    <router-view :key="$route.fullPath"/>
  </main>
</template>