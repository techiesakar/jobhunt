import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie

function ProtectedRoute() {
  const navigate = useNavigate();
  const [Token, setToken] = useState(false);

  useEffect(() => {
    // Check if the "token" cookie exists
    const token = Cookies.get("token");

    if (token) {
      setToken(true);
    } else {
      navigate("/signin", {
        replace: true,
      });
    }
  }, []); // Empty dependency array to run the effect only once

  return Token ? <Outlet /> : "please wait";
}

export default ProtectedRoute;
