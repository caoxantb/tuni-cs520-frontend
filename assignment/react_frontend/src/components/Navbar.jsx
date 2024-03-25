import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { capitalize } from "../helpers/capitalize";
import { dataTestIds } from "../tests/constants/components";
import { signout } from "../redux/actions/authActions";
import { useCallback } from "react";

const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    containerId: { navbar, profile },
    textId: { role },
    linkId,
    clickId: { logout },
  } = dataTestIds;

  const links = [
    {
      id: "home",
      accessible: ["guest", "customer", "admin"],
    },
    {
      id: "products",
      accessible: ["guest", "customer", "admin"],
    },
    {
      id: "orders",
      accessible: ["customer", "admin"],
    },
    {
      id: "users",
      accessible: ["admin"],
    },
    {
      id: "cart",
      accessible: ["guest", "customer"],
    },
    { id: "login", accessible: ["guest"] },
    { id: "register", accessible: ["guest"] },
  ];

  const handleSignout = useCallback(() => {
    dispatch(signout());
  });

  return (
    <nav data-testid={navbar}>
      {links
        .filter((link) => link.accessible.includes(auth?.user?.role))
        .map((link) => (
          <Link
            to={`/${link.id === "home" ? "" : link.id}`}
            key={link.id}
            data-testid={linkId[link.id]}
          >
            {capitalize(link.id)}
          </Link>
        ))}
      {auth?.user?.role !== "guest" && (
        <Link data-testid={logout} onClick={handleSignout}>
          Logout
        </Link>
      )}
      <span data-testid={profile}>
        Role: <span data-testid={role}>{auth?.user?.role}</span>
      </span>
    </nav>
  );
};

export default Navbar;
