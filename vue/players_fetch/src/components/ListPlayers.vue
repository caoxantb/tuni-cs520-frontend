<!-- 

  Useful to read: 
  - https://vuejs.org/guide/scaling-up/sfc.html
  - https://vuejs.org/guide/essentials/component-basics.html
  - https://vuejs.org/guide/essentials/list
  - https://vuejs.org/guide/components/props.html
  - https://vuejs.org/guide/components/events.html
  
  
  Student instructions: 

  This component is used to display a list of players. It receives getPlayer and players as props.

  1. Create an unordered list with an id of players-list. Render the ListPlayer component for each player in the list.

  2. Listen for "player-clicked" events from the ListPlayer component, and call the getPlayer prop function with the id of the clicked player as an argument.

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
