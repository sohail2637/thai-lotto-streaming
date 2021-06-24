import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import video1 from "../videos/video.mp4";
import video2 from "../videos/Dummy Video.mp4";
import { connect } from "react-redux";
import axios from "axios";
import "./PlayList.css";
import { useHistory, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { AiOutlineArrowRight } from "react-icons/ai";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import moment from "moment";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
  Divider,
} from "@material-ui/core";

let drawTimePicked = false;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "90%",
    margin: "4% auto",
  },
  paper: {
    padding: theme.spacing(2),
    height: "150px",
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "#EEEEEE",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
}));
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#f9b707",
    color: theme.palette.common.white,
    fontSize: "16px",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function convertTZ(date, tzString) {
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: tzString,
    })
  );
}

let selectedDate = "2021-06-22T20:09:33.000Z";

const PlayList = (props) => {
  const classes = useStyles();

  let [index, setIndex] = useState(1);
  let [notification, setNotification] = useState("");

  let history = useHistory();
  const [timeline, setTimeLine] = useState();
  let [stream, setStream] = useState([{ name: "some.mp4" }]);
  const { date, setData } = new Date();
  const timelineData = useSelector((state) => state.timeline.timelinedata);
  const parsedata = JSON.parse(timelineData);
  const video = useSelector((state) => state.timeline.video);
  console.log("selector videos", video);
  const resaults = useSelector((state) => state.timeline.resault);
  console.log("selector resualts", resaults);

  function removeSeconds(time) {
    return (
      time.split(":")[0] + ":" + time.split(":")[1] + " " + time.split(" ")[1]
    );
  }

  let [currentTime, setCurrentTime] = useState(
    convertTZ(new Date(), "Asia/Bangkok").toLocaleTimeString()
  );

  let [resultString, setResultString] = useState("");
  let [playingDrawVideo, setPlayingDrawVideo] = useState(false);

  useEffect(async () => {
    setInterval(() => {
      setCurrentTime(
        convertTZ(new Date(), "Asia/Bangkok").toLocaleTimeString()
      );

      let t = moment;

      let thaiSelection = moment(selectedDate);
      let cDate = moment();
      let minutes = moment(
        convertTZ(new Date(), "Asia/Bangkok").toISOString()
      ).diff(thaiSelection, "minutes");

      console.log(
        "difference" +
          minutes +
          " " +
          moment(
            convertTZ(new Date(), "Asia/Bangkok").toISOString()
          ).toISOString()
      );

      if (minutes > 0 && !drawTimePicked) {
        setPlayingDrawVideo(true);
        drawTimePicked = true;
      }
    }, 1000);

    setTimeLine();

    // axios.get("/load-results").then((resp) => {
    axios.get("/uploadedRecord").then((resp) => {
      if (resp.data.success) {
        let resultString =
          "FIRST: " +
          resp.data.result.first +
          "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SECOND: " +
          resp.data.result.secondA +
          "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SECOND: " +
          resp.data.result.secondB +
          "&nbsp;&nbsp&nbsp;&nbsp;&nbsp;;&nbsp;SECOND: " +
          resp.data.result.secondC;

        setResultString(resultString);
      }
    });

    // axios.get("/get_notification").then((resp) => {
    axios.get("refreshnotification").then((resp) => {
      // resp.data[0].date = resp.data[0].date.replace(/\//g, "-");
      console.log("this is notification", resp.data[0].date);
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

      if ((await stream[0].name) == "some.mp4") {
        console.log(stream[0].name);
        const resp = await axios
          .get("/streamDisplay")
          .then((res) => {
            console.log(res.data);
            if (res.data) {
              setStream(res.data);
            }
          })
          .catch((err) => {
            console.log(err);
            history.push("/");
          });
      } else {
        document.querySelectorAll("ReactPlayer").forEach((video, index) => {
          video.poster = stream[index].poster;
        });
      }
  }, [stream]);

  return (
    <div className="play-list">
      <div className="title flexbox">
        <div className="time-line flexbox">
          <div className="logo-cotainer">
            <img src="/notification.png" style={{ width: "80px" }} />
          </div>
          <div className="time-Line-inner flexcol">
            <h5
              style={{
                textAlign: "center",
                color: "#000",
                fontWeight: "900",
                lineHeight: "10px",
              }}
              class="animate__animated animate__bounce animate__delay-2s "
            >
              Upcomming Draw
            </h5>
            <h5
              style={{
                margin: "auto",
                textAlign: "center",
                fontFamily: "ROBOTO",
                color: "#000",
              }}
            >
              {notification?
             (<> {notification.date}, {notification.time}</>):("")}
            </h5>
          </div>
        </div>
      </div>

      <div className="booking-btn flexbox">
        <a href="http://thailottery.esol3.com/">Booking Now</a>
      </div>
      <div className="Tv-container">
        <div
          className="tv-screen flexbox"
          style={{
            width: "100%",
            height: "80vh",
          }}
        >
          <img src="logo.png" className="video-logo" />
          {!playingDrawVideo ? (
            <iframe
              className="live-video-frame"
              // src="https://m.1905.com/m/cctv6/gzh/"
              // src="https://ch3plus.com/live"
              src="https://www.dailymotion.com/embed/video/x6g9qjj?api=postMessage&autoplay=false&id=player&origin=https%3A%2F%2Fwww.workpointtv.com"
            />
          ) : (
            <video
              className="video-admin"
              style={{ maxWidth: "640px" }}
              src={stream[0].name}
              onEnded={() => {
                setPlayingDrawVideo(false);
                axios
                  .post("/delete-video", {
                    videoID: stream[0].name,
                    _id: stream[0]._id,
                  })
                  .then(() => {
                    setPlayingDrawVideo(true);
                  });
              }}
              controls
            ></video>
          )}
        </div>
        <div
          className="move-container"
          style={{
            margin: "auto",
            width: "640px",
            display: "block",
            height: "44px",
          }}
        >
          <marquee
            scrollamount={2}
            dangerouslySetInnerHTML={{ __html: resultString }}
            class="white-bk"
          ></marquee>
          <div className="blue-bk">
            {currentTime}
            <div>{notification.currentDate}</div>
          </div>
        </div>

        <div className="details">
          <Link to="/drawerdetail">
            <p className="details-text">
              View details <AiOutlineArrowRight />
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default connect(function (store) {
  return store;
})(PlayList);
