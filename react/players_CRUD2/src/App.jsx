/** @format
 * Copy paste your code from the App.jsx file here from the previous exercise.
 *
 * Use similar logic as in the Vue CRUD2 exercise and add authentication to the app.
 * 
 * Backend is still using Basic Auth, so you must use the same logic as in the Vue exercise. 
 * 
 * REMEMBER: use the same ids, classes and attributes as in the Vue exercise in the same places to pass the tests. Remember to pass in the appropriate props to the child components. 

 * BEWARE: The component props may be different from the Vue exercise and the tests will not pass if you use the wrong props.
 */

import { useState, useEffect } from "react";
const url = "http://localhost:3001/api/players/";
import { REQ_STATUS } from "../cypress/e2e/constants.js";

import { AuthUser } from "./components/AuthUser.jsx";
import { AddPlayer } from "./components/AddPlayer";
import { ListPlayers } from "./components/ListPlayers.jsx";
import { SelectedPlayer } from "./components/SelectedPlayer.jsx";
import { RequestStatus } from "./components/RequestStatus.jsx";

function App() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [requestStatus, setRequestStatus] = useState(REQ_STATUS.loading);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchAllPlayers();
  }, [isLoggedIn]);

  const registerUser = async (newUsername, newPassword) => {
    try {
      setUsername(newUsername)
      setPassword(newPassword)
      setRequestStatus(REQ_STATUS.loading);
      const response = await fetch("http://localhost:3001/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username: newUsername, password: newPassword}),
      });
  
      if (response.ok) {
        setIsLoggedIn(true);
        setRequestStatus(REQ_STATUS.success);
      } else {
        setRequestStatus(REQ_STATUS.error);
        setUsername("")
        setPassword("")
        console.error("Failed to register user:", response.statusText);
      }
    } catch (error) {
      setRequestStatus(REQ_STATUS.error);
      setUsername("")
      setPassword("")
      console.error(error);
    }
  };

  const loginUser = async (loginUsername, loginPassword) => {
    try {
      setUsername(loginUsername);
      setPassword(loginPassword);
      setRequestStatus(REQ_STATUS.loading);
      setIsLoggedIn(true);
      setRequestStatus(REQ_STATUS.success);
    } catch (error) {
      setRequestStatus(REQ_STATUS.error);
      setUsername("")
      setPassword("")
      console.error(error);
    }
  };
  
  const logoutUser = async () => {
    setRequestStatus(REQ_STATUS.loading);
    setPlayers([])
    setSelectedPlayer(null);
    setIsLoggedIn(false);
    setUsername("")
    setPassword("")
    setRequestStatus("");
  };

  const fetchData = async (url) => {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Basic ${window.btoa(`${username}:${password}`)}`,
      },
    });

    const data = await res.json();
    return data;
  };

  const fetchAllPlayers = async () => {
    try {
      setRequestStatus(REQ_STATUS.loading);
      const players = await fetchData("http://localhost:3001/api/players");
      setPlayers(players);
      setRequestStatus(REQ_STATUS.success);
    } catch (error) {
      console.error(error);
      setRequestStatus(REQ_STATUS.error);
    }
  };

  const fetchPlayerById = async (playerId) => {
    try {
      setRequestStatus(REQ_STATUS.loading);
      const player = await fetchData(
        `http://localhost:3001/api/players/${playerId}`
      );
      setSelectedPlayer(player);
      setRequestStatus(REQ_STATUS.success);
    } catch (error) {
      console.error(error);
      setRequestStatus(REQ_STATUS.error);
    }
  };

  const addPlayer = async (newPlayerName) => {
    try {
      setRequestStatus(REQ_STATUS.loading);

      const response = await fetch("http://localhost:3001/api/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${window.btoa(`${username}:${password}`)}`,
        },
        body: JSON.stringify({ name: newPlayerName }),
      });

      if (response.ok) {
        const newPlayer = await response.json();
        setPlayers([...players, newPlayer]);
        setRequestStatus(REQ_STATUS.success);
      } else {
        console.error("Failed to add player:", response.statusText);
        setRequestStatus(REQ_STATUS.error);
      }
    } catch (error) {
      console.error(error);
      setRequestStatus(REQ_STATUS.error);
    }
  };

  const updatePlayer = async (isActive) => {
    try {
      setRequestStatus(REQ_STATUS.loading);
      const updatedPlayer = await fetch(
        `http://localhost:3001/api/players/${selectedPlayer.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${window.btoa(`${username}:${password}`)}`,
          },
          body: JSON.stringify({ isActive }),
        }
      );
      setRequestStatus(REQ_STATUS.success);
    } catch (error) {
      console.error(error);
      setRequestStatus(REQ_STATUS.error);
    }
  };

  const deletePlayer = async (playerId) => {
    try {
      setRequestStatus(REQ_STATUS.loading);
      await fetch(`http://localhost:3001/api/players/${playerId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${window.btoa(`${username}:${password}`)}`,
        }
      });
      const updatedPlayers = players.filter((player) => player.id !== playerId);
      setPlayers(updatedPlayers);
      setSelectedPlayer(null);
      setRequestStatus(REQ_STATUS.success);
    } catch (error) {
      console.error(error);
      setRequestStatus(REQ_STATUS.error);
    }
  };

  return (
    <div>
      <AuthUser isLoggedIn={isLoggedIn} onRegister={registerUser} onLogin={loginUser} onLogout={logoutUser}/>
      <RequestStatus>{requestStatus}</RequestStatus>
      {isLoggedIn && (
        <>
          <AddPlayer handleSubmit={addPlayer} />
          <ListPlayers players={players} getPlayer={fetchPlayerById} />
          <SelectedPlayer
            player={selectedPlayer}
            handleUpdate={updatePlayer}
            handleDelete={deletePlayer}
          />
        </>
      )}
    </div>
  );
}

export default App;
