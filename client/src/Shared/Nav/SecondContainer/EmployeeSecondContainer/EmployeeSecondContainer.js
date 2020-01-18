import React from "react";
import styles from "../../Nav.module.css";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  SHOW_SCHEDULE,
  EMPLOYEE_LOGOUT,
  SHOW_NOTIFICATIONS
} from "../../../../actions/actions";
import Schedule from "../../Schedule/Schedule";
import axios from "axios";
import Notifications from "../../../../Notifications/Notifications";
import DropDown from "../../DropDown/DropDown";
import NotificationNumber from "../NotificationNumber/NotificationNumber";


const EmployeeSecondContainer = props => {
  const [employeeProfile, setEmployeeProfile] = React.useState(undefined);
  const [notifications, setNotifications] = React.useState([]);
  const [newNotifications, setNewNotificationsState] = React.useState([]);
 
 /*  let newVar = "";
  if (employeeProfile && employeeProfile.employee && employeeProfile.employee.tennisClub) {
    newVar = `/clubs/${employeeProfile.employee.tennisClub
      .split(" ")
      .reduce((accum, element) => accum + element)}`;
  }
 */
  function setNewNotifications(notificationsFromUpdate) {
    return () => {
      setNotifications(notificationsFromUpdate);
      setNewNotifications([]);
    };
  }

  React.useEffect(() => {
    axios
      .get("/api/notifications/employeenotifications", {
        headers: { "x-auth-token": props.employeeToken }
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
            <Link
              style={{ marginRight: "30px" }}
              className={styles.links}
              to={"/business"}
            >
              Business
            </Link>
          {newNotifications.length > 0 && !props.showDropDownState && <NotificationNumber num={newNotifications.length}/>}
        <DropDown notiNum={newNotifications.length} employeeProfile={employeeProfile} />
      </div>
      {props.showScheduleState && <Schedule employee={props} />}
      {props.showNotificationsState && (
        <Notifications
          setNew={setNewNotifications}
          employeeNotifications={notifications}
        />
      )}
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    employeeLogout: () => dispatch({ type: EMPLOYEE_LOGOUT }),
    showNotifications: () => dispatch({ type: SHOW_NOTIFICATIONS })
  };
};

const mapStateToProps = state => {
  return {
    showDropDownState: state.booleanReducers.showDropDown,
    employeeToken: state.authReducer.employeeToken,
    showNotificationsState: state.booleanReducers.showNotifications
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EmployeeSecondContainer)
);
