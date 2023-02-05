import React from "react";
import styles from "./DropDown.module.css";
import { connect } from "react-redux";
import UserDropDown from "./UserDropDown/UserDropDown";
import EmployeeDropDown from "./EmployeeDropDown/EmployeeDropDown";
import AdminDropDown from "./AdminDropDown/AdminDropDown";

const DropDown = props => {
  return (
    <div style={{zIndex: 2202020}}
      className={styles.dropDownContainer}
      id={props.showDropDown ? styles.dropDownContainerAnimated : ""}
    >
      {props.user && <UserDropDown notiNum={props.notiNum} user={props.user} />}
      {props.admin && <AdminDropDown notiNum={props.notiNum} admin={props.admin}/>}
      {props.employee && (
        <EmployeeDropDown clearNotis={props.clearNotis} notiNum={props.notiNum} employeeProfile={props.employee} />
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    adminToken: state.authReducer.adminToken,
    admin: state.authReducer.admin,
    employee: state.authReducer.employee,
    user: state.authReducer.user,
    showDropDown: state.booleanReducers.showDropDown
  };
};

export default connect(mapStateToProps)(DropDown);
