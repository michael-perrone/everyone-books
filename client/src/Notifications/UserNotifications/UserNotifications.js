import React from "react";
import InstructorAddeduser from "./InstructorAddedUser/InstructorAddedUser";

const UserNotifications = props => {
  return props.userNotifications ? (
    props.userNotifications.map(notification => {
      if (notification.notificationType === "InstructorBookedUser") {
        return (
          <div style={{ height: "95px", borderBottom: "2px solid black" }}>
            <InstructorAddeduser notification={notification} />
          </div>
        );
      }
    })
  ) : (
    <div style={{ padding: "40px 40px" }}>
      <p style={{fontSize: '16px'}}>
      You do not have any notifications yet. When you get one, we will let you
      know!
      </p>
    </div>
  );
};
export default UserNotifications;
