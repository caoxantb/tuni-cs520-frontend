/** @format
 *
 * Student instructions:
 *
 * COPY YOUR CODE FROM THE PREVIOUS EXERCISE HERE.
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
