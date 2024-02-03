/** @format
 *
 * Student instructions:
 *
 * COPY YOUR CODE FROM THE PREVIOUS EXERCISE HERE.
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
