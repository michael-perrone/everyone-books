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
import Notifications from "../../../../Notifications/Notifications";
import DropDown from "../../DropDown/DropDown";

const AdminSecondContainer = props => {

  // function goToBusinessSchedule() {
  //   props.history.push(`/admin/${props.businessId}/businessSchedule`)
  // }

  

  return (
    <React.Fragment>
      <div id={styles.secondContainer}>
            <p
            style={{ cursor: "pointer" }}
            className={styles.links}
            onClick={() => props.setShowCreateBooking()}
            >
            Add Booking
            </p>
        <DropDown/>
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    adminLogout: () => dispatch({ type: ADMIN_LOGOUT }),
    showNotifications: () => dispatch({ type: SHOW_NOTIFICATIONS }),
    setShowCreateBooking: () => dispatch({type: SHOW_CREATE_BOOKING})
  };
};

const mapStateToProps = state => {
  return {
    showDropDownState: state.booleanReducers.showDropDown,
    showNotificationsState: state.booleanReducers.showNotifications,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminSecondContainer)
);
