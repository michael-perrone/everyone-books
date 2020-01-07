import React from "react";
import styles from "./DropDown.module.css";
import { connect } from "react-redux";
import UserDropDown from "./UserDropDown/UserDropDown";
import InstructorDropDown from "./InstructorDropDown/InstructorDropDown";
import AdminDropDown from "./AdminDropDown/AdminDropDown";

const DropDown = props => {
  console.log(props);
  return (
    <div
      className={styles.dropDownContainer}
      id={props.showDropDown ? styles.dropDownContainerAnimated : ""}
    >
      {props.user && <UserDropDown notiNum={props.notiNum} user={props.user} />}
      {props.admin && <AdminDropDown notiNum={props.notiNum} />}
      {props.instructor && (
        <InstructorDropDown notiNum={props.notiNum} instructorProfile={props.instructorProfile} />
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    admin: state.authReducer.admin,
    instructor: state.authReducer.instructor,
    user: state.authReducer.user,
    showDropDown: state.booleanReducers.showDropDown
  };
};

export default connect(mapStateToProps)(DropDown);
