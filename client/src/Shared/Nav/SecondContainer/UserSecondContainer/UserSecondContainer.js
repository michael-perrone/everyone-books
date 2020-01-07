import React from "react";
import styles from "../../Nav.module.css";
import axios from "axios";
import { connect } from "react-redux";
import DropDown from "../../DropDown/DropDown";
import Notifications from "../../../../Notifications/Notifications";
import NotificationNumber from "../NotificationNumber/NotificationNumber";
import {withRouter} from 'react-router-dom';

const UserSecondContainer = props => {
  const [notifications, setNotifications] = React.useState([]);
  const [newNotifications, setNewNotifications] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("/api/notifications/user", {
        headers: { "x-auth-token": props.token }
      })
      .then(response => {
        if (response.data.userNotifications) {
        setNotifications(response.data.userNotifications);
        let newNotificationsArray = [];
        for (let i = 0; i < response.data.userNotifications.length; i++) {
          if (response.data.userNotifications[i].notificationRead === false) {
            newNotificationsArray.push(1)
          }
        }
        }
      })
      .catch(error => {
        console.log("thhere was an error");
      });
  }, []);

  function viewClubs() {
    props.history.push('/clubs')
  }

  console.log(notifications)

  return (
    <div id={styles.secondContainer}>
      <p onClick={viewClubs} className={styles.links}>View Clubs</p>
      {newNotifications.length > 0 && !props.showDropDownState && <NotificationNumber user={true} num={newNotifications.length}/>}
      {props.showNotifications && (
        <Notifications notifications={notifications} />
      )}
      <DropDown notiNum={newNotifications.length}/>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    showDropDownState: state.booleanReducers.showDropDown,
    token: state.authReducer.token,
    showNotifications: state.booleanReducers.showNotifications
  };
};

export default withRouter(connect(mapStateToProps)(UserSecondContainer));
