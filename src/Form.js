import React from "react";
import { PropTypes } from "prop-types";
import styles from "./style.scss";
import "bootstrap/dist/css/bootstrap.min.css";

class Form extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      Username: "",
      Password: "",
      error: {},
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleLogin(evt) {
    evt.preventDefault();
    
    this.setState({
      error: {},
    });

    const { Username, Password } = this.state;

    return this.props.onSubmit(Username, Password);
  }

  componentDidMount() {
    document.title = this.props.title || "Digi App";

  }

  handleChange(name, e) {
    this.setState({
      [name]: e.target.value,
    });
  }


  render() {
    let usernameOptions = {
      maxLength: 40,
      placeholder: "Email",
      type: "email",
      containerClassName: "input-container",
    };

    let passwordOptions = {
      maxLength: 40,
      placeholder: "Password",
      type: "password",
      containerClassName: "input-container",
    };

    let formOptions = {
      className: "login-form",
    };

    if (this.props.form) {
      formOptions = Object.assign(formOptions, this.props.form);
    }

    return (
      <form onSubmit={this.handleLogin} className={formOptions.className}>
        <h2>{this.props.text} </h2>
        {this.props.formName === "registerForm" && (
          <div className={usernameOptions.containerClassName}>
            <input
              maxLength={40}
              placeholder="Name*"
              autoComplete="off"
              className={usernameOptions.className}
              required
              onChange={(e) => this.handleChange("name", e)}
              type="text"
            />
          </div>
        )}
        <div className={usernameOptions.containerClassName}>
          <input
            maxLength={40}
            placeholder="Email*"
            autoComplete="off"
            className={usernameOptions.className}
            required
            onChange={(e) => this.handleChange("Username", e)}
            type="email"
          />
          <span className="glyphicon glyphicon-envelope " />
        </div>
        <div className={passwordOptions.containerClassName}>
          <input
            autoComplete="off"
            className={passwordOptions.className}
            maxLength={40}
            required
            minLength={12}
            pattern="(?=.*?[#?!@$%^&*-])(?=.*[A-Z]).{12,}"
            name="Password"
            onChange={(e) => this.handleChange("Password", e)}
            placeholder="Password"
            title="Password must contain at least 12 Charachters, at least one Uppercase, at least one non-alphanumeric"
            type="text"
          />
          <small className="text-left d-flex">
            Password must contain at least 12 Charachters, at least one
            Uppercase, at least one non-alphanumeric
          </small>
        </div>
        <div className="d-flex justify-content-between">
          <div className={this.props.btn.className} >
            <button type="submit" className="btnSubmit">
              {this.props.btn.text}
            </button>
          </div>
        </div>
      </form>
    );
  }
}
Form.propTypes = {
  username: PropTypes.object,
  password: PropTypes.object,
  form: PropTypes.object,
  text: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  btn : PropTypes.object
};

Form.defaultProps = {
  username: {},
  password: {},
};

export default Form;
