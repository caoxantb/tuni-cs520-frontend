/** @format
 *
 * Student instructions:
 * Create a AddPlayer component similar to the AddPlayer component in the Vue exercise.
 *
 * handleSubmit is a prop function that will be called when the form is submitted.
 *
 * REMEMBER: use the same ids, classes and attributes as in the Vue exercise in the same places to pass the tests.
 *
 */

import { useState } from "react";

export const AddPlayer = ({ handleSubmit }) => {
  const [newPlayer, setNewPlayer] = useState("");

  const handleSubmitPlayer = (e) => {
    e.preventDefault();
    handleSubmit(newPlayer);
    setNewPlayer("");
  }

  return (
    <div>
      <form id="submit-player" onSubmit={handleSubmitPlayer}>
        <label hmtlfor="input-player">Player Name:</label>
        <input
          type="text"
          id="input-player"
          value={newPlayer}
          onChange={(e) => setNewPlayer(e.target.value)}
          placeholder="Enter player name"
        />
        <button type="submit" className="btn-add">Add Player</button>
      </form>
    </div>
  );
};
