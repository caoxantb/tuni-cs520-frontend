<!-- 
  Student instructions to create this component:

  1. Create a form with an id of "submit-player" for submitting a new player. It emits an event called "add-player" with the name of the new player as a parameter when submitted.

  2. Create an input field with an id of "input-player" where the name of the new player should be added. Optionally Add a placeholder attribute for the input.

  3. Create a button with a class of "btn-add" that will submit the form when clicked.


  While you might pass the unit tests, there may be some extra attributes or functionality that you need to add in order to get the component to work properly in the e2e tests. Please refer to the e2e tests for more details (found in cypress/e2e).

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
