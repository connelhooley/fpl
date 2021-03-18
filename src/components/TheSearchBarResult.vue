<template>
  <div
    @click="$emit('click', $event)"
    ref="divRef"
    tabindex="0"
    class="
      cursor-pointer
      focus:outline-none
      rounded
      hover:bg-gray-700
      dark:hover:bg-gray-100
      px-4
      py-2"
    :class="boldStyle"
  >
    <template v-if="isTeam">
      <font-awesome-icon :icon="['fas', 'users']" />&nbsp;{{result.teamName}}
    </template>
    <template v-if="isPlayer">
      <font-awesome-icon :icon="['fas', 'user']" />&nbsp;{{result.playerName}}&nbsp;<span class="text-xs text-gray-500">{{result.teamShortName}}</span>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    selected: Boolean,
    result: Object,
  },
  computed: {
    boldStyle() {
      return {
        "font-bold": this.selected,
      };
    },
    isTeam() {
      return this.result.type === "team";
    },
    isPlayer() {
      return this.result.type === "player";
    },
  },
  watch: {
    selected(val) {
      if (val) {
        this.$refs.divRef.scrollIntoView({
          block: "nearest",
          inline: "nearest"
        });
      }
    },
  }
};
</script>