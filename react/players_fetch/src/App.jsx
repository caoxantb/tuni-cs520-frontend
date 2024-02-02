/** @format 
 * 
 * Useful to read:
 * https://react.dev/
 * 
 * Student instructions:
 * Use the provided components to create a React app that fetches players from the provided API and displays them in a list when the App is first rendered. When a player is clicked in the list, fetch that player and display it in the selected player section. Give ListPlayer a function as its selectPlayer prop: it is used to fetch a specific player and should take a player id as its only argument. 
 * 
 * You can use the Vue exercise players_fetch as a reference and inspiration. More detailed descriptions of the components can also be found in the Vue exercises, but the components are not exactly the same.

	* REMEMBER: use the same ids, classes and attributes as in the Vue exercise in the same places to pass the tests. Remember to pass in the appropriate props to the child components.

	* BEWARE: The component props may be different from the Vue exercise and the tests will not pass if you use the wrong props.
	
  Hint: Use the provided REQ_STATUS object to update the request status when necessary. Use "loading" key for when the request is in progress, "success" key for when the request is successful, and "error" for when the request has failed. The REQ_STATUS object is now imported from the ../cypress/e2e/constants.js file and should not be modified.

*/

import { useState, useEffect } from "react";

const url = "http://localhost:3001/api/players";
import { REQ_STATUS } from "../cypress/e2e/constants.js";
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

  return (
    <div>
      <RequestStatus>{requestStatus}</RequestStatus>
      <ListPlayers players={players} getPlayer={fetchPlayerById} />
      <SelectedPlayer player={selectedPlayer} />
    </div>
  );
}

export default App;
