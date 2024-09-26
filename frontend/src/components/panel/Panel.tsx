import { Outlet, useNavigate } from "react-router-dom";
import PanelNavbar from "../panel-navbar/PanelNavbar";
import { useEffect } from "react";
import { urls, API_URL } from "../../global/Variables";
import axios from "axios";

const RefreshToken = () => {
  if (localStorage.getItem("auth.refresh") !== null) {
    axios
      .post(API_URL + "/api/token/refresh/", {
        refresh: localStorage.getItem("auth.refresh"),
      })
      .then((res) => {
        localStorage.setItem("auth.access", res.data.access);
      })
      .catch(() => {
        localStorage.removeItem("auth.refresh");
      });
    return localStorage.getItem("auth.access") !== null;
  }
  return false;
};

const Panel = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("auth.access") === null) {
      if (!RefreshToken()) {
        navigate(urls.signIn);
      }
    }
  }, []);
  return (
    <div className="min-h-full h-screen">
      <PanelNavbar />
      <div className="bg-gray-900 h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Panel;
export { RefreshToken };
