import React from 'react';
import DropDownLink from '../DropDownLink/DropDownLink';
import {SHOW_NOTIFICATIONS, EMPLOYEE_LOGOUT} from '../../../../actions/actions'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Axios from 'axios';

const EmployeeDropDown = (props) => {

  function goToNotifications() {
    if (props.notiNum > 0 ) {
      Axios.post('/api/employeeNotificationsRead', {id: props.employeeProfile.employee.id})
    }
    props.clearNotis();
    props.showNotifications()
   }

  function goHome() {
    props.history.push(`/employee/${props.employeeProfile.employee.id}`)
  }

  function goToSettings() {
    props.history.push(`/employee/${props.employeeProfile.employee.id}/settings`)
  }

  function employeeLogout() {
    props.logoutEmployee()
    props.history.push('/')
  }

    return (
        <React.Fragment>
          <DropDownLink clickProp={goHome}>
            Home
          </DropDownLink>
          <DropDownLink clickProps={goToSettings}>
            Settings
          </DropDownLink>
          <DropDownLink notiNum={props.notiNum} clickProp={goToNotifications}>
            Notifications
          </DropDownLink>
          <DropDownLink clickProp={employeeLogout}>
            Logout
          </DropDownLink>
          </React.Fragment>
    )
}

const mapDispatchToProps = dispatch => {
  return {
    showNotifications: () => dispatch({type: SHOW_NOTIFICATIONS}),
    logoutEmployee: () => dispatch({type: EMPLOYEE_LOGOUT})
  }
}

export default withRouter(connect(null, mapDispatchToProps)(EmployeeDropDown));


/*
<div style={{ display: "flex" }}>
        
        {showDropDown && (
          <div id={styles.dropDownMenu}>
            <div className={styles.dropDownDiv}>
              <Link
                className={styles.dropDownItem}
                to={`/instructor/${instructorProfile.instructor._id}/createeditprofile`}
              >
                Edit Profile
              </Link>
            </div>
            <div
              style={{ cursor: "pointer" }}
              className={styles.dropDownDiv}
              onClick={props.showNotifications}
            >
              <p className={styles.dropDownItem}>
                {instructorProfile && newNotifications &&
                  newNotifications.length > 0 && (
                    <span
                      style={{
                        position: "relative",
                        left: "-6px",
                        padding: "0 5px",
                        boxShadow: "0px 0px 8px red",
                        color: "red",
                        borderRadius: "30px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        top: "-1px"
                      }}
                    >
                      {newNotifications.length}
                    </span>
                  )}
                Notifications
              </p>
            </div>
            <div
              style={{ borderBottom: "none" }}
              className={styles.dropDownDiv}
            >
              <Link
                className={styles.dropDownItem}
                onClick={props.instructorLogout}
                to="/"
              >
                Logout
              </Link>
            </div>
          </div>
        )}
      </div>

      */