/* eslint-disable no-useless-escape */
import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";
import otherStyles from "../UserRegisterForm/UserRegisterForm.module.css";
import Alert from "../../../Alert/Alert";
import styles from "./InstructorRegisterForm.module.css";
import {
  INSTRUCTOR_WANTS_TO_REGISTER,
  INSTRUCTOR_REGISTER_SUCCESS
} from "../../../actions/actions";

class InstructorRegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.registerInstructor = this.registerInstructor.bind(this);
    this.getInstructorInput = this.getInstructorInput.bind(this);

    this.state = {
      instructor: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        createPassword: "",
        passwordConfirm: "",
        tennisClub: "",
        age: "",
        gender: ""
      },
      dirty: {
        firstName: false,
        lastName: false,
        email: false,
        phoneNumber: false,
        createPassword: false,
        passwordConfirm: false,
        age: false,
        gender: false,
        tennisClub: false
      },
      showOptionals: false
    };
    this.setDirty = this.setDirty.bind(this);
  }

  hideOptionals = () => {
    this.setState({ showOptionals: false });
  };

  setDirty(event) {
    const newObject = { ...this.state.dirty };
    newObject[event.target.name] = true;
    this.setState({ dirty: newObject });
  }

  getInstructorInput(event) {
    const newInstructorStateObject = { ...this.state.instructor };
    newInstructorStateObject[event.target.name] = event.target.value;
    this.setState({ instructor: newInstructorStateObject });
  }

  validatePhone = phone => {
    let newRe = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return newRe.test(phone);
  };

  validateEmail = email => {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  registerInstructor(event) {
    event.preventDefault();
    axios
      .post("/api/instructorSignup", this.state.instructor)
      .then(response => {
        if (response.status === 200) {
          this.props.instructorRegisterSuccess(response.data.token);
          this.props.history.push(`/instructor/${this.props.instructor.id}`);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  signingUp() {
    this.setState({ signingUpState: true });
  }

  showOptionals = () => {
    this.setState({ showOptionals: !this.state.showOptionals });
  };

  render() {
    let id = "";
    if (this.props.instructorRegister) {
      id = styles.animation;
    }
    return (
      <div className={styles.registerFormContainer} id={id}>
        <p
          className={otherStyles.registerP}
          id={styles.instructorRegisterP}
          style={{ color: "yellowgreen" }}
        >
          Register as an Instructor
        </p>
        <div
          onMouseEnter={this.showOptionals}
          onMouseLeave={this.hideOptionals}
          className={styles.registerForm}
        >
          <form id={styles.form}>
            <div
              style={{ marginTop: "8px" }}
              className={otherStyles.divWidthControl}
            >
              <label
                style={{ color: "yellowgreen" }}
                className={otherStyles.labels}
              >
                First Name:
              </label>
              <input
                style={{ border: "2px solid yellowgreen" }}
                onBlur={this.setDirty}
                onChange={this.getInstructorInput}
                value={this.state.instructor.firstName}
                name="firstName"
                placeholder="First Name"
                id={otherStyles.input1}
                className={otherStyles.inputs}
                type="text"
              />
              {this.state.dirty.firstName === true &&
                this.state.instructor.firstName === "" && (
                  <Alert alertPhrase={"Field cannot be blank"} />
                )}
            </div>
            <div className={otherStyles.divWidthControl}>
              <label
                style={{ color: "yellowgreen", letterSpacing: "0.3px" }}
                className={otherStyles.labels}
              >
                Last Name:
              </label>
              <input
                style={{
                  border: "2px solid yellowgreen"
                }}
                onBlur={this.setDirty}
                onChange={this.getInstructorInput}
                value={this.state.instructor.lastName}
                name="lastName"
                placeholder="Last Name"
                id={otherStyles.input1}
                className={otherStyles.inputs}
                type="text"
              />
              {this.state.dirty.lastName === true &&
                this.state.instructor.lastName === "" && (
                  <Alert alertPhrase={"Field cannot be blank"} />
                )}
            </div>

            <div className={otherStyles.divWidthControl}>
              <label
                style={{ color: "yellowgreen", letterSpacing: "0.3px" }}
                className={otherStyles.labels}
              >
                Email Address:
              </label>
              <input
                style={{
                  border: "2px solid yellowgreen"
                }}
                onBlur={this.setDirty}
                onChange={this.getInstructorInput}
                value={this.state.instructor.email}
                name="email"
                placeholder="Email Address"
                id={otherStyles.input2}
                className={otherStyles.inputs}
                type="text"
              />
              {this.validateEmail(this.state.instructor.email) === false &&
                this.state.dirty.email === true && (
                  <Alert alertPhrase={"Please enter a valid email"} />
                )}
            </div>

            <div className={otherStyles.divWidthControl}>
              <label
                style={{ color: "yellowgreen" }}
                className={otherStyles.labels}
              >
                Phone Number:
              </label>
              <input
                style={{ border: "2px solid yellowgreen" }}
                onBlur={this.setDirty}
                onChange={this.getInstructorInput}
                value={this.state.instructor.phoneNumber}
                name="phoneNumber"
                placeholder="Phone Number"
                id={otherStyles.input2}
                className={otherStyles.inputs}
                type="text"
              />
              {this.validatePhone(this.state.instructor.phoneNumber) ===
                false &&
                this.state.dirty.phoneNumber === true && (
                  <Alert alertPhrase={"Please enter a valid phone number"} />
                )}
            </div>

            <div className={otherStyles.divWidthControl}>
              <label
                style={{ color: "yellowgreen", letterSpacing: "0.7px" }}
                className={otherStyles.labels}
              >
                Create Password:
              </label>
              <input
                style={{ border: "2px solid yellowgreen" }}
                onKeyDown={this.setDirty}
                onChange={this.getInstructorInput}
                value={this.state.instructor.createPassword}
                name="createPassword"
                placeholder="Create Password"
                id={otherStyles.ml4}
                className={otherStyles.inputs}
                type="password"
              />
              {this.state.dirty.createPassword === true &&
                this.state.instructor.createPassword.length < 7 && (
                  <Alert
                    alertPhrase={"Password must be eight characters long"}
                  />
                )}
            </div>
            <div className={otherStyles.divWidthControl}>
              <label
                style={{ color: "yellowgreen" }}
                className={otherStyles.labels}
              >
                Password Confirm:
              </label>
              <input
                style={{ border: "2px solid yellowgreen" }}
                onKeyDown={this.setDirty}
                onChange={this.getInstructorInput}
                value={this.state.instructor.passwordConfirm}
                name="passwordConfirm"
                placeholder="Password Confirm"
                id={otherStyles.ml8}
                className={otherStyles.inputs}
                type="password"
              />
              {this.state.dirty.passwordConfirm === true &&
                this.state.instructor.passwordConfirm !==
                  this.state.instructor.createPassword && (
                  <Alert alertPhrase={"Passwords must be matching"} />
                )}
            </div>
            <div className={otherStyles.divWidthControl}>
              <label
                style={{ color: "yellowgreen", letterSpacing: "0.3px" }}
                className={otherStyles.labels}
              >
                Current Employer:
              </label>
              <input
                style={{
                  border: "2px solid yellowgreen"
                }}
                onChange={this.getInstructorInput}
                value={this.state.instructor.tennisClub}
                name="tennisClub"
                placeholder="Tennis Club Name"
                id={otherStyles.ml8}
                className={otherStyles.inputs}
                type="text"
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <p
                id={styles.headBack}
                onClick={this.props.instructorRegisterHandler}
              >
                Go back to user signup form
              </p>
              <button
                style={{ left: "-5px", backgroundColor: "yellowgreen" }}
                onClick={this.registerInstructor}
                id={otherStyles.signUpButton}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    instructor: state.authReducer.instructor,
    instructorRegister: state.booleanReducers.instructorRegister
  };
};

const mapDispatchToProps = dispatch => {
  return {
    instructorRegisterSuccess: instructorToken =>
      dispatch({
        type: INSTRUCTOR_REGISTER_SUCCESS,
        payload: { instructorToken }
      }),
    instructorRegisterHandler: () =>
      dispatch({ type: INSTRUCTOR_WANTS_TO_REGISTER })
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InstructorRegisterForm)
);
