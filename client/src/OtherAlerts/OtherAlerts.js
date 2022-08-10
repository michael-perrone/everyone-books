import React from "react";
import styles from "./OtherAlert.module.css";

const OtherAlert = props => {
  return (
    <div
      className={styles.otherAlertContainer}
      id={props.showAlert === true ? styles.otherAlertContainerAnimation : ""}
      style={{zIndex: 50000000,
        backgroundColor:
          props.alertType === "success" ? "lightgreen" : "salmon",
          width: props.alertMessage.length > 40 ? "300px" : ""
      }}
    >
      <p id={styles.alertMessage}>{props.alertMessage}</p>
    </div>
  );
};

export default OtherAlert;
