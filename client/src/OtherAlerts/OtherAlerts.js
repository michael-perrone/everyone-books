import React from "react";
import styles from "./OtherAlert.module.css";

const OtherAlert = props => {
  return (
    <div
      className={styles.otherAlertContainer}
      id={props.showAlert === true ? styles.otherAlertContainerAnimation : ""}
      style={{
        backgroundColor:
          props.alertType === "success" ? "lightgreen" : "#ff7070"
      }}
    >
      <p id={styles.alertMessage}>{props.alertMessage}</p>
    </div>
  );
};

export default OtherAlert;
