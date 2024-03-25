import { dataTestIds } from "../tests/constants/components";

const Home = () => {
  const {
    containerId: { main },
  } = dataTestIds;

  return (
    <div data-testid={main}>
      <h1>Home</h1>
    </div>
  );
};

export default Home;