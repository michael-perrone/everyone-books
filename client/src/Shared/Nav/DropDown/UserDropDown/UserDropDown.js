import React from "react";
import styles from "../DropDown.module.css";
import DropDownLink from "../DropDownLink/DropDownLink";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { USER_LOGOUT, SHOW_NOTIFICATIONS } from "../../../../actions/actions";

const UserDropDown = props => {
  function goHome() {
    props.history.push(`/user/${props.user.user.id}`);
  }

  function userLogoutFunction() {
    props.userLogout();
    props.history.push("/");
  }

  function goToSettings() {
    props.history.push(`/settings`);
  }

  return (
    <React.Fragment>
      <DropDownLink clickProp={goHome}>Home</DropDownLink>
      <DropDownLink clickProp={goToSettings}>Settings</DropDownLink>
      <DropDownLink clickProp={props.showNotificationsFunction}>
        Notifications
      </DropDownLink>
      <DropDownLink clickProps={"dwd"}>Booking History</DropDownLink>
      <DropDownLink clickProp={userLogoutFunction}>Logout</DropDownLink>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    userLogout: () => dispatch({ type: USER_LOGOUT }),
    showNotificationsFunction: () => dispatch({ type: SHOW_NOTIFICATIONS })
  };
};

export default withRouter(connect(null, mapDispatchToProps)(UserDropDown));
