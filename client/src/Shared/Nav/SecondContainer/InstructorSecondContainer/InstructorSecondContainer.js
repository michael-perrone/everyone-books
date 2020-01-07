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

const InstructorSecondContainer = props => {
  const [instructorProfile, setInstructorProfile] = React.useState(undefined);

  const [notifications, setNotifications] = React.useState([]);
  const [newNotifications, setNewNotificationsState] = React.useState([]);
  console.log(newNotifications)

  console.log(props);
  let newVar = "";
  if (instructorProfile && instructorProfile.instructor) {
    newVar = `/clubs/${instructorProfile.instructor.tennisClub
      .split(" ")
      .reduce((accum, element) => accum + element)}`;
  }

  function setNewNotifications(notificationsFromUpdate) {
    return () => {
      setNotifications(notificationsFromUpdate);
      setNewNotifications([]);
    };
  }

  React.useEffect(() => {
    axios
      .get("/api/instructorProfile/myprofile", {
        headers: {
          "x-auth-token": props.instructorToken
        }
      })
      .then(response => {
        setInstructorProfile(response.data.instructorProfile);
      });
    axios
      .get("/api/notifications/instructornotifications", {
        headers: { "x-auth-token": props.instructorToken }
      })
      .then(response => {
        let newNotifications = [];
        setNotifications(response.data.notifications);
        if (response.data.notifications) {
          for (let i = 0; i < response.data.notifications.length; i++) {
            if (response.data.notifications[i].notificationRead === false) {
              newNotifications.push(response.data.notifications[i]);
            }
          }
        }
        setNewNotificationsState(newNotifications);
      });
  }, []);

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
        {props.newVar !== "" &&
          instructorProfile &&
          instructorProfile.instructor.clubAccepted === true && (
            <Link
              style={{ marginRight: "30px" }}
              className={styles.links}
              to={newVar}
            >
              My Club
            </Link>
          )}
          {newNotifications.length > 0 && !props.showDropDownState && <NotificationNumber num={newNotifications.length}/>}
        <DropDown notiNum={newNotifications.length} instructorProfile={instructorProfile} />
      </div>
      {props.showScheduleState && <Schedule instructor={props} />}
      {props.showNotificationsState && (
        <Notifications
          setNew={setNewNotifications}
          instructorNotifications={notifications}
        />
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
  connect(mapStateToProps, mapDispatchToProps)(InstructorSecondContainer)
);
