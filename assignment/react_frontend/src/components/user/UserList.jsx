import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { dataTestIds } from "../../tests/constants/components";
import { Link } from "react-router-dom";
import { fetchUsers, removeUsers } from "../../redux/actions/userActions";
import { useRedirect } from "../../hooks/useRedirect";

const UserList = () => {
  const users = useSelector((state) => state.users);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    containerId: { main, empty, listItem },
    textId: { name, role },
    clickId,
    linkId: { inspect },
  } = dataTestIds;

  useEffect(() => {
    console.log("how bout here")
    dispatch(fetchUsers());
  }, []);

  console.log(users)

  useRedirect(["admin"]);

  const deleteHandler = (userId) => {
    return () => dispatch(removeUsers(userId));
  };

  return (
    <div data-testid={main}>
      <h1>Users</h1>
      {users.length > 0 ? (
        users.map((user) => (
          <div key={listItem(user.id)} data-testid={listItem(user.id)}>
            <span data-testid={name}>{user.name}</span>
            <span data-testid={role}>{user.role}</span>
            <Link data-testid={inspect(user.id)} to={`/users/${user.id}`}>
              Link to user
            </Link>
            {auth.user.id !== user.id && (
              <>
                <Link
                  to={`/users/${user.id}/modify`}
                  data-testid={clickId.modify}
                >
                  Modify
                </Link>
                <button
                  data-testid={clickId.delete}
                  onClick={deleteHandler(user.id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))
      ) : (
        <div data-testid={empty}></div>
      )}
    </div>
  );
};

export default UserList;
