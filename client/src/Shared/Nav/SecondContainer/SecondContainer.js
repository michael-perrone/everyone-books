import React from "react";
import styles from "../Nav.module.css";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AdminSecondContainer from "./AdminSecondContainer/AdminSecondContainer";
import InstructorSecondContainer from "./InstructorSecondContainer/InstructorSecondContainer";
import UserSecondContainer from "./UserSecondContainer/UserSecondContainer";
import { SHOW_DROP_DOWN } from "../../../actions/actions";

const SecondContainer = props => {
  console.log(props.user)
  return (
    <div id={styles.secondContainerActually}>
      {props.admin && <AdminSecondContainer />}
      {props.instructor && <InstructorSecondContainer />}
      {props.user && <UserSecondContainer />}
      <i
      style={{right: props.user ? '-30px' : ""}}
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
    instructor: state.authReducer.instructor,
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
