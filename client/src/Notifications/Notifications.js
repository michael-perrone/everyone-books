import React from "react";
import { connect } from "react-redux";
import { HIDE_NOTIFICATIONS } from "../actions/actions";
import AdminNotifications from "./AdminNotifications/AdminNotifications";
import UserNotifications from "./UserNotifications/UserNotifications";
import InstructorNotifications from "./InstructorNotifications/InstructorNotifications";
import styles from "./Notifications.module.css";

class Notifications extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <div onClick={this.props.hideNotifications} id={styles.backDrop}>
        <div className={styles.notificationsContainer}>
        <p style={{fontSize: '28px', fontFamily: 'Josefin Sans'}}>Notifications</p>
          <i
            class="far fa-window-close"
            onClick={this.props.hideNotifications}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "4px",
              fontSize: "28px",
              right: "10px"
            }}
          ></i>
          <div id={styles.notiSubContainer}>
          {this.props.admin && <AdminNotifications />}
          {this.props.instructor && (
            <InstructorNotifications
              setNew={this.props.setNew}
              instructorNotifications={this.props.instructorNotifications}
            />
          )}
          {this.props.user && (
            <UserNotifications
              userNotifications={this.props.userNotifications}
            />
          )}
        </div>
        </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    admin: state.authReducer.admin,
    instructor: state.authReducer.instructor,
    user: state.authReducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hideNotifications: () => dispatch({ type: HIDE_NOTIFICATIONS })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
