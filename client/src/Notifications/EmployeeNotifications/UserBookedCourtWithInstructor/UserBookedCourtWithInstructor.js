import React from "react";
import styles from "../../Notifications.module.css";

const UserBookedCourtWithInstructor = props => {
  return (
    <div
      className={styles.notificationContainer}
      style={{ borderBottom: "2px solid black" }}
    >
      <p style={{ fontSize: "14px" }}>
        {props.notification.notificationMessage}
      </p>
    </div>
  );
};

export default UserBookedCourtWithInstructor;
