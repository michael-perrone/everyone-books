import React from "react";
import styles from "../DropDown.module.css";
import DropDownLink from "../DropDownLink/DropDownLink";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { USER_LOGOUT, SHOW_NOTIFICATIONS, HIDE_DROP_DOWN } from "../../../../actions/actions";

const UserDropDown = props => {
  function goHome() {
    props.history.push(`/user/${props.user.user.id}`);
    props.hideDropDown()
  }

  function userLogoutFunction() {
    props.userLogout();
    props.history.push("/");
    props.hideDropDown()
  }

  function goToSettings() {
    props.history.push(`/settings`);
  }



  function goToBusinessFinder() {
    props.history.push(`/businessList`);
    props.hideDropDown();
  }
  

  function goToServiceFinder() {
    props.history.push(`/user/serviceFinder`);
    props.hideDropDown();
  }

  return (
    <React.Fragment>
      <DropDownLink clickProp={goHome}>Home</DropDownLink>
      <DropDownLink clickProp={goToSettings}>Settings</DropDownLink>
      <DropDownLink clickProp={goToBusinessFinder}>
        Business Finder
      </DropDownLink>
      <DropDownLink clickProp={goToServiceFinder}>Service Finder</DropDownLink>
      <DropDownLink clickProp={userLogoutFunction}>Logout</DropDownLink>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    userLogout: () => dispatch({ type: USER_LOGOUT }),
    showNotificationsFunction: () => dispatch({ type: SHOW_NOTIFICATIONS }),
    hideDropDown: () => dispatch({type: HIDE_DROP_DOWN})
  };
};

export default withRouter(connect(null, mapDispatchToProps)(UserDropDown));
