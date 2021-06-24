import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Container,
  Typography,
  Button,
  Box,
  OutlinedInput,
} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import TextField from "@material-ui/core/TextField";
import { Link, Redirect, useHistory } from "react-router-dom";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import swal from "sweetalert";

import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // height: "120vh",
  },
  paper: {
    padding: theme.spacing(2),

    color: theme.palette.text.secondary,
  },
  navBarContainer: {
    width: "100%",

    backgroundSize: "cover",
    backgroundPosition: "center",
    background:
      "linear-gradient(0deg, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0)), url(/assets/images/registerimg.png)",
  },
  formContainer: {
    marginTop: "4rem",
    marginBottom: "3rem",
    paddingLeft: "10rem",
    [theme.breakpoints.down("md")]: {
      paddingLeft: "0rem",
      paddingRight: "0rem",
    },

    paddingRight: "10rem",
  },
  inputLbel: {
    paddingLeft: "0.8rem",
    fontSize: "14px",
    color: "#243028",
  },

  seeBtn: {
    backgroundColor: "#f9b707",
    width: "100%",
    textTransform: "capitalize",
    // borderRadius: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 35,
    textAlign: "center",
    color: "#fff",
    // marginLeft: "0.5rem",
    "&:hover": {
      backgroundColor: "#000",
    },
  },
  firstLine: {
    backgroundColor: "red",
    width: "117px",
    height: "0px",
    // marginTop: "3rem",
    border: "0.5px solid #555555",
  },

  RegisterContent: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: 70,
    paddingBottom: 100,
  },

  security: {
    fontSize: "64px",
    fontFamily: "Spartan",
    color: "#232323",
    lineHeight: 1,
    fontWeight: "700",
    [theme.breakpoints.down("md")]: {
      fontSize: "40px",
      fontWeight: "500",
    },
  },
  boxContainer: {
    width: "auto",
    height: "auto",
    border: "1px solid #f33f3f",
    marginTop: "1rem",
    padding: "1rem",
    [theme.breakpoints.down("md")]: {
      padding: "0.5rem",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0.4rem",
    },
  },
  orContainer: {
    color: theme.lightGray,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 7,
  },
  formControl: {
    width: "100%",
    // margin: theme.spacing(1),
    minWidth: 120,
  },
  uplodimg: {
    width: "350px",
    height: "350px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SignupPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const [varifed, setvarifey] = useState(false);
  const [code, setCode] = useState();
  const [state, setState] = React.useState({
    resetpassword: "",
    email: "",
    pincode: "",
    newpassword: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
    console.log({ [name]: event.target.value });
  };

  // const submationform = (event) => {
  //   event.preventDefault();
  //   console.log(state);
  //   axios
  //     .post("/signup", state)
  //     .then((res) => {
  //       console.log("api respons: ", res);
  //       swal(res.data);
  //       history.push("/login");
  //       console.log({ res });
  //     })
  //     .catch((error) => swal(error));
  // };
  const sendemail = () => {
    const randemcode = Math.floor(100000 + Math.random() * 900000);
    setCode(randemcode);
    console.log(randemcode);
    axios
      .post("/sendemail", { email: state.email, pin: code })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };
  const verifycode = () => {
    axios
      .post("/verifypin", { pin: state.pincode, email: state.email })
      .then((res) => {
        console.log(res);
        setvarifey(true);
      })
      .catch((error) => console.log(error));
  };
  const upDatePassword = () => {
    axios
      .post("/updatepassword", {
        email: state.email,
        password: state.newpassword,
      })
      .then((res) => {
        console.log(res);
        history.push("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} lg={12} className={classes.formContainer}>
            <Container
              maxWidth="md"
              style={{ minHeight: "70vh", border: "2px solid #f9b707" }}
            >
              {/* <form onSubmit={handleSubmit(onSubmit)}> */}
              {/* <form onSubmit={submationform}> */}
              <Typography
                variant="h6"
                style={{ marginTop: "1rem", textAlign: "left" }}
              >
                <label for="fname" className={classes.inputLbel}>
                  Email
                </label>
              </Typography>
              <TextField
                style={{
                  borderBottom: "1px solid #ccc",
                  paddingLeft: "14px",
                }}
                onChange={handleChange}
                name="email"
                fullWidth
                required
                placeholder="Email..."
                id="outlined-helperText"
                variant="outlined"
              />
              <Button
                onClick={() => sendemail()}
                fullWidth={true}
                className={classes.seeBtn}
                fullWidth
              >
                Send Message
              </Button>
              <Typography
                variant="h6"
                style={{ marginTop: "1rem", textAlign: "left" }}
              >
                {" "}
                <label for="fname" className={classes.inputLbel}>
                  pin Code
                </label>
              </Typography>
              <TextField
                type="number"
                style={{
                  borderBottom: "1px solid #ccc",
                  paddingLeft: "14px",
                }}
                onChange={handleChange}
                name="password"
                fullWidth
                name="pincode"
                placeholder="pin-code"
                required
                id="outlined-helperText"
                variant="outlined"
              />
              <Button
                onClick={() => verifycode()}
                fullWidth={true}
                className={classes.seeBtn}
                fullWidth
              >
                Verify Code
              </Button>
              {varifed ? (
                <>
                  <Typography
                    variant="h6"
                    style={{ marginTop: "1rem", textAlign: "left" }}
                  >
                    {" "}
                    <label for="fname" className={classes.inputLbel}>
                      New Password
                    </label>
                  </Typography>
                  <TextField
                    style={{
                      borderBottom: "1px solid #ccc",
                      paddingLeft: "14px",
                    }}
                    onChange={handleChange}
                    name="newpassword"
                    fullWidth
                    name="newpassword"
                    placeholder="New Password"
                    required
                    type="password"
                    id="outlined-helperText"
                    variant="outlined"
                  />
                  <Button
                    onClick={() => upDatePassword()}
                    fullWidth={true}
                    className={classes.seeBtn}
                    fullWidth
                  >
                    Update Password
                  </Button>
                </>
              ) : null}
              {/* </form> */}
              <Typography style={{ marginTop: '10px', textAlign:'center'}}>can you want to...<Link to="/login">Login</Link> </Typography>
            </Container>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default SignupPage;
