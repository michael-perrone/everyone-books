import React from "react";
import styles from "../../Nav.module.css";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  SHOW_SCHEDULE,
  SHOW_NOTIFICATIONS,
  ADMIN_LOGOUT,
  SHOW_CREATE_BOOKING
} from "../../../../actions/actions";
import DropDown from "../../DropDown/DropDown";
import Axios from "axios";

const AdminSecondContainer = props => {

  function goToEditBusiness() {
    props.history.push(`/admin/${props.admin.admin.id}/createeditprofile`)
  } 


  function goToAdminNotifications() {
    props.history.push(`/admin/${props.admin.admin.id}/notifications`)
   } 

  React.useEffect(function () {
    Axios.get("/api/")
  }, [])

  return (
    <React.Fragment>
      <div id={styles.secondContainer}>
            <p
            style={{ cursor: "pointer" }}
            className={styles.links}
            onClick={goToEditBusiness}
            >
            Edit Business
            </p>
            <p
            style={{ cursor: "pointer" }}
            className={styles.links}
            onClick={goToAdminNotifications}
            >
            Notifications
            </p>
        <DropDown/>
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    adminLogout: () => dispatch({ type: ADMIN_LOGOUT }),
    showNotifications: () => dispatch({ type: SHOW_NOTIFICATIONS })
  };
};

const mapStateToProps = state => {
  return {
    showDropDownState: state.booleanReducers.showDropDown,
    showNotificationsState: state.booleanReducers.showNotifications,
    admin: state.authReducer.admin
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminSecondContainer)
);
