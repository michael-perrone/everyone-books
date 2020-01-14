import React from "react";
import styles from "./InstructorSignup.module.css";
import { connect } from "react-redux";
import { EMPLOYEE_WANTS_TO_REGISTER } from "../../../../actions/actions";

class InstuctorSignup extends React.Component {
  render() {
    return (
      <div id={styles.instructorSignupContainer}>
        <p
          onClick={this.props.employeeRegisterHandler}
          id={styles.instructorSignup}
        >
          {" "}
          OR register as employee here
        </p>
      </div>
    );
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    employeeRegisterHandler: () =>
      dispatch({ type: EMPLOYEE_WANTS_TO_REGISTER })
  };
};

export default connect(null, mapDispatchToProps)(InstuctorSignup);
