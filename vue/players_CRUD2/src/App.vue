<!-- 
  COPY AND PASTE THE CODE FROM THE PREVIOUS EXERCISE, BUT:
  - Beware, the template is different: AuthUser is now a child of the root div element. When copy-pasting the logic to the new template, make sure to add the AuthUser component back in. 
  - You are no longer automatically fetching the players every time the App is rendered. Instead, you should only fetch the players when the user is logged in successfully.

  What is the function of the AuthUser component in the big picture?
  - Depending on the state of the AuthUser component, the other components should be displayed or hidden (except for the RequestStatus component, which is always visible). If the user is logged in, the AddPlayer, ListPlayers, and SelectedPlayer components should be displayed. If the user is not logged in, only the AuthUser component and the RequestStatus component should be displayed.

  1. Inside the root div element, give the AuthUser the appropriate props and event listeners. It should emit the "login", "register", and "logout" events. You need to give it the "isLoggedIn" prop, which is used to determine the state of the AuthUser component. If you removed the AuthUser componenet because you overwrote the whole template with the new one, remember to add it back in.

  2. Create a method for registering a user when the AuthUser component emits the "register" event. This method should handle the logic for registering a user. After a successful registration, save the user's username and password into the App's state. 
  
  The backend uses the HTTP Basic auth, which means that the username and password as sent in base64 encoded format in the Authorization header upon every request except for the registration request. 

  The header contents should be of the following format: "Basic <base64 encoded username:password>". The username and password should be separated by a colon. The username and password should be base64 encoded. You can use the btoa() function to encode the username and password. For example, if the username is "user" and the password is "password", the header could be generated with the following code: `Basic ${window.btoa(`user:password`)}`; 

  The backend will respond with 401 if the Authorization header is missing, and with a status of 403 if the credentials are invalid. 

  After a succesful registration, the app should attempt to fetch players from the database. If it fails to fetch the players, then the user should stay logged out. If it succeeds, the user should be logged in and the app state should be updated accordingly and the players list should be displayed. Notice that separate login is not required after a successful registration, because the user is already logged in.
  
  3. Create a method for logging in when the AuthUser component emits the "login" event. This method should handle the logic for logging in a user. As described earlier, the backend does not have a separate login endpoint. Instead, the app should try to fetch players from the database with the given credentials using Basic auth. If the request is successful, the user is logged in and the app state should be updated accordingly.

  4. Create a method for logging out when the AuthUser component emits the "logout" event. This method should handle the logic for logging out a user. This method should be called when the logout event is emitted from the AuthUser component. When the user logs out, the application should be reset to its initial state (ergo, remove all data that was fetched from the database)

  HINT: Remember to add the Authorization header to every request except the user registration. 

 -->

<script setup>
import { reactive, onMounted } from "vue";

import ListPlayers from "./components/ListPlayers.vue";
import RequestStatus from "./components/RequestStatus.vue";
import SelectedPlayer from "./components/SelectedPlayer.vue";
import AddPlayer from "./components/AddPlayer.vue";
import AuthUser from "./components/AuthUser.vue";

const REQ_STATUS = {
  loading: "Loading...",
  success: "Finished!",
  error: "An error has occurred!!!",
};

const state = reactive({
  players: [],
  selectedPlayer: null,
  requestStatusMessage: REQ_STATUS.loading,
  isLoggedIn: false,
  username: null,
  password: null,
});

const registerUser = async (credentials) => {
  try {
    const { username, password } = credentials;
    state.username = username;
    state.password = password;
    state.requestStatusMessage = REQ_STATUS.loading;
    const response = await fetch("http://localhost:3001/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials)
    });

    if (response.ok) {
      await fetchAllPlayers();
      state.isLoggedIn = true;
      state.requestStatusMessage = REQ_STATUS.success;
    } else {
      state.requestStatusMessage = REQ_STATUS.error;
      state.username = null;
      state.password = null;
      console.error("Failed to register user:", response.statusText);
    }
  } catch (error) {
    state.requestStatusMessage = REQ_STATUS.error;
    state.username = null;
    state.password = null;
    console.error(error);
  }
};

const loginUser = async (credentials) => {
  try {
    state.requestStatusMessage = REQ_STATUS.loading;
    const { username, password } = credentials;
    state.username = username;
    state.password = password;
    await fetchAllPlayers();
    state.isLoggedIn = true;
    state.requestStatusMessage = REQ_STATUS.success;
  } catch (error) {
    state.username = null;
    state.password = null;
    state.requestStatusMessage = REQ_STATUS.error;
    console.error(error);
  }
};

const logoutUser = async () => {
  Object.assign(state, {
    players: [],
    selectedPlayer: null,
    requestStatusMessage: REQ_STATUS.loading,
    isLoggedIn: false,
    username: null,
    password: null,
  });
  state.requestStatusMessage = ""
};

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
    const response = await fetch("http://localhost:3001/api/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${window.btoa(`${state.username}:${state.password}`)}`,
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
      console.error("Failed to add player:", response.statusText);
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
    await fetch(
      `http://localhost:3001/api/players/${state.selectedPlayer.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${window.btoa(`${state.username}:${state.password}`)}`,
        },
        body: JSON.stringify({ isActive }),
      }
    );

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
      headers: {
        Authorization: `Basic ${window.btoa(`${state.username}:${state.password}`)}`,
      }
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
      Authorization: `Basic ${window.btoa(`${state.username}:${state.password}`)}`,
    },
  });

  const data = await res.json();
  return data;
};
</script>

<template>
  <div>
    <AuthUser :is-logged-in="state.isLoggedIn" @register="registerUser" @login="loginUser" @logout="logoutUser"/>
    <RequestStatus>
      <template v-slot:status>
        {{ state.requestStatusMessage }}
      </template>
    </RequestStatus>
    <AddPlayer v-if="state.isLoggedIn" @add-player="addPlayer" />
    <ListPlayers v-if="state.isLoggedIn" :players="state.players" :get-player="fetchPlayerById" />
    <SelectedPlayer
      v-if="state.isLoggedIn"
      :player="state.selectedPlayer"
      @put-player="updatePlayer"
      @delete-player="deletePlayer"
    />
  </div>
</template>
