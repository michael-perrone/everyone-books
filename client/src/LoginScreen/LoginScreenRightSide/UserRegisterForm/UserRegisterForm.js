/* eslint-disable no-useless-escape */
import React from "react";
import styles from "./UserRegisterForm.module.css";
import axios from "axios";
import { connect } from "react-redux";
import EmployeeSignup from "./EmployeeSignup/EmployeeSignup";
import { withRouter } from "react-router-dom";
import { USER_REGISTER_SUCCESS } from "../../../actions/actions";
import Alert from "../../../Alert/Alert";



class UserRegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.registerUser = this.registerUser.bind(this);
    this.getUserInput = this.getUserInput.bind(this);
    this.state = {
      token: "",
      user: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        createPassword: "",
        passwordConfirm: "",
      },
      signingUpState: false,
      dirty: {
        firstName: false,
        lastName: false,
        email: false,
        phoneNumber: false,
        createPassword: false,
        passwordConfirm: false,
        age: false,
        gender: false
      },
      showOptionals: false,
      loggingInError: false,
      phoneAlreadyInUse: false
    };
    this.setDirty = this.setDirty.bind(this);
  }

  setDirty(event) {
    const newObject = { ...this.state.dirty };
    newObject[event.target.name] = true;
    this.setState({ dirty: newObject });
  }

  validatePhone = phone => {
    // eslint-disable-next-line no-useless-escape
    let newRe = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return newRe.test(phone);
  };

  validateEmail = email => {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  getUserInput(event) {
    const newUserStateObject = { ...this.state.user };
    newUserStateObject[event.target.name] = event.target.value;
    this.setState({ user: newUserStateObject });
  }

  showOptionals = () => {
    this.setState({ showOptionals: true });
  };

  hideOptionals = () => {
    this.setState({ showOptionals: false });
  };

  registerUser(event) {
    event.preventDefault();
    if (
      this.state.user.firstName === "" ||
      this.state.user.lastName === "" ||
      this.state.user.email === "" ||
      this.state.user.createPassword.length < 7 ||
      this.state.user.passwordConfirm !== this.state.user.createPassword ||
      this.state.user.phoneNumber === ""
    ) {
      this.setState({ loggingInError: true });
    } else {
      axios
        .post("/api/usersSignup", this.state.user)
        .then(response => {
          /*   const tokenDecoded = decoder(response.data.token);
          localStorage.setItem("token", response.data.token);
          this.setState({ token: decoder(response.data.token) }); */
          if (response.status === 200) {
            this.props.userRegisterSuccess(response.data.token);
          }
          this.props.history.push(`/user/${this.props.user.id}`);
        })
        .catch(error => {
          if (error.response && error.response.status === 405) {
            this.setState({phoneAlreadyInUse: true})
          }
          console.log(error);
        });
    }
  }

  render() {
    let className = "";
    if (this.props.employeeRegister) {
      className = styles.animator;
    } else {
      className = styles.animator2;
    }

    return (
      <div className={styles.registerFormContainer} id={className}>
        <p className={styles.registerP}>Register for Everyone Books</p>

        <div
          onMouseEnter={this.showOptionals}
          onMouseLeave={this.hideOptionals}
        >
          <form id={styles.form}>
            <div
              style={{ marginTop: "10px" }}
              className={styles.divWidthControl}
            >
              <label className={styles.labels}>First Name:</label>
              <input
                onBlur={this.setDirty}
                onChange={this.getUserInput}
                value={this.state.user.firstName}
                name="firstName"
                placeholder="First Name"
                id={styles.input1}
                className={styles.inputs}
                type="text"
              />
              {this.state.dirty.firstName === true &&
                this.state.user.firstName === "" && (
                  <Alert alertPhrase={"Field cannot be blank"} />
                )}
            </div>

            <div className={styles.divWidthControl}>
              <label
                style={{ letterSpacing: "0.4px" }}
                className={styles.labels}
              >
                Last Name:
              </label>
              <input
                onBlur={this.setDirty}
                onChange={this.getUserInput}
                value={this.state.user.lastName}
                name="lastName"
                placeholder="Last Name"
                id={styles.input1}
                className={styles.inputs}
                type="text"
              />
              {this.state.dirty.lastName === true &&
                this.state.user.lastName === "" && (
                  <Alert alertPhrase={"Field cannot be blank"} />
                )}
            </div>

            <div className={styles.divWidthControl}>
              <label
                style={{ letterSpacing: "0.3px" }}
                className={styles.labels}
              >
                Email Address:
              </label>
              <input
                onBlur={this.setDirty}
                onChange={this.getUserInput}
                value={this.state.user.email}
                name="email"
                placeholder="Email Address"
                id={styles.input2}
                className={styles.inputs}
                type="text"
              />
              {this.validateEmail(this.state.user.email) === false &&
                this.state.dirty.email === true && (
                  <Alert alertPhrase={"Please enter a valid email address"} />
                )}
            </div>

            <div className={styles.divWidthControl}>
              <label className={styles.labels}>Phone Number:</label>
              <input
                onBlur={this.setDirty}
                onChange={this.getUserInput}
                value={this.state.user.phoneNumber}
                name="phoneNumber"
                placeholder="Phone Number"
                id={styles.input2}
                className={styles.inputs}
                type="text"
              />
              {this.validatePhone(this.state.user.phoneNumber) === false &&
                this.state.dirty.phoneNumber === true && (
                  <Alert alertPhrase={"Please enter a valid phone number"} />
                )}
                {this.state.phoneAlreadyInUse && <Alert alertPhrase={"This phone number is already registered"}/>}
            </div>

            <div className={styles.divWidthControl}>
              <label
                style={{ letterSpacing: "0.7px" }}
                className={styles.labels}
              >
                Create Password:
              </label>
              <input
                onKeyDown={this.setDirty}
                onChange={this.getUserInput}
                value={this.state.user.createPassword}
                name="createPassword"
                placeholder="Create Password"
                id={styles.inputExtraW}
                className={styles.inputs}
                type="password"
              />
              {this.state.dirty.createPassword === true &&
                this.state.user.createPassword.length < 7 && (
                  <Alert
                    alertPhrase={
                      "Must be at least eight characters"
                    }
                  />
                )}
            </div>

            <div className={styles.divWidthControl}>
              <label className={styles.labels}>Password Confirm:</label>
              <input
                onKeyDown={this.setDirty}
                onChange={this.getUserInput}
                value={this.state.user.passwordConfirm}
                name="passwordConfirm"
                placeholder="Password Confirm"
                id={styles.inputExtraW}
                className={styles.inputs}
                type="password"
              />
              {this.state.dirty.passwordConfirm === true &&
                this.state.user.passwordConfirm !==
                  this.state.user.createPassword && (
                  <Alert alertPhrase={"Passwords must match"} />
                )}
            </div>
          </form>
          <div id={styles.instructorSignUpAndRegSignUp}>
            <EmployeeSignup />
            <button onClick={this.registerUser} id={styles.signUpButton}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    employeeRegister: state.booleanReducers.employeeRegister,
    authenticated: state.authReducer.isUserAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userRegisterSuccess: token =>
      dispatch({ type: USER_REGISTER_SUCCESS, payload: { token } })
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserRegisterForm)
);
