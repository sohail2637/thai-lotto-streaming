import React, { useState } from "react";
import axios from "axios";
import { FcCalendar } from "react-icons/fc";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Details.css";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { withStyles, makeStyles } from "@material-ui/core/styles";
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
} from "@material-ui/core";
import Swal from "sweetalert2";
import InputBase from "@material-ui/core/InputBase";
import { useSelector } from "react-redux";
// import axios from "axios";

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
    backgroundColor: "#000",
    color: theme.palette.common.white,
    fontSize: "20px",
  },
  body: {
    fontSize: 16,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const Details = () => {
  const classes = useStyles();
  let [record, setRecord] = useState([]);
  const [value, setValue] = useState(new Date());
  let [state, setState] = useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleChange = () => {
    setState(false);
  };
  const handleDateChange = (evt) => {
    console.log("selected data", evt);
    setSelectedDate(evt);
    drawData(evt);
  };

  async function drawData(evt) {
    let date = value.toDateString();
    const resp = await axios
      .post("/drawDetails", { date: evt.toDateString() })
      .then((res) => {
        console.log(res.data);
        setRecord(res.data);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="">Why do I have this issue?</a>',
        });
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
          title: err,
        });
        console.log(err);
      });
    console.log(record);
  }

  return (
    <div className="drawDetails flexcol">
      <div className="draw-dates">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className="datepiker" style={{}}>
            <KeyboardDatePicker
              disableToolbar
              variant="outlied"
              format="MM/dd/yyyy"
              // margin="normal"
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
        </MuiPickersUtilsProvider>

      </div>
      <div className="draw-table">
        {record ? (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell className="tablehead" lassName="tablehead">
                    Time
                  </StyledTableCell>
                  <StyledTableCell className="tablehead" align="center">
                    1st
                  </StyledTableCell>
                  <StyledTableCell className="tablehead" align="center">
                    2nd
                  </StyledTableCell>
                  <StyledTableCell className="tablehead" align="center">
                    2nd
                  </StyledTableCell>
                  <StyledTableCell className="tablehead" align="center">
                    2nd
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tablebody}>
                {record.map((item, index) => {
                  return (
                    <StyledTableRow>
                      <StyledTableCell className="tablebody" align="center">
                        {item.date}
                      </StyledTableCell>
                      <StyledTableCell className="tablebody" align="center">
                        {item.first}
                      </StyledTableCell>
                      <StyledTableCell className="tablebody" align="center">
                        {item.secondA}
                      </StyledTableCell>
                      <StyledTableCell className="tablebody" align="center">
                        {item.secondB}
                      </StyledTableCell>
                      <StyledTableCell className="tablebody" align="center">
                        {item.secondC}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : null}
      </div>
    </div>
  );
};
export default Details;
