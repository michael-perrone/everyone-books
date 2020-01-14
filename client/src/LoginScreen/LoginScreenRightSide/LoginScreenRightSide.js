import React from "react";
import UserRegisterForm from "./UserRegisterForm/UserRegisterForm";
import styles from "./LoginScreenRightSide.module.css";
import ClubSignUpButton from "./ClubSignUp/ClubSignUpButton";
import { connect } from "react-redux";
import EmployeeRegisterForm from "./InstructorRegisterForm/EmployeeRegisterForm";

class LoginScreenRightSide extends React.Component {
  render() {
    return (
      <div id={styles.rightSideContainer}>
        <UserRegisterForm />
        <EmployeeRegisterForm />
        {!this.props.employeeRegister && <ClubSignUpButton />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    alert: state.alert,
    employeeRegister: state.employeeRegister
  };
};

export default connect(mapStateToProps)(LoginScreenRightSide);
