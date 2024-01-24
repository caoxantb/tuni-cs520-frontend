<!-- 
  Copy paste your code from the ListPlayer.vue file here from the previous exercise.

  In addition to the code from the previous exercise, you need to add the following logic inside the SelectedPlayer component:

  - Display the player's id in an element with the class attribute "player-id".

  - Inside the element with the id "player-status", add a label with the text "active" or "inactive" depending on the status of the player. The label should have an id of "checkbox-label", and inside it there should be a checkbox with an id of "checkbox". 
      - By default, the checkbox should be checked if the player is active and unchecked if the player is inactive. Unlike in elm exercises, toggling the checkbox should not automatically update the player in the backend, instead it is done by the update button (check next point). For styling purposes, add an empty span with the class attribute "checkmark" inside the label. Much like in the elm exercises, the checkbox should be listening to the change event. 

  - Add an update button with the class attribute "btn-update". The button should be disabled if the current active state of the checkmark is not different from the players "isActive" state. Add logic to send the "put-player" event when the button is clickable and the user clicks it. The event should pass the players "isActive" state as a parameter.

  - Add a delete button with the class attribute "btn-delete". Add logic to send the "delete-player" event when the user clicks the button. The event should pass the id of the player as a parameter.

 -->
<script setup>
import { ref, reactive, watchEffect } from 'vue';

const props = defineProps({
  player: {
    type: Object,
  },
});

// console.log(props.player?.name)

const emits = defineEmits(["put-player", "delete-player"]);
// const state = reactive({isPlayerActive: props.player?.isActive});
const checkboxState = ref(props.player?.isActive);

watchEffect(() => {
  // Update checkboxState when props.player changes
  checkboxState.value = props.player?.isActive;
});

const toggle = () => {}

const updatePlayerHandler = () => {
  emits("put-player", checkboxState.value);
};

const deletePlayerHandler = () => {
  emits("delete-player", props.player?.id);
};
</script>

<template>
  <div v-if="player" id="selected-player">
    <div id="player-id" class="player-id">{{ player.id }}</div>
    <div id="player-name">{{ player.name }}</div>
    <div id="player-status">
      <label for="checkbox" id="checkbox-label">
        <input
          type="checkbox"
          id="checkbox"
          @change="toggle"
          v-model="checkboxState"
        />
        <span class="checkmark"></span>
        {{ checkboxState ? "active" : "inactive" }}
      </label>
    </div>
    <button
      class="btn-update"
      :disabled="checkboxState === player.isActive"
      @click="updatePlayerHandler"
    >
      Update
    </button>
    <button class="btn-delete" @click="deletePlayerHandler">Delete</button>
  </div>
</template>
