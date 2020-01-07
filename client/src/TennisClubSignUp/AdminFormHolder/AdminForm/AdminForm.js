/* eslint-disable no-useless-escape */
import React from "react";
import styles from "./AdminForm.module.css";
import otherStyles from "../../../LoginScreen/LoginScreenRightSide/UserRegisterForm/UserRegisterForm.module.css";
import { connect } from "react-redux";
import Alert from "../../../Alert/Alert";

class AdminForm extends React.Component {
  constructor(props) {
    super(props);
    this.signingUp = this.signingUp.bind(this);
    this.setDirty = this.setDirty.bind(this);
    this.state = {
      admin: {
        clubName: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        createPassword: "",
        passwordConfirm: ""
      },
      signingUpState: false,
      dirty: {
        firstName: false,
        lastName: false,
        email: false,
        phoneNumber: false,
        createPassword: false,
        passwordConfirm: false,
        clubName: false
      },
      showOptionals: false
    };
    this.getAdminInput = this.getAdminInput.bind(this);
  }

  setDirty(event) {
    const newObject = { ...this.state.dirty };
    newObject[event.target.name] = true;
    this.setState({ dirty: newObject });
  }

  validatePhone = phone => {
    let newRe = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return newRe.test(phone);
  };

  showOptionals = () => {
    this.setState({ showOptionals: true });
  };

  hideOptionals = () => {
    this.setState({ showOptionals: false });
  };

  validateEmail = email => {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  signingUp() {
    this.setState({ signingUpState: true });
  }

  getAdminInput(event) {
    const newStateObject = { ...this.state.admin };
    newStateObject[event.target.name] = event.target.value;
    this.setState({ admin: newStateObject });
  }
  render() {
    let animationSubRight = "";
    if (this.props.adminEntered) {
      animationSubRight = styles.animationSubRight;
    }
    return (
      <div className={styles.subContainerRight} id={animationSubRight}>
        <p id={styles.registerP}>Admin Register</p>

        <form
          onMouseEnter={this.showOptionals}
          onMouseLeave={this.hideOptionals}
          id={styles.registerForm}
        >
          <div
            style={{ marginTop: "15px" }}
            className={otherStyles.divWidthControl}
          >
            <label style={{ color: "black" }} className={otherStyles.labels}>
              First Name:
            </label>
            <input
              style={{ color: "black", border: "3px ridge #dededc" }}
              onBlur={this.setDirty}
              onFocus={this.signingUp}
              onChange={this.getAdminInput}
              value={this.state.admin.firstName}
              name="firstName"
              placeholder="First Name"
              id={otherStyles.input1}
              className={otherStyles.inputs}
              type="text"
            />
            {this.state.dirty.firstName === true &&
              this.state.admin.firstName === "" && (
                <Alert alertPhrase={"Field cannot be blank"} />
              )}
          </div>
          <div className={otherStyles.divWidthControl}>
            <label
              style={{ letterSpacing: "0.6px", color: "black" }}
              className={otherStyles.labels}
            >
              Last Name:
            </label>
            <input
              style={{ color: "black", border: "3px ridge #dedecd" }}
              onBlur={this.setDirty}
              onFocus={this.signingUp}
              onChange={this.getAdminInput}
              value={this.state.admin.lastName}
              name="lastName"
              placeholder="Last Name"
              id={otherStyles.input1}
              className={otherStyles.inputs}
              type="text"
            />
            {this.state.dirty.lastName === true &&
              this.state.admin.lastName === "" && (
                <Alert alertPhrase={"Field cannot be blank"} />
              )}
          </div>
          <div className={otherStyles.divWidthControl}>
            <label
              style={{ letterSpacing: "0.3px", color: "black" }}
              className={otherStyles.labels}
            >
              Email Address:
            </label>
            <input
              style={{ color: "black", border: "3px ridge #dedecd" }}
              onBlur={this.setDirty}
              onFocus={this.signingUp}
              onChange={this.getAdminInput}
              value={this.state.admin.email}
              name="email"
              placeholder="Email Address"
              id={otherStyles.input2}
              className={otherStyles.inputs}
              type="text"
            />
            {this.validateEmail(this.state.admin.email) === false &&
              this.state.dirty.email === true && (
                <Alert alertPhrase={"Please enter a valid email"} />
              )}
          </div>
          <div className={otherStyles.divWidthControl}>
            <label style={{ color: "black" }} className={otherStyles.labels}>
              Phone Number:
            </label>
            <input
              style={{ color: "black", border: "3px ridge #dedecd" }}
              onBlur={this.setDirty}
              onFocus={this.signingUp}
              onChange={this.getAdminInput}
              value={this.state.admin.phoneNumber}
              name="phoneNumber"
              placeholder="Phone Number"
              id={otherStyles.input2}
              className={otherStyles.inputs}
              type="text"
            />
            {this.validatePhone(this.state.admin.phoneNumber) === false &&
              this.state.dirty.phoneNumber === true && (
                <Alert alertPhrase={"Please enter a valid phone number"} />
              )}
          </div>
          <div className={otherStyles.divWidthControl}>
            <label
              style={{ letterSpacing: "0.7px", color: "black" }}
              className={otherStyles.labels}
            >
              Create Password:
            </label>
            <input
              style={{ color: "black", border: "3px ridge #dedecd" }}
              onBlur={this.setDirty}
              onFocus={this.signingUp}
              onChange={this.getAdminInput}
              value={this.state.admin.createPassword}
              name="createPassword"
              placeholder="Create Password"
              className={otherStyles.inputs}
              type="password"
            />
            {this.state.dirty.createPassword === true &&
              this.state.admin.createPassword.length < 7 && (
                <Alert alertPhrase={"Password must be eight characters"} />
              )}
          </div>
          <div className={otherStyles.divWidthControl}>
            <label style={{ color: "black" }} className={otherStyles.labels}>
              Password Confirm:
            </label>
            <input
              style={{ color: "black", border: "3px ridge #dedecd" }}
              onBlur={this.setDirty}
              onFocus={this.signingUp}
              onChange={this.getAdminInput}
              value={this.state.admin.passwordConfirm}
              name="passwordConfirm"
              placeholder="Password Confirm"
              className={otherStyles.inputs}
              type="password"
            />
            {this.state.dirty.passwordConfirm === true &&
              this.state.admin.passwordConfirm !==
                this.state.admin.createPassword && (
                <Alert alertPhrase={"Passwords must be matching"} />
              )}
          </div>

          <div className={otherStyles.divWidthControl}>
            <label style={{ color: "black" }} className={otherStyles.labels}>
              Tennis Club Name:
            </label>
            <input
              style={{ color: "black", border: "3px ridge #dedecd" }}
              onBlur={this.setDirty}
              onFocus={this.signingUp}
              onChange={this.getAdminInput}
              value={this.state.admin.clubName}
              name="clubName"
              placeholder="Tennis Club Name"
              className={otherStyles.inputs}
              type="text"
            />
            {this.state.dirty.clubName === true &&
              this.state.admin.clubName === "" && (
                <Alert alertPhrase={"Please enter your clubs name"} />
              )}
          </div>
          <button
            onClick={this.props.getAdminInfo(this.state.admin)}
            id={styles.registerButton}
          >
            Register As Club Admin
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    adminEntered: state.booleanReducers.adminEntered
  };
};

export default connect(mapStateToProps)(AdminForm);
