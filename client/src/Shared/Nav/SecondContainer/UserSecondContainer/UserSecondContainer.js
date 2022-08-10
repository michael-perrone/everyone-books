import React from "react";
import styles from "../../Nav.module.css";
import axios from "axios";
import { connect } from "react-redux";
import DropDown from "../../DropDown/DropDown";
// import Notifications from "../../../../Notifications/Notifications";

import {withRouter} from 'react-router-dom';

const UserSecondContainer = props => {

  function viewClubs() {
    props.history.push('/businesslist')
  }


  return (
    <div id={styles.secondContainer}>
      <p onClick={viewClubs} className={styles.links}>View Businesses</p>
      {/* {newNotifications.length > 0 && !props.showDropDownState && <NotificationNumber user={true} num={newNotifications.length}/>} */}
      {/* {props.showNotifications && (
        <Notifications notifications={notifications} />
      )} */}
      <DropDown/>
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
