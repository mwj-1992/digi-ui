import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Form from "./Form";
import Users from "./Users";
import axios from  "axios";

const login = (email, password) => {
  axios
    .post(`${process.env.REACT_APP_API_HOST}/api/login`, {
      email,
      password,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            MHD WAEL
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/users">
                  Users <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Signup
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <Switch>
          <Route path="/signup">
            <Form
              title="Sign up"
              text="Create a free account!"
              formName="registerForm"
              btn={{
                className: "button-container w-100",
                text: "Create Account",
              }}
              onSubmit={(username, password) => {
                console.log(username, password);
              }}
            />
          </Route>
          <Route path="/login">
            <Form
              title="Login"
              text="Welcome Back, Please Login"
              formName="loginForm"
              btn={{ className: "button-container w-100", text: "Submit" }}
              onSubmit={(username, password, isRemember) => {
                login(username, password, isRemember);
              }}
            />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
