/**
 * Copy paste your code from the SelectedPlayer.jsx file here from the previous exercise.
 *
 * Use similar logic as in the Vue CRUD exercise to call the "handleUpdate"
 * prop function when the update button is clickable and the user clicks it.
 * In the App.jsx, this should trigger the updating of the player in the backend.
 *
 * Likewise, add logic to call the "handleDelete" prop function when the user
 * clicks the delete button. In the App.jsx, this should trigger the deletion of the player in the backend.
 *
 */
import { useEffect, useState } from "react";

export const SelectedPlayer = ({ player, handleUpdate, handleDelete }) => {
  const { id, name, isActive } = player || {};

  const [activeState, setActiveState] = useState(isActive || false);

  const checkboxChange = () => setActiveState(!activeState);

  useEffect(() => {
    setActiveState(isActive || false);
  }, [player])

  return player ? (
    <div id="selected-player">
      <div id="player-id" className="player-id">
        {id}
      </div>
      <div id="player-name">{name}</div>
      <div id="player-status">
        <label htmlFor="checkbox" id="checkbox-label">
          <input type="checkbox" id="checkbox" onChange={checkboxChange} checked={activeState}/>
          <span className="checkmark"></span>
          {activeState ? "active" : "inactive"}
        </label>
      </div>
      <button
        className="btn-update"
        disabled={activeState === isActive}
        onClick={() => handleUpdate(activeState)}
      >
        Update
      </button>
      <button className="btn-delete" onClick={() => handleDelete(id)}>
        Delete
      </button>
    </div>
  ) : (
    <></>
  );
};
