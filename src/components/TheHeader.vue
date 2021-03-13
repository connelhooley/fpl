<template>
  <header class="flex bg-gray-200 dark:bg-gray-900">
    <nav class="flex-none flex">
      <router-link 
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
      </router-link>
    </nav>
    <div class="
      flex-auto
      p-4
      flex
      flex-col
      justify-center"
    >
      <div class="
        mx-auto
        w-full
        md:w-2/3
        lg:w-1/2"
      >
        <the-search-bar />
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
        <the-dark-mode-toggle />
      </div>
    </div>
  </header>
</template>

<script>
import TheDarkModeToggle from './TheDarkModeToggle.vue';
import TheSearchBar from "./TheSearchBar";

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
    TheSearchBar,
    TheDarkModeToggle,
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