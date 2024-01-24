<!-- 
  Copy paste your code from the ListPlayer.vue file here from the previous exercise. No changes are needed if you managed to get the component to work properly in the previous exercise.
 -->
<script setup>
import { ref } from "vue";

const emits = defineEmits(["add-player"]);
const newPlayerName = ref("");

const addPlayerHandler = () => {
  if (newPlayerName.value.trim() !== "") {
    emits("add-player", newPlayerName.value.trim());
    // Clear the input field after submitting
    newPlayerName.value = "";
  }
};
</script>

<template>
  <form id="submit-player" @submit.prevent="addPlayerHandler">
    <label for="input-player">Player Name:</label>
    <input
      type="text"
      id="input-player"
      v-model="newPlayerName"
      placeholder="Enter player name"
    />
    <button type="submit" class="btn-add">Add Player</button>
  </form>
</template>
