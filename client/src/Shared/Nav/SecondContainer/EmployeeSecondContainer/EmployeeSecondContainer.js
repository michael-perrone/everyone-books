import React from "react";
import styles from "../../Nav.module.css";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  EMPLOYEE_LOGOUT,
  SHOW_NOTIFICATIONS
} from "../../../../actions/actions";
import Schedule from "../../Schedule/Schedule";
import axios from "axios";
// import Notifications from "../../../../Notifications/Notifications";
import DropDown from "../../DropDown/DropDown";
// import NotificationNumber from "../NotificationNumber/NotificationNumber";


const EmployeeSecondContainer = props => {
  const [employeeProfile, setEmployeeProfile] = React.useState(undefined);
  const [notifications, setNotifications] = React.useState([]);
  const [newNotificationsState, setNewNotificationsState] = React.useState([]);
  const [businessName, setBusinessName] = React.useState('None');
  const [businessWorkingAt, setBusinessWorkingAt] = React.useState('')

  function setNewNotifications(notificationsFromUpdate) {
    return () => {
      setNotifications(notificationsFromUpdate);
      setNewNotifications([]);
    };
  }

  function clearNotis() {
    setNewNotificationsState([])
  }

   React.useEffect(() => {
    axios.get('/api/getEmployee', {headers: {'x-auth-token': props.employeeToken}}).then(
      response => {
        let apple = response.data.employee.business;
        setBusinessWorkingAt(response.data.employee.businessWorkingAt)
      if (props.employee.employee.businessName && apple === props.employee.employee.businessName) {
        setBusinessName(props.employee.employee.businessName)
      }
  })
}, [props.employeeToken] )

  // React.useEffect(() => {
  //   axios
  //     .get("/api/notifications/employeenotifications", {
  //       headers: { "x-auth-token": props.employeeToken }
  //     })
  //     .then(response => {
  //       let newNotifications = [];
  //       setNotifications(response.data.notifications);
  //       if (response.data.notifications) {
  //         for (let i = 0; i < response.data.notifications.length; i++) {
  //           if (response.data.notifications[i].notificationRead === false) {
  //             newNotifications.push(response.data.notifications[i]);
  //           }
  //         }
  //       }
  //       setNewNotificationsState(newNotifications);
  //     });
  // }, []);

  

  return (
    <React.Fragment>
      <div id={styles.secondContainer}>        
      
        <Link
          className={styles.links}
          to={`/employee/${props.employee.employee.id}/notifications`}
          >
          Notifications
        </Link>
          {/* {newNotificationsState.length > 0 && !props.showDropDownState && <NotificationNumber num={newNotificationsState.length}/>} */}
        <DropDown clearNotis={clearNotis} notiNum={newNotificationsState.length} employeeProfile={employeeProfile} />
      </div>
      {props.showScheduleState && <Schedule employee={props} />}
      {/* {props.showNotificationsState && (
        <Notifications
          setNew={setNewNotifications}
          employeeNotifications={notifications}
        />
      )} */}
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
    showNotificationsState: state.booleanReducers.showNotifications,
    employee: state.authReducer.employee
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EmployeeSecondContainer)
);
