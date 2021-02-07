import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Form from "./Form";
import Users from "./Users";
import axios from "axios";

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showingMsg: false,
      msg: "",
      isLoading: false,
    };
  }
  showMsg = (msg) => {
    this.setState(
      {
        showingMsg: true,
        msg,
        isLoading: false,
      },
      () => {
        setTimeout(() => {
          this.setState({ showingMsg: false });
        }, 1000 * 4);
      }
    );
  };
  
  
  login = (formData) => {
    const _this = this;
    _this.setState({ isLoading: !this.state.isLoading });
    axios
      .post(`${process.env.REACT_APP_API_HOST}/api/auth/login`, {
        email: formData.email,
        password: formData.password,
      })
      .then(function (response) {
        _this.showMsg(response.data.msg);
      })
      .catch(function (error) {
        if (error.response) {
          _this.showMsg(error.response.data.msg || "An error occured");
        } else if (error.request) {
          console.log(error.request);
        } else {
          _this.showMsg(error.message);
        }
      });
  };

  signup = (formData) => {
    const _this = this;
    _this.setState({ isLoading: !this.state.isLoading });
    axios
      .post(`${process.env.REACT_APP_API_HOST}/api/auth/signup`, {
        name: formData.name,
        email:formData.email,
        password:formData.password,
      })
      .then(function (response) {
        _this.showMsg(response.data.msg);
      })
      .catch(function (error) {
        if (error.response) {
          _this.showMsg(error.response.data.msg || "An error occured");
        } else if (error.request) {
          console.log(error.request);
        } else {
          _this.showMsg(error.message);
        }
      });
  };
  render() {
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

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
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
                onSubmit={(formData) => {
                  this.signup(formData);
                }}
              />
            </Route>
            <Route path="/login">
              <Form
                title="Login"
                text="Welcome Back, Please Login"
                formName="loginForm"
                btn={{ className: "button-container w-100", text: "Submit" }}
                onSubmit={(formData) => this.login(formData)}
              />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
          </Switch>
        </div>
        {this.state.showingMsg && (
          <div className="alert text-center alert-info msg-alert">
            {" "}
            {this.state.msg}
          </div>
        )}
        {this.state.isLoading && <div id="loader"></div>}
      </Router>
    );
  }
}
export default App;
