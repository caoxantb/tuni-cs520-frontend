<!-- 
  Copy paste your code from the ListPlayer.vue file here from the previous exercise. No changes are needed if you managed to get the component to work properly in the previous exercise.
 -->
<script setup>
import { ref, reactive, watchEffect } from "vue";

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

const toggle = () => {};

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
