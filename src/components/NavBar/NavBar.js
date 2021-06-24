import React, { useState, useEffect } from "react";
import { FcHome } from "react-icons/fc";
import { FaVideo } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import HistoryIcon from "@material-ui/icons/History";
import { useSelector } from "react-redux";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

import "./NavBar.css";

const NavBar = () => {
  const [token, setToken] = useState(false);
  const securietykey = useSelector((state) => state.timeline.token);
  useEffect(() => {
    if (securietykey) {
      setToken(true);
    } else {
      setToken(false);
    }
  }, [securietykey]);
  return (
    <div className="nav-container">
      <nav>
        <div className="nav-wrapper">
          <ul id="nav-mobile" className="centre">
            <li>
              <Link to="/">
                <FcHome />
              </Link>
            </li>
            <li>
              <Link to="/drawerdetail">
                <HistoryIcon fontSize="large" />
              </Link>
            </li>
            {token ? (
              <li>
                <Link to="/admin">
                  <SupervisorAccountIcon
                    fontSize="lasohail25816@gmail.comrge"
                    style={{ color: "#fff" }}
                  />
                </Link>
              </li>
            ) :(<li>
                <Link to="/login">
                  <SupervisorAccountIcon
                    fontSize="lasohail25816@gmail.comrge"
                    style={{ color: "#fff" }}
                  />
                </Link></li>)}
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default NavBar;
