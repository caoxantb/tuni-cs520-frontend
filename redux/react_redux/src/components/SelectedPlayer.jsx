/** @format */

import { useSelector } from "react-redux";

/** @format
 * @description
 * Student instructions:
 * Copy contents for this file from the react_fetch exercise of the react week.
 *
 * BEWARE: No props are passed to this component from now on. Instead, the selectedPlayer is fetched from the redux store.

 */
export const SelectedPlayer = () => {
  const selectedPlayer = useSelector((state) => state.selectedPlayer);
  const {name, isActive} = selectedPlayer || {}

  return (
    <div>
      <h3>Selected Player</h3>
      {(selectedPlayer && Object.keys(selectedPlayer).length) ? (
        <div id="selected-player">
          <div id="player-name">{name}</div>
          <div id="player-status">{isActive ? "active" : "inactive"}</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
