import React, { useState } from "react";
import styles from "../../Notifications.module.css";
import Axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import OtherAlert from "../../../OtherAlerts/OtherAlerts";
import { INSTRUCTOR_LOGIN_SUCCESS } from "../../../actions/actions";

const ClubAddedInstructorNotification = props => {
  const [clubAccepted, setClubAccepted] = useState(false);
  const [clubNameState, setClubNameState] = useState("");
  function getClubName() {
    const clubNameArray = [];
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
      clubNameArray.push(newArray[z]);
    }
    clubNameArray.shift();
    let clubName = clubNameArray.join("");
    setClubNameState(clubName);
  }

  function accept() {
    getClubName();
    console.log(clubNameState);
    const objectToSend = {
      clubId: props.notification.notificationFromTennisClub,
      clubName: clubNameState,
      instructorId: props.instructor.instructor.id,
      notificationId: props.notification._id,
      instructorName: props.instructor.instructor.instructorName
    };
    setClubAccepted(true);
    Axios.post("/api/notifications/instructorclickedyes", objectToSend).then(
      response => {
        console.log(response);
        console.log(response.data.token);
        if ((response.status = 200)) {
          props.setNew(response.data.newNotifications)();
        }
        if (response.data.token) {
          props.instructorTokenChange(response.data.token);
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
      {!props.notification.answer && !clubAccepted && (
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
      {(props.notification.answer === "Accepted" || clubAccepted) && (
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
            ? `You have joined ${clubNameState} as an instructor.`
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
      dispatch({ type: INSTRUCTOR_LOGIN_SUCCESS, payload: { instructorToken } })
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ClubAddedInstructorNotification)
);
