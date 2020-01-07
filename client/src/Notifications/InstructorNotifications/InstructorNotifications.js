import React from "react";
import styles from "../Notifications.module.css";
import axios from "axios";
import { connect } from "react-redux";
import UserBookedCourtWithInstructor from "./UserBookedCourtWithInstructor/UserBookedCourtWithInstructor";
import ClubAddedInstructorNotification from "./ClubAddedInstructorNotification/ClubAddedInstructorNotification";

class InstructorNotifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      notificationIds: []
    };
  }

  componentDidMount() {
    if (this.props.instructorNotifications) {
      let notificationIds = [];
      this.props.instructorNotifications.forEach(element => {
        if (element.notificationRead === false) {
          notificationIds.push(element._id);
        }
      });
      if (notificationIds.length > 0) {
        axios
          .post("/api/notifications/updateread", {
            notificationIds: notificationIds
          })
          .then(response => {
            // prob not correct
          });
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.props.instructorNotifications &&
          this.props.instructorNotifications.map(element => {
            console.log(element.notificationType);
            if (element.notificationType === "instructorBookedUser") {
              return <UserBookedCourtWithInstructor notification={element} />;
            }
            if (element.notificationType === "Club Added Instructor") {
              return (
                <ClubAddedInstructorNotification
                  setNew={this.props.setNew}
                  notification={element}
                />
              );
            }
          })}
        {this.props.instructorNotifications.length === 0 && (
          <p style={{ padding: "20px" }}>
            You do not have any notifications yet. When you get one, we will be
            sure to let you know!
          </p>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    instructorToken: state.authReducer.instructorToken
  };
};

export default connect(mapStateToProps)(InstructorNotifications);
