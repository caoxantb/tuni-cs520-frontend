/** @format */

import { useSelector } from "react-redux";

import { ListPlayer } from "./ListPlayer.jsx";


/** @format
 * @description
 * Student instructions:
 *
 * Copy paste your code from the ListPlayers.jsx file here from the react player fetch exercise
 * BEWARE: Only the selectPlayer function is passed as a prop from now on. The players data is fetched from the redux store.
 *
 */
export const ListPlayers = ({ selectPlayer }) => {
  const players = useSelector(state => state.players)

  return (
    <div>
      <h2>List of players</h2>
      {
        players ? (
          <div>
            <ul id="players-list">
              {players.map((player) => (
                <ListPlayer
                  key={player.id}
                  player={player}
                  onClick={selectPlayer}
                />
              ))}
            </ul>
          </div>
        ) : (
          <></>
        )
      }
    </div>
  );
};
