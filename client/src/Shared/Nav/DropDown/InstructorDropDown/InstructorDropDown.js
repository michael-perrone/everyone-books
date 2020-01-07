import React from 'react';
import DropDownLink from '../DropDownLink/DropDownLink';
import {SHOW_NOTIFICATIONS, INSTRUCTOR_LOGOUT} from '../../../../actions/actions'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

const InstructorDropDown = (props) => {
  function editProfile() {
    props.history.push(`/instructor/${props.instructorProfile.instructor._id}/createeditprofile`)
  }

  function goHome() {
    props.history.push(`/instructor/${props.instructorProfile.instructor._id}`)
  }

  function goToSettings() {
    props.history.push(`/instructor/${props.instructorProfile.instructor._id}/settings`)
  }

  function instructorLogout() {
    props.logoutInstructor()
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
          <DropDownLink clickProp={editProfile}>
            Edit Profile
          </DropDownLink>
          <DropDownLink notiNum={props.notiNum} clickProp={props.showNotifications}>
            Notifications
          </DropDownLink>
          <DropDownLink clickProp={instructorLogout}>
            Logout
          </DropDownLink>
          </React.Fragment>
    )
}

const mapDispatchToProps = dispatch => {
  return {
    showNotifications: () => dispatch({type: SHOW_NOTIFICATIONS}),
    logoutInstructor: () => dispatch({type: INSTRUCTOR_LOGOUT})
  }
}

export default withRouter(connect(null, mapDispatchToProps)(InstructorDropDown));


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