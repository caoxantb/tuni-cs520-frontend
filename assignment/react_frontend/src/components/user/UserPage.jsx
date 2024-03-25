import { Link, useParams, useNavigate } from "react-router-dom";
import { dataTestIds } from "../../tests/constants/components";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, removeUsers } from "../../redux/actions/userActions";
import { useRedirect } from "../../hooks/useRedirect";

const UserPage = () => {
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users);
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    dispatch(fetchUsers());
    setUser(users.find((user) => user.id === userId));
  }, [users]);

  useRedirect(["admin"]);

  const {
    containerId: { inspect },
    textId: { name, role, email },
    clickId,
  } = dataTestIds;

  const deleteHandler = useCallback(() => {
    dispatch(removeUsers(userId));
    navigate("/users");
  });

  return (
    user && (
      <div data-testid={inspect}>
        <h1 data-testid={name}>{user.name}</h1>
        <div data-testid={email}>{user.email}</div>
        <div data-testid={role}>{user.role}</div>
        {auth.user.id !== user.id && (
          <div>
            <Link data-testid={clickId.modify} to={`/users/${userId}/modify`}>
              Modify
            </Link>
            <button data-testid={clickId.delete} onClick={deleteHandler}>
              Delete
            </button>
          </div>
        )}
      </div>
    )
  );
};

export default UserPage;
