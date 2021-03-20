<template>
  <header class="
    flex
    border-b
    border-blue-300
    dark:border-blue-400
    bg-gray-200
    dark:bg-gray-900"
  >
    <nav class="flex-none flex">
      <TheBackButton class="
        text-2xl
        flex
        flex-col
        justify-center
        inline-block
        p-4
        hover:text-blue-500
        dark:hover:text-blue-400"
      />
      <TheForwardButton class="
        text-2xl
        flex
        flex-col
        justify-center
        inline-block
        p-4
        hover:text-gray-300
        dark:hover:text-gray-700
        hover:text-blue-500
        dark:hover:text-blue-400"
      />
      <RouterLink 
        v-for="(link, index) in menuLinks"
        :key="index"
        :to="link.to"
        active-class="
          text-blue-500
          dark:text-blue-400"
        class="
          flex
          flex-col
          justify-center
          inline-block
          p-4
          hover:bg-gray-300
          dark:hover:bg-gray-700"
        >
        <div>
          {{link.label}}
        </div>
      </RouterLink>
    </nav>
    <div class="
      flex-auto
      py-4
      px-8
      flex
      flex-col
      justify-center"
    >
      <div class="
        hidden
        md:block
        mx-auto
        w-full
        md:w-2/3"
      >
        <TheSearchBar />
      </div>
    </div>
    <div class="
      flex-none
      flex
      p-4"
    >
      <div class="
        flex
        flex-col
        justify-center"
      >
        <TheDarkModeToggle />
      </div>
    </div>
    <div class="
      ml-2
      items-start"
    >
      <div class="
        flex
        flex-row
        rounded-bl
        bg-gray-900
        text-white
        dark:text-white
        dark:bg-gray-800
        text-xl"
      >
        <TheMinimiseButton class="
          block
          p-2
          hover:text-yellow-400" />
        <TheCloseButton class="
          block
          p-2
          hover:text-red-400" />
      </div>
    </div>
  </header>
</template>

<script>
import TheBackButton from "./TheBackButton";
import TheForwardButton from "./TheForwardButton";
import TheDarkModeToggle from "./TheDarkModeToggle";
import TheSearchBar from "./TheSearchBar";
import TheMinimiseButton from "./TheMinimiseButton";
import TheCloseButton from "./TheCloseButton";

export default {
  data() {
    return {
      menuLinks: [
        {
          label: "FDR",
          to: "/fdr/",
        },
        {
          label: "Players",
          to: "/players/",
        },
      ],
    };
  },
  components: {
    TheBackButton,
    TheForwardButton,
    TheSearchBar,
    TheDarkModeToggle,
    TheMinimiseButton,
    TheCloseButton,
  },
};
</script>

<style lang="postcss" scoped>
  header {  
    -webkit-user-select: none;
    -webkit-app-region: drag;
  }
  /deep/ input,
  /deep/ a,
  /deep/ button {  
    @apply focus:outline-none;
    -webkit-app-region: no-drag;
  }
</style>