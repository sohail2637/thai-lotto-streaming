import React, { useEffect, useState } from "react";
import "./Notification.css";
import { useSelector } from "react-redux";
import axios from "axios";
let selectedDate = "";
const Notification = () => {
  let [notification, setNotification] = useState("");

  let timelineData;
  useEffect(() => {
    axios.get("/refreshnotification").then((resp) => {
      // resp.data[0].date = resp.data[0].date.replace(/\//g, "-");
      selectedDate = resp.data.selectedDate;

      resp.data.currentDate = new Date()
        .toLocaleDateString()
        .replace(/\//g, "-");
      setNotification({
        ...resp.data,
        // currentDate,
        mins:
          resp.data[0].time.split(":")[0] +
          ":" +
          resp.data[0].time.split(":")[1] +
          " " +
          resp.data[0].time.split(" ")[1],
      });
    });

    timelineData = {};
    console.timeLog(timelineData);
  }, []);
  return (
    <div>
      <div className="Notifi-container">
        <div className="Notifi-inner-container flexbox">
          <div className="imgcontainer">
            <img src="/notification.png" alt="img not found" />
          </div>
          <div className="containtent-container flexcol">
            <div className="timeline-title">
              <h5>
                <b> Upcoming Draw </b>
              </h5>
            </div>
            {/* <div className="timeline-value flexbox">
            <h6> 12-13-2021</h6> <h6> 06:56 PM</h6>
          </div> */}
          </div>
        </div>
      </div>
      <div className="booking-btn flexbox">
        <a href="http://thailottery.esol3.com/">Booking Now</a>
      </div>
      <div className="table-timeline">
        <div className=" title flexbox">
          <h5>Date</h5>
          <h5>Time</h5>
        </div>
        <div className="tablebody flexbox">
          {/* <h5>{timeline}</h5> */}
          <h5>
            {notification.date}, {notification.time}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Notification;
