<!-- 
  COPY AND PASTE YOUR CODE FROM THE PREVIOUS EXERCISE HERE. Also implement the following:

  1. Create a method for adding a new player. This method should handle the logic for adding a new player to the database and updating the players array. This method should also reset the form only if the request was successful. This method should be called when the add player form is submitted.

  2. Create a method for deleting a player. This method should handle the logic for deleting a player from the database and updating the players array. This method should be called when the delete button is clicked in the SelectedPlayer component.

  3. Create a method for updating a player. This method should handle the logic for updating a player in the database and updating the players array. This method should be called when the update button is clicked in the SelectedPlayer component.
 -->

<script setup>
import { reactive, onMounted } from "vue";

import ListPlayers from "./components/ListPlayers.vue";
import RequestStatus from "./components/RequestStatus.vue";
import SelectedPlayer from "./components/SelectedPlayer.vue";
import AddPlayer from "./components/AddPlayer.vue";

const REQ_STATUS = {
  loading: "Loading...",
  success: "Finished!",
  error: "An error has occurred!!!",
};

const state = reactive({
  players: [],
  selectedPlayer: null,
  requestStatusMessage: REQ_STATUS.loading,
});

const fetchAllPlayers = async () => {
  try {
    state.players = await fetchData("http://localhost:3001/api/players");
    state.requestStatusMessage = REQ_STATUS.success;
  } catch (error) {
    console.error(error);
    state.requestStatusMessage = REQ_STATUS.error;
  }
};

const fetchPlayerById = async (playerId) => {
  try {
    state.requestStatusMessage = REQ_STATUS.loading;
    state.selectedPlayer = await fetchData(
      `http://localhost:3001/api/players/${playerId}`
    );
    state.requestStatusMessage = REQ_STATUS.success;
  } catch (error) {
    console.error(error);
    state.requestStatusMessage = REQ_STATUS.error;
  }
};

const addPlayer = async (newPlayerName) => {
  try {
    state.requestStatusMessage = REQ_STATUS.loading;

    // Make a POST request to add the new player to the database
    const response = await fetch('http://localhost:3001/api/players', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newPlayerName }),
    });

    if (response.ok) {
      // If the request is successful, update the players array
      const newPlayer = await response.json();
      state.players.push(newPlayer);
      state.requestStatusMessage = REQ_STATUS.success;
    } else {
      // If the request is not successful, handle the error
      console.error('Failed to add player:', response.statusText);
      state.requestStatusMessage = REQ_STATUS.error;
    }
  } catch (error) {
    console.error(error);
    state.requestStatusMessage = REQ_STATUS.error;
  }
};


const updatePlayer = async (isActive) => {
  try {
    state.requestStatusMessage = REQ_STATUS.loading;
    await fetch(`http://localhost:3001/api/players/${state.selectedPlayer.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isActive }),
    });

    state.players = state.players.map((player) =>
      player.id === state.selectedPlayer.id ? { ...player, isActive } : player
    );
    state.requestStatusMessage = REQ_STATUS.success;
  } catch (error) {
    console.error(error);
    state.requestStatusMessage = REQ_STATUS.error;
  }
};

const deletePlayer = async (playerId) => {
  try {    
    state.requestStatusMessage = REQ_STATUS.loading;
    await fetch(`http://localhost:3001/api/players/${playerId}`, {
      method: "DELETE",
    });

    state.players = state.players.filter((player) => player.id !== playerId);
    state.selectedPlayer = null;
    state.requestStatusMessage = REQ_STATUS.success;
  } catch (error) {
    console.error(error);
    state.requestStatusMessage = REQ_STATUS.error;
  }
};

onMounted(() => {
  fetchAllPlayers();
});

const fetchData = async (url) => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  });

  const data = await res.json();
  return data;
};
</script>

<template>
  <div>
    <RequestStatus>
      <template v-slot:status>
        {{ state.requestStatusMessage }}
      </template>
    </RequestStatus>
    <AddPlayer @add-player="addPlayer"/>
    <ListPlayers :players="state.players" :get-player="fetchPlayerById" />
    <SelectedPlayer :player="state.selectedPlayer" @put-player="updatePlayer" @delete-player="deletePlayer"/>
  </div>
</template>
