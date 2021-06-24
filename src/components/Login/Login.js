import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import "./login.css";
import { connect , useDispatch } from "react-redux";
import store from "../../store/store";
import { Link, useHistory } from "react-router-dom";
import { logintoken } from "../../redux/time-line-reducers";

function Login(props) {
  const { register, handleSubmit, watch, errors } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    console.log(data);
    let resp = await axios.post("/login", data).then((resp) => {
      console.log("admin token", resp.data.token);
      if (resp && resp.data.success == true) {
        dispatch(logintoken(resp.data.token));
        // store.dispatch({
        //   type: "LOGIN_OK",
        //   payload: resp.data,
        // });

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
          title: "Login successfully",
        });
        history.push("/admin");
      } else if (resp.data.success === false) {
        props.history.push("/login");
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "error",
          title: "Please Type valid information",
        });
      }
    });

  };

  return (
    <div>
      <div>
        <center>
          <div className="container-login flexcol">
            <div
              className="z-depth-1 grey lighten-4 row"
              style={{
                display: "inline-block",
                padding: "32px 48px 0px 48px",
                border: "1px solid #EEE",
              }}
            >
              <form
                id="loginForm"
                onSubmit={handleSubmit(onSubmit)}
                className="col s12"
                method="post"
              >
                <div className="row">
                  <div className="col s12"></div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <input
                      className="validate"
                      type="email"
                      name="email"
                      id="email"
                      {...register("email")}
                    />
                    <label for="email">Enter Email</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <input
                      className="validate"
                      type="password"
                      name="password"
                      id="password"
                      {...register("password")}
                    />
                    <label for="password">Enter Password</label>
                  </div>
                </div>

                <br />
                <center>
                  <div className="row">
                    <button
                      type="submit"
                      name="btn_login"
                      className="col s12 btn btn-large waves-effect indigo"
                    >
                      Login
                    </button>
                  </div>
                </center>
                <center>
                  <div>
                    <h5>
                      <Link to="/resetPassword">Reset Password</Link>
                    </h5>
                  </div>
                </center>
              </form>
            </div>
          </div>
        </center>
      </div>
    </div>
  );
}

export default connect((myStore) => {
  return myStore;
})(Login);
