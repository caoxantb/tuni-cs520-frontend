<!-- 
  The Vue projects for this course are expected to be made using Single File Components (SFCs). You can get started by going through the following sections from the Vue documentation (https://vuejs.org/guide/introduction.html):
  - Getting Started
  - Essentials
  - Components In-Depth

  Once you are familiar with the basics of Vue, you can start working on the project. The project is divided into 4 parts, each with its own set of instructions. The first part is the main component of the application, the second part is the component (and its child component) that displays the list of players, and the third part is the component that displays the selected player. The fourth part is displaying the status of the request to the API.

  Student instructions:

  This is the main component of the application. It is used to fetch and store the players data upon creation, and to display the list of players and the selected player.

  1. Inside the root div element, import and add the  RequestStatus, ListPlayers, and SelectedPlayer components as child elements. Remember to pass in the appropriate props and content to the child components.

  2. Create two methods for fetching all players and fetching one specific player. The first method should handle the logic for fetching all the players and displaying them in the players array. The second method should handle the logic for fetching a specific player and relaying that specific player to the SelectedPlayer component. Use the REQ_STATUS object to display the appropriate status message when the request is loading, when it is successful, and when it fails. 
  
  The URLS for fetching all players and fetching a specific player remain the same throughout the course (http://localhost:3001/api/players, http://localhost:3001/api/players/:id). Once the backend is running, you can visit http://localhost:3001 to see the API documentation.

  3. Whenever the page is refreshed, fetch players data, store and display it.
 -->

<script setup>
import { reactive, onMounted } from "vue";

import ListPlayers from "./components/ListPlayers.vue";
import RequestStatus from "./components/RequestStatus.vue";
import SelectedPlayer from "./components/SelectedPlayer.vue";

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
    console.error(error)
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
    console.error(error)
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

    <ListPlayers :players="state.players" :get-player="fetchPlayerById" />
    <SelectedPlayer :player="state.selectedPlayer" />
  </div>
</template>
