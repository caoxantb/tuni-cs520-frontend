<!-- 
  Copy paste your code from the ListPlayer.vue file here from the previous exercise. No changes are needed if you managed to get the component to work properly in the previous exercise.
 -->
<script setup>
const props = defineProps({
  player: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["player-clicked"]);

const clickHandler = () => {
  emit("player-clicked", props.player.id);
};
</script>

<template>
  <li :id="`player-${player.id}`">
    <a
      href="#"
      @click.prevent="clickHandler"
      @keyup.enter="clickHandler"
      tabindex="0"
    >
      {{ player.name }}
    </a>
  </li>
</template>
