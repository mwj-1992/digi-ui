import React from "react";
import { PropTypes } from "prop-types";
import styles from "./style.scss";
import "bootstrap/dist/css/bootstrap.min.css";

class Form extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: "",
      name: "",
      password: "",
      error: {},
      inputType: "password",
      minLengthCondition: false,
      upperCaseCondition: false,
      nonAlphanumericCondition: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleLogin(evt) {
    evt.preventDefault();

    this.setState({
      error: {},
    });

    const { email, password, name } = this.state;

    return this.props.onSubmit({ name, email, password });
  }
  toggleInputType = () => {
    this.setState(
      { inputType: this.state.inputType === "password" ? "text" : "password" },
      () => {}
    );
  };

  componentDidMount() {
    document.title = this.props.title || "Digi App";
  }

  handleChange(e) {
    let upperCaseCondition = false;
    let nonAlphanumericCondition = false;
    let minLengthCondition = false;
    if (e.target.name === "password") {
      if (/(?=.*[A-Z])/.test(e.target.value)) {
        console.log(true);
        upperCaseCondition = true;}
      if (/(?=.*?[#?!@$%^&*-])/.test(e.target.value))
        nonAlphanumericCondition = true;
      if (e.target.value.length >= 12) minLengthCondition = true;
    }
    this.setState({
      [e.target.name]: e.target.value,
      upperCaseCondition,
      nonAlphanumericCondition,
      minLengthCondition
    },()=>{
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
              placeholder="name*"
              autoComplete="off"
              className={usernameOptions.className}
              required
              name="name"
              onChange={(e) => this.handleChange(e)}
              type="text"
            />
          </div>
        )}
        <div className={usernameOptions.containerClassName}>
          <input
            placeholder="Email*"
            autoComplete="off"
            name="email"
            className={usernameOptions.className}
            required
            onChange={(e) => this.handleChange(e)}
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
            name="password"
            onChange={(e) => this.handleChange(e)}
            placeholder="Password"
            title="Password must contain at least 12 Charachters, at least one Uppercase, at least one non-alphanumeric"
            type={this.state.inputType}
          />
          <span
            class="toggleInput"
            onClick={() => {
              this.toggleInputType();
            }}
          >
            {this.state.inputType === "password" ? "Show" : "Hide"}
          </span>
          <small className="text-left">
            <span className={this.state.minLengthCondition ?"green": "red"}>
              Password must contain at least 12 Charachters,
            </span>
            <span className={this.state.upperCaseCondition ?"green": "red"}>
              
              at least one Uppercase,
            </span>
            
            <span
              className={this.state.nonAlphanumericCondition ?"green": "red"}
            >
              at least one non-alphanumeric
            </span>
          </small>
        </div>
        <div className="d-flex justify-content-between">
          <div className={this.props.btn.className}>
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
  email: PropTypes.object,
  password: PropTypes.object,
  name: PropTypes.object,
  form: PropTypes.object,
  text: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  btn: PropTypes.object,
};

Form.defaultProps = {
  email: {},
  password: {},
  name: {},
};

export default Form;
