/** @format
 *
 * Student instructions:
 *
 * COPY YOUR CODE FROM THE PREVIOUS EXERCISE HERE.
 */
import { ListPlayer } from "./ListPlayer.jsx";

export const ListPlayers = ({ players, getPlayer }) => {
  return players ? (
    <div>
      <ul id="players-list">
        {players.map((player) => (
          <ListPlayer
            key={player.id}
            player={player}
            onClick={getPlayer}
          />
        ))}
      </ul>
    </div>
  ) : (
    <></>
  );
};