/** @format
 *
 * Copy paste your code from the App.jsx file here from the previous exercise.
 *
 * Use similar logic as in the Vue CRUD exercise to create a new player in the backend when the user submits the form in the AddPlayer component.
 *
 * Likewise, add logic to update the player in the backend when the user clicks the update button in the SelectedPlayer component.
 *
 * Finally, add logic to delete the player in the backend when the user clicks the delete button in the SelectedPlayer component.
 * 
 * HINT: Before the above logic, it may be better to start by updating the SelectedPlayer component to use the new props.
 * 
 * REMEMBER: use the same ids, classes and attributes as in the Vue exercise in the same places to pass the tests. Remember to pass in the appropriate props to the child components.

 * BEWARE: The component props may be different from the Vue exercise and the tests will not pass if you use the wrong props. Look at invididual component file descriptions and tests to see what props are expected.
 *
 */
import { useState, useEffect } from "react";
const url = "http://localhost:3001/api/players/";
import { REQ_STATUS } from "../cypress/e2e/constants.js";

import { AddPlayer } from "./components/AddPlayer";
import { ListPlayers } from "./components/ListPlayers.jsx";
import { SelectedPlayer } from "./components/SelectedPlayer.jsx";
import { RequestStatus } from "./components/RequestStatus.jsx";

function App() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [requestStatus, setRequestStatus] = useState(REQ_STATUS.loading);

  useEffect(() => {
    fetchAllPlayers();
  }, []);

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
  
      const response = await fetch('http://localhost:3001/api/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newPlayerName }),
      });
  
      if (response.ok) {
        const newPlayer = await response.json();
        setPlayers([...players, newPlayer]);
        setRequestStatus(REQ_STATUS.success);
      } else {
        console.error('Failed to add player:', response.statusText);
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
      const updatedPlayer = await fetch(`http://localhost:3001/api/players/${selectedPlayer.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive }),
      });
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
      });
      const updatedPlayers = players.filter(player => player.id !== playerId);
      setPlayers(updatedPlayers);
      setSelectedPlayer(null);
      setRequestStatus(REQ_STATUS.success)
    } catch (error) {
      console.error(error);
      setRequestStatus(REQ_STATUS.error);
    }
  };

  return (
    <div>
      <RequestStatus>{requestStatus}</RequestStatus>
      <AddPlayer handleSubmit={addPlayer} />
      <ListPlayers players={players} getPlayer={fetchPlayerById} />
      <SelectedPlayer player={selectedPlayer} handleUpdate={updatePlayer} handleDelete={deletePlayer}/>
    </div>
  );
}

export default App;
