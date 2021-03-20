<template>
  <header class="flex bg-gray-200 dark:bg-gray-900">
    <nav class="flex-none flex">
      <TheBackButton class="
        text-2xl
        flex
        flex-col
        justify-center
        inline-block
        p-4
        hover:bg-gray-300
        dark:hover:bg-gray-700" />
      <TheForwardButton class="
        text-2xl
        flex
        flex-col
        justify-center
        inline-block
        p-4
        hover:bg-gray-300
        dark:hover:bg-gray-700" />
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
    <TheMinimiseButton class="
      text-2xl
      flex
      flex-col
      justify-center
      inline-block
      py-4
      px-2
      hover:bg-gray-300
      dark:hover:bg-gray-700
      hover:text-blue-300
      dark:hover:text-blue-400" />
    <TheCloseButton class="
      text-2xl
      flex
      flex-col
      justify-center
      inline-block
      py-4
      px-2
      hover:bg-gray-300
      dark:hover:bg-gray-700
      hover:text-blue-300
      dark:hover:text-blue-400" />
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
  created() {
    const mode = localStorage.getItem("darkMode");
    if (mode === null) {
      localStorage.setItem("darkMode", this.isDark);
    } else {
      this.isDark = mode === "true";
    }
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