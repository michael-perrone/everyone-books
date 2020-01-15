import React from "react";
import styles from "../../Nav.module.css";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  SHOW_SCHEDULE,
  INSTRUCTOR_LOGOUT,
  SHOW_NOTIFICATIONS
} from "../../../../actions/actions";
import Schedule from "../../Schedule/Schedule";
import axios from "axios";
import Notifications from "../../../../Notifications/Notifications";
import DropDown from "../../DropDown/DropDown";
import NotificationNumber from "../NotificationNumber/NotificationNumber";

const AdminSecondContainer = props => {
  return (
    <React.Fragment>
      <div id={styles.secondContainer}>
            <p
            onClick={props.showSchedule}
            style={{ cursor: "pointer", marginRight: "30px" }}
            className={styles.links}
            >
            Schedule
            </p>
            <Link
              style={{ marginRight: "30px" }}
              className={styles.links}
              to={'/dwdwd'}
            >
              Home
            </Link> 
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
    instructorLogout: () => dispatch({ type: INSTRUCTOR_LOGOUT }),
    showSchedule: () => dispatch({ type: SHOW_SCHEDULE }),
    showNotifications: () => dispatch({ type: SHOW_NOTIFICATIONS })
  };
};

const mapStateToProps = state => {
  return {
    showDropDownState: state.booleanReducers.showDropDown,
    showScheduleState: state.booleanReducers.showSchedule,
    instructorToken: state.authReducer.instructorToken,
    showNotificationsState: state.booleanReducers.showNotifications
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminSecondContainer)
);
