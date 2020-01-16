import React from "react";
import styles from "./DropDown.module.css";
import { connect } from "react-redux";
import UserDropDown from "./UserDropDown/UserDropDown";
import EmployeeDropDown from "./EmployeeDropDown/EmployeeDropDown";
import AdminDropDown from "./AdminDropDown/AdminDropDown";

const DropDown = props => {
  console.log(props);
  return (
    <div
      className={styles.dropDownContainer}
      id={props.showDropDown ? styles.dropDownContainerAnimated : ""}
    >
      {props.user && <UserDropDown notiNum={props.notiNum} user={props.user} />}
      {props.admin && <AdminDropDown notiNum={props.notiNum} admin={props.admin}/>}
      {props.employee && (
        <EmployeeDropDown notiNum={props.notiNum} employeeProfile={props.employeeProfile} />
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    admin: state.authReducer.admin,
    employee: state.authReducer.employee,
    user: state.authReducer.user,
    showDropDown: state.booleanReducers.showDropDown
  };
};

export default connect(mapStateToProps)(DropDown);
