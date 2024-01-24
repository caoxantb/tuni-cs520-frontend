<!-- 
  Copy paste your code from the ListPlayer.vue file here from the previous exercise. No changes are needed if you managed to get the component to work properly in the previous exercise.
 -->
<script setup>
import ListPlayer from "./ListPlayer.vue";

const props = defineProps({
  players: {
    type: Array,
  },
  getPlayer: {
    type: Function,
  },
});

const clickHandler = (playerId) => {
  props.getPlayer(playerId);
};
</script>

<template>
  <ul id="players-list">
    <ListPlayer
      v-for="player in players"
      :key="player.id"
      :player="player"
      @player-clicked="clickHandler"
    />
  </ul>
</template>
