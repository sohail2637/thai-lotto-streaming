import React, { useEffect, useState } from "react";
// import { IoNotifications } from "react-icons/io5";
import { IoLogInSharp } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { Link } from "react-router-dom"
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import { logintoken } from '../../redux/time-line-reducers';

const Home = () => {
  const [token, setToken] = useState();
  const dispatch = useDispatch();
const securietykey = useSelector((state) => state.timeline.token);
  useEffect(() => {
    setToken(securietykey);
  }, [securietykey]);
  const logoutbut = () => {
    localStorage.removeItem("thai-token");
    dispatch(logintoken(''));
  };

  return (
    <div className="home-container">
      <div className="home-section  flexbox">
        <div className="home-heading ">
          <div>
            <img src="/logo.jpeg" alt="not found" />
          </div>
        </div>

        <div className="title-container">
          <h2 className="thai-lotto">
            Thai Lotto Tv
            {/* <span> Thai </span> <span style={{ color: "#f9b707" }}>Lotto</span> */}
          </h2>
        </div>
        <div className="notify">
          {token ? (
            /* <IoNotifications className="notify-icon" /> */

            <Link to="/login">
              {/* <span>LogOut</span> */}
              <IoLogOutOutline
                className="notify-icon"
                style={{ color: "#fff" }}
                onClick={logoutbut}              />
            </Link>
          ) : (
            <Link to="/login">
              <IoLogInSharp className="notify-icon" style={{ color: "#fff" }} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
