import React, { useState,useEffect } from "react";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import { Provider,useSelector } from "react-redux";
import { BrowserRouter, Route,Redirect } from "react-router-dom";
import Details from "./components/Details/Details";
import Main from "./components/Main/Main";
import PlayList from "./components/PlayList/PlayList";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";
import Store from "./redux/store";
import Login from "./components/Login/Login";
import SignupPage from "./components/SignUp/Sigup";
import Notification from "./components/Notification/Notification";

function App() {


  const [token, setToken] = useState();
  // const securietykey = useSelector((state) => state.timeline.token);
  useEffect(() => {
    const securietykey=localStorage.getItem('thai-token')
    setToken(securietykey);
  }, []);
  return (
    <div className="App">
      <Provider store={Store}>
        <BrowserRouter>
          <div className="App-container">
            <div className="section">
              <Home />
              {/* <Route exact path="/login" component={Login} />
              <Route exact path="/" component={Main} />
              <Route path="/drawerdetail" component={Details} />
              <Route path="/stream" component={PlayList} />
              <Route path="/notification" component={Notification} />
              <Route path="/admin" component={Admin} /> */}
              {token ? (
                <>
                  <Route exact path="/resetPassword" component={SignupPage} />
                  <Route path="/admin" render={() => <Admin />} />
                </>
              ) : (
                <>
                  {" "}
                  <Redirect exact path="/" component={Main} />
                </>
              )}
              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={Main} />
              <Route path="/drawerdetail" component={Details} />
              <Route path="/stream" component={PlayList} />{" "}
              <Route path="/notification" component={Notification} />
            </div>
            <NavBar />
          </div>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
