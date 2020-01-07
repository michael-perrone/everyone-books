import React from "react";

const InstructorAddeduser = props => {
  return (
    <div>
      <p style={{ padding: "14px" }}>
        {props.notification.notificationMessage}
      </p>
    </div>
  );
};

export default InstructorAddeduser;
