import React from "react";
import styles from "../../Nav.module.css";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  SHOW_SCHEDULE,
  SHOW_NOTIFICATIONS,
  ADMIN_LOGOUT
} from "../../../../actions/actions";
import Schedule from "../../Schedule/Schedule";
import Notifications from "../../../../Notifications/Notifications";
import DropDown from "../../DropDown/DropDown";

const AdminSecondContainer = props => {
  return (
    <React.Fragment>
      <div id={styles.secondContainer}>
            <p
            style={{ cursor: "pointer" }}
            className={styles.links}
            >
            Schedule
            </p>
        <DropDown/>
      </div>
      {props.showScheduleState && <Schedule />}
      {props.showNotificationsState && (
        <Notifications/>
      )}
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
    showNotificationsState: state.booleanReducers.showNotifications
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminSecondContainer)
);
