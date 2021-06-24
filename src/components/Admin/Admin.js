import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
    import { Redirect } from "react-router";

import {
  Grid,
  Container,
  TextField,
  Typography,
  Button,
  Box,
  Paper,
} from "@material-ui/core";
import swal from "sweetalert";
import { makeStyles } from "@material-ui/core/styles";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import LockIcon from "@material-ui/icons/Lock";
import "./admin.css";
import {
  timeline,
  resaults,
  drawvideo,
  logintoken,
} from "../../redux/time-line-reducers";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  inputLbel: {
    paddingLeft: "0.8rem",
    fontSize: "20px",
    color: "#fff",
    // color: "#fff",
  },
  inputfield: {
    backgroundColor: "#fff",
    padding: "0 10px",
    borderRadius: "20px",
  },

  btn: {
    backgroundColor: "#f9b707",
    fontSize: "18px",
    fontWeight: "500",
    width: "100%",
    lineHeight: "35px",
    borderRadius: "20px",
    color: "#000",
    margin: "2.5rem auto",
    ":hover": {
      backgroundColor: "#fff",
      color: "#fff",
    },
  },
}));

function convertTZ(date, tzString) {
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: tzString,
    })
  );
}

let geneatedThumbs = false;
const Admin = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();
  let [video, setVideos] = useState({});
  let [draw, setDraw] = useState({});
  let [record, setRecord] = useState([]);
  const timelineData = useSelector((state) => state.timeline.timelinedata);

  const [selectedDate, setSelectedDate] = React.useState(
    convertTZ(new Date(), "Asia/Bangkok")
  );
  const [state, setState] = useState({
    date: null,
    time: null,
    first: null,
    secondA: null,
    secondB: null,
    secondC: null,
  });

  const onVideoChange = (event) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      console.log(img);
      setVideos(img);
      console.log("state video ", img);
    }
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const submationform = (event) => {
    event.preventDefault();

    console.log(state);
    const data = state;
    data.date = selectedDate.toDateString();
    axios
      .post("/resualts", data)
      .then((res) => {
        console.log("api respons: ", res);
        const respons = JSON.parse(res.config.data);
        dispatch(resaults(respons));

        // history.push("/login");
        console.log(res.config.data);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Hostory Saved...!",
        });
      })
      .catch((error) => swal(error));
  };
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  useEffect(async () => {
    const parsedata = JSON.parse(timelineData);
    setState({
      ...state,
      date: parsedata,
    });
    const res = await axios
      .get("/uploadedRecord")
      .then((res) => {
        setRecord(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [video]);
  async function uploadVideos(evt) {
    evt.preventDefault();
    let form = new FormData();

    form.append("file", video);

    const resp = await axios
      .post("/uploadStream", form, config)
      .then((res) => {
        console.log(res.data);
        dispatch(drawvideo(res.data));

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Stream uploaded",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const setNotification = () => {
    let data = selectedDate;

    data = selectedDate.toISOString();

    axios
      .post("/notification", { selectedDate: data })
      .then((res) => {
        const respons = JSON.parse(res.config.data);
        dispatch(timeline(respons.selectedDate));

        const Tost = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Tost.fire({
          icon: "success",
          title: "Notification update",
        });
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
    console.log({ [name]: event.target.value });
  };

  async function uploadDraw(evt) {
    evt.preventDefault();
    let sysDate = new Date();
    sysDate = sysDate.toDateString();
    let form = new FormData();
    form.append("date", sysDate);
    form.append("file", draw.files[0]);

    const resp = await axios
      .post("/uploadDraw", form)
      .then((res) => {
        console.log(res.data);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Draw uploaded",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const resetpasswordbtn = () => {
    localStorage.removeItem("thai-token");
    dispatch(logintoken(""));
    return <Redirect to="/resetPassword" />;
  };

  return (
    <div className="main-container flexcol">
      <div className="admin-container">
        <div className="admin-titel  flexbox">
          <div className="videos flexbox">
            <input
              type="file"
              // style={{ color: "#fff" }}
              onChange={(evt) => onVideoChange(evt)}
            />
            <button onClick={uploadVideos}>Upload Video</button>
          </div>
          <div className="reseticon">
            <Link to="/login">
              <LockIcon
                fontSize="large"
                onClick={() => resetpasswordbtn}
                style={{ color: "#000" }}
              />
            </Link>{" "}
          </div>
        </div>

        <div className="draw flexbox">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div
              style={{
                backgroundColor: "#EBE9EA",
                padding: "10px",
                width: "305px",
                borderRadius: "25px",
              }}
            >
              <KeyboardDatePicker
                disableToolbar
                variant="outlied"
                format="MM/dd/yyyy"
                variant="outlined"
                id="date-picker-inline"
                label="Date picker inline"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </div>
            <div
              style={{
                backgroundColor: "#EBE9EA",
                padding: "10px",
                width: "305px",
                borderRadius: "25px",
              }}
            >
              <KeyboardTimePicker
                variant="outlined"
                id="time-picker"
                label="Time picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </div>
          </MuiPickersUtilsProvider>
          <div>
            <Button
              onClick={() => setNotification()}
              fullWidth
              variant="contained"
              style={{
                backgroundColor: "#f9b707",
                color: "#fff",
                fontSize: "18px",
                fontWeight: "700",
                width: "305px",
                lineHeight: "3rem",
                borderRadius: "15px",
              }}
            >
              Notification
            </Button>
          </div>
        </div>
      </div>
      <div className="resault-container flexcol">
        <form onSubmit={submationform}>
          <Typography
            variant="h6"
            style={{ marginTop: "1rem", textAlign: "left" }}
          >
            {" "}
            <label for="First" className={classes.inputLbel}>
              1st
            </label>
          </Typography>
          <TextField
            className={classes.inputfield}
            onChange={handleChange}
            type="number"
            name="first"
            required
            fullWidth
            placeholder="First"
            id="outlined-helperText"
            variant="outlined"
          />
          <Typography
            variant="h6"
            style={{ marginTop: "1rem", textAlign: "left" }}
          >
            {" "}
            <label for="secondA" className={classes.inputLbel}>
              2nd
            </label>
          </Typography>
          <TextField
            onChange={handleChange}
            className={classes.inputfield}
            name="secondA"
            type="number"
            required
            fullWidth
            placeholder="secondA resault"
            id="outlined-helperText"
            variant="outlined"
          />
          <Typography
            variant="h6"
            style={{ marginTop: "1rem", textAlign: "left" }}
          >
            {" "}
            <label for="second" className={classes.inputLbel}>
              2nd
            </label>
          </Typography>
          <TextField
            onChange={handleChange}
            className={classes.inputfield}
            name="secondB"
            type="number"
            required
            fullWidth
            placeholder="secondB resualt"
            id="outlined-helperText"
            variant="outlined"
          />
          <Typography
            variant="h6"
            style={{ marginTop: "1rem", textAlign: "left" }}
          >
            {" "}
            <label for="second" className={classes.inputLbel}>
              2nd
            </label>
          </Typography>
          <TextField
            onChange={handleChange}
            className={classes.inputfield}
            name="secondC"
            type="number"
            required
            fullWidth
            placeholder="SecondC resault"
            id="outlined-helperText"
            variant="outlined"
          />
          <Button className={classes.btn} type="submit" variant="outlined">
            Submit
          </Button>
        </form>

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
})(Admin);
