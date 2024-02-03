/** @format
 *
 * Student instructions:
 *
 * COPY YOUR CODE FROM THE PREVIOUS EXERCISE HERE.
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
