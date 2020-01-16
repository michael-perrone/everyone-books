import React from "react";
import styles from "../Nav.module.css";
import { connect } from "react-redux";
import AdminSecondContainer from "./AdminSecondContainer/AdminSecondContainer";
import EmployeeSecondContainer from "./EmployeeSecondContainer/EmployeeSecondContainer";
import UserSecondContainer from "./UserSecondContainer/UserSecondContainer";
import { SHOW_DROP_DOWN } from "../../../actions/actions";

const SecondContainer = props => {
  return (
    <div id={styles.secondContainerActually}>
      {props.admin && <AdminSecondContainer />}
      {props.employee && <EmployeeSecondContainer />}
      {props.user && <UserSecondContainer />}
      <i
        id={props.instructor ? styles.instructorBars : styles.bars}
        onClick={props.showDropDown}
        style={{
          color: props.showDropDownState ? "white" : "black"
        }}
        className="fas fa-bars"
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    admin: state.authReducer.admin,
    employee: state.authReducer.employee,
    user: state.authReducer.user,
    showDropDownState: state.booleanReducers.showDropDown
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showDropDown: () => dispatch({ type: SHOW_DROP_DOWN })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SecondContainer);
