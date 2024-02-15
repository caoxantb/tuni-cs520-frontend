/** @format
 *
 * @description
 * Student instructions:
 *
 * Copy contents for this file from the players_fetch exercise of the react week. There are no changes to this file otherwise
 *
 *
 *
 */

export const ListPlayer = ({ player, onClick }) => {
  const { id, name } = player || {};
  return (
    <div>
      <li id={`player-${id}`}>
        <a href="#" onClick={() => onClick(id)}>
          {name}
        </a>
      </li>
    </div>
  );
};
