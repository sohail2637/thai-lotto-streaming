import React, { useState, useEffect } from "react";
import PlayList from "../PlayList/PlayList";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./Main.css";

const Main = () => {
  let history = useHistory();
  let [draw, setDraw] = useState();
  // useEffect(async () => {
  // const resp = axios
  //   .get("/drawDisplay")
  //   .then((res) => {
  //     console.log(res.data);
  //     setDraw(res.data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     history.push("/");
  //   });
  // }, []);
  return (
    <div>
      <div className="desktopview">
        <PlayList />
      </div>
      <div className="mobileviewcontainer flexcol">
        <div className="marque-bar">
          <marquee direction="right"> Thai Lotto Tv</marquee>
        </div>
        <div>
          <Link to="/notification">
            <img
              src="/resaultes.jpeg"
              className="resaultesimg"
              alt="image not found"
            />
          </Link>
        </div>
        <div>
          <Link to="/stream">
            <img
              src="/playstore.jpeg"
              className="playstoreimg"
              alt="image not found"
            />
          </Link>
        </div>
        <div>
          <Link to="/drawerdetail">
            <img
              src="/timeLine.jpeg"
              className="resaultesimg"
              alt="image not found"
            />
          </Link>
        </div>
        <div className="marque-bar">
          <marquee> Thai Lotto Tv</marquee>
        </div>
      </div>
    </div>
  );
};
export default Main;
