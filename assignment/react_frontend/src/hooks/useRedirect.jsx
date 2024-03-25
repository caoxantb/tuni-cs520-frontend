import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useRedirect = (accessbileRoles) => {
  const auth = useSelector((state) => state.auth);
  const role = auth?.user?.role;
  const navigate = useNavigate();

  useEffect(() => {
    const timerId = setTimeout(() => {
      // Code to be executed after a delay
      if (!accessbileRoles.includes(role)) {
        if (role === "guest") {
          console.log("run here 1");
          navigate("/login");
        } else {
          console.log("run here 2");
          navigate("/");
        }
      }
    }, 1000); // Delay of 1000 milliseconds (1 second)

    // Clean up the timer when the component unmounts or the effect is re-run
    return () => clearTimeout(timerId);

  }, [auth]);
};
