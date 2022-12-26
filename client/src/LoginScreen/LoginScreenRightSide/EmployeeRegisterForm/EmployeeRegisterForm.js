/* eslint-disable no-useless-escape */
import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";
import otherStyles from "../UserRegisterForm/UserRegisterForm.module.css";
import Alert from "../../../Alert/Alert";
import styles from "./EmployeeRegisterForm.module.css";
import {
  EMPLOYEE_WANTS_TO_REGISTER,
  EMPLOYEE_REGISTER_SUCCESS
} from "../../../actions/actions";

// white
// employee
// .employee


class EmployeeRegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.registerEmployee = this.registerEmployee.bind(this);
    this.getEmployeeInput = this.getEmployeeInput.bind(this);

    this.state = {
      employee: {
        firstName: "",
        lastName: "",
        email: "",
        createPassword: "",
        passwordConfirm: "",
        profession: "",
      },
      dirty: {
        firstName: false,
        lastName: false,
        email: false,
        createPassword: false,
        passwordConfirm: false,
        profession: false,
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

  getEmployeeInput(event) {
    const newEmployeeStateObject = { ...this.state.employee };
    newEmployeeStateObject[event.target.name] = event.target.value;
    this.setState({ employee: newEmployeeStateObject });
  }

  validateEmail = email => {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  registerEmployee(event) {
    event.preventDefault();
    axios
      .post("/api/employeeSignup", this.state.employee)
      .then(response => {
        if (response.status === 200) {
          this.props.employeeRegisterSuccess(response.data.token);
          this.props.history.push(`/employee/${this.props.employee.id}`);
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
    if (this.props.employeeRegister) {
      id = styles.animation;
    }
    return (
      <div className={styles.registerFormContainer} id={id}>
        <p
          className={otherStyles.registerP}>
          Register as an Employee
        </p>
        <div
          onMouseEnter={this.showOptionals}
          onMouseLeave={this.hideOptionals}
          className={otherStyles.registerForm}
        >
          <form id={otherStyles.form} style={{justifyContent: 'space-around', height: '350px'}}>
            <div
              style={{ marginTop: "8px" }}
              className={otherStyles.divWidthControl}
            >
              <label
                className={otherStyles.labels}
              >
                First Name:
              </label>
              <input
                onBlur={this.setDirty}
                onChange={this.getEmployeeInput}
                value={this.state.employee.firstName}
                name="firstName"
                placeholder="First Name"
                id={otherStyles.input1}
                className={otherStyles.inputs}
                type="text"
              />
              {this.state.dirty.firstName === true &&
                this.state.employee.firstName === "" && (
                  <Alert alertPhrase={"Field cannot be blank"} />
                )}
            </div>
            <div className={otherStyles.divWidthControl}>
              <label
                style={{letterSpacing: "0.3px" }}
                className={otherStyles.labels}
              >
                Last Name:
              </label>
              <input
  
                onBlur={this.setDirty}
                onChange={this.getEmployeeInput}
                value={this.state.employee.lastName}
                name="lastName"
                placeholder="Last Name"
                id={otherStyles.input1}
                className={otherStyles.inputs}
                type="text"
              />
              {this.state.dirty.lastName === true &&
                this.state.employee.lastName === "" && (
                  <Alert alertPhrase={"Field cannot be blank"} />
                )}
            </div>

            <div className={otherStyles.divWidthControl}>
              <label
                style={{letterSpacing: "0.3px" }}
                className={otherStyles.labels}
              >
                Email Address:
              </label>
              <input
                
                onBlur={this.setDirty}
                onChange={this.getEmployeeInput}
                value={this.state.employee.email}
                name="email"
                placeholder="Email Address"
                id={otherStyles.input2}
                className={otherStyles.inputs}
                type="text"
              />
              {this.validateEmail(this.state.employee.email) === false &&
                this.state.dirty.email === true && (
                  <Alert alertPhrase={"Please enter a valid email"} />
                )}
            </div>

            

            <div className={otherStyles.divWidthControl}>
              <label
                style={{letterSpacing: "1.0px" }}
                className={otherStyles.labels}
              >
                Create Password:
              </label>
              <input
                onKeyDown={this.setDirty}
                onChange={this.getEmployeeInput}
                value={this.state.employee.createPassword}
                name="createPassword"
                placeholder="Create Password"
                id={otherStyles.ml4}
                className={otherStyles.inputs}
                type="password"
              />
              {this.state.dirty.createPassword === true &&
                this.state.employee.createPassword.length < 8 && (
                  <Alert
                    alertPhrase={"Password must be eight characters long"}
                  />
                )}
            </div>
            <div className={otherStyles.divWidthControl}>
              <label
              style={{letterSpacing: '0.25px'}}
                className={otherStyles.labels}
              >
                Password Confirm:
              </label>
              <input
                onKeyDown={this.setDirty}
                onChange={this.getEmployeeInput}
                value={this.state.employee.passwordConfirm}
                name="passwordConfirm"
                placeholder="Password Confirm"
                id={otherStyles.ml8}
                className={otherStyles.inputs}
                type="password"
              />
              {this.state.dirty.passwordConfirm === true &&
                this.state.employee.passwordConfirm !==
                  this.state.employee.createPassword && (
                  <Alert alertPhrase={"Passwords must be matching"} />
                )}
            </div>
            <div className={otherStyles.divWidthControl}>
              <label
                className={otherStyles.labels}
              >
                Current Profession:
              </label>
              <input 
                onKeyDown={this.setDirty}
                onChange={this.getEmployeeInput}
                value={this.state.employee.profession}
                name="profession"
                placeholder="(Server, Waxer, Barber, etc)"
                id={otherStyles.ml8}
                className={otherStyles.inputs}
              />
              {this.state.dirty.profession === true &&
                this.state.employee.profession === "" && (
                  <Alert alertPhrase={"This field is required"} />
                )}
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <p
                id={styles.headBack}
                onClick={this.props.employeeRegisterHandler}
              >
                Go back to user signup form
              </p>
              <button
                style={{backgroundColor: "transparent" }}
                onClick={this.registerEmployee}
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
    employee: state.authReducer.employee,
    employeeRegister: state.booleanReducers.employeeRegister
  };
};

const mapDispatchToProps = dispatch => {
  return {
    employeeRegisterSuccess: employeeToken =>
      dispatch({
        type: EMPLOYEE_REGISTER_SUCCESS,
        payload: { employeeToken }
      }),
    employeeRegisterHandler: () =>
      dispatch({ type: EMPLOYEE_WANTS_TO_REGISTER })
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EmployeeRegisterForm)
);
