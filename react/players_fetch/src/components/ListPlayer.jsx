/** @format
 *
 * Student instructions:
 *
 * This component is used to display a single player from the list of players. It receives a player and onClick as props.
 *
 * Create the component that you did in Vue now with React. Use provided props to handle user events. Find and replace functionality with React equivalents.
 *
 * NOTE: use the same ids, classes and html elements as you did in Vue. Refer to tests in the __tests__ folder to pass the unit tests, and to the cypress/e2e folder for the end-to-end tests.
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
