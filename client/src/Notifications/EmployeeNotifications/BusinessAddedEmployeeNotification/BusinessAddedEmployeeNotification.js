import React, { useState } from "react";
import styles from "../../Notifications.module.css";
import Axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import OtherAlert from "../../../OtherAlerts/OtherAlerts";
import { EMPLOYEE_LOGIN_SUCCESS } from "../../../actions/actions";

const BusinessAddedEmployeeNotification = props => {
  const [businessAccepted, setBusinessAccepted] = useState(false);
  const [businessNameState, setBusinessNameState] = useState("");
  function getBusinessName() {
    const businessNameArray = [];
    let newArray = props.notification.notificationMessage.split("");
    let a;
    let b;
    let c;
    let d;
    let e;
    let f;
    for (let i = 0; i < newArray.length; i++) {
      a = i + 0;
      b = i + 1;
      c = i + 2;
      d = i + 3;
      e = i + 4;
      f = i + 5;
      if (newArray[a] === "b" && newArray[b] === "y" && newArray[c] === " ") {
        break;
      }
    }

    for (let x = d; x < newArray.length; x++) {
      d = x;
      e = x + 1;
      f = x + 2;
      if (newArray[d] === "." && newArray[e] === " " && newArray[f] === "I") {
        break;
      }
    }

    for (let z = c; z < d; z++) {
      c = z;
      businessNameArray.push(newArray[z]);
    }
    businessNameArray.shift();
    let businessName = businessNameArray.join("");
    setBusinessNameState(businessName);
  }

  function accept() {
    getBusinessName();
    const objectToSend = {
      businessId: props.notification.notificationFromBusiness,
      businessName: businessNameState,
      employeeId: props.employee.employee.id,
      notificationId: props.notification._id,
      employeeName: props.employee.employee.employeeName
    };
    setBusinessAccepted(true);
    Axios.post("/api/notifications/employeeclickedyes", objectToSend).then(
      response => {
        if ((response.status = 200)) {
          props.setNew(response.data.newNotifications)();
        }
        if (response.data.token) {
         // CHECK ON THIS props.instructorTokenChange(response.data.token);
        }
      }
    );
  }
  function deny() {
    // DONT KNOW YET
  }

  return (
    <div className={styles.notificationContainer}>
      <p
        style={{
          width: "80%",
          fontSize: "14px"
        }}
      >
        {props.notification.notificationMessage}
      </p>
      {!props.notification.answer && !businessAccepted && (
        <div
          style={{
            width: "120px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <button onClick={accept}>Accept</button>
          <button onClick={deny}>Deny</button>
        </div>
      )}
      {(props.notification.answer === "Accepted" || businessAccepted) && (
        <div
          style={{
            display: "flex",
            position: "relative",
            top: "20px",
            right: "5px",
            padding: "0px 2px",
            height: "20px",
            fontSize: "18px"
          }}
        >
          <i className="far fa-check-square"></i>
          <p
            style={{
              marginLeft: "4px",
              fontFamily: "sans",
              fontWeight: "bold",
              color: "black"
            }}
          >
            Accepted
          </p>
        </div>
      )}
      <OtherAlert
        showAlert={clubAccepted ? true : false}
        alertType={clubAccepted ? "success" : "no-success"}
        alertMessage={
          clubAccepted === true
            ? `You have joined ${businessNameState} as an employee.`
            : "You have denied this request."
        }
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    instructor: state.authReducer.instructor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    instructorTokenChange: instructorToken =>
      dispatch({ type: EMPLOYEE_LOGIN_SUCCESS, payload: { instructorToken } })
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BusinessAddedEmployeeNotification)
);
