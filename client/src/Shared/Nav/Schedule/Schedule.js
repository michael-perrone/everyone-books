import React from "react";
import { connect } from "react-redux";
import styles from "../../../Notifications/Notifications.module.css";
import { HIDE_SCHEDULE } from "../../../actions/actions";
import axios from "axios";

const Schedule = props => {
  const [instructorsBookings, setInstructorBookings] = React.useState([]);

  function getBookings(event) {
    axios
      .post("/api/iBookings/schedule", {
        date: event.target.value,
        instructorId: props.instructor.instructor.id
      })
      .then(response => {
        if (response.status === 200) {
          setInstructorBookings(response.data.bookings);
        }
      });
  }

  return (
    <React.Fragment>
      <div onClick={props.hideSchedule} id={styles.backDrop}></div>
      <div
        style={{
          backgroundColor: "rgba(167, 245, 167)",
          top: "25px",
          height: "550px",
          border: "none"
        }}
        className={styles.notificationsContainer}
      >
       <i
            class="far fa-window-close"
            onClick={props.hideSchedule}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "4px",
              fontSize: "28px",
              right: "10px"
            }}
          ></i>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <p
            style={{
              fontSize: "20px",
              fontFamily: "sans",
              marginRight: "10px"
            }}
          >
            Choose Date:
          </p>
          <input
            onChange={getBookings}
            style={{ height: "22px" }}
            type="date"
          />
        </div>
        <div
          style={{
            height: "89%",
            width: "100%",
            backgroundColor: "rgb(248, 248, 248)",

            marginTop: "10px"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              fontSize: "14px"
            }}
          >
            <div
              style={{
                marginLeft: "-4px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start"
              }}
            >
              <p
                style={{
                  marginTop: "5px",
                  textDecoration: "underline"
                }}
              >
                Booking Type
              </p>
              {instructorsBookings.map((booking, index) => {
                if (index < 9) {
                  return (
                    <p style={{ marginTop: "8px" }}>{booking.bookingType}</p>
                  );
                }
              })}
            </div>
            <div
              style={{
                marginLeft: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start"
              }}
            >
              <p
                style={{
                  marginTop: "5px",
                  marginLeft: "42px",
                  textDecoration: "underline"
                }}
              >
                Time
              </p>
              {instructorsBookings.map((booking, index) => {
                if (index < 9) {
                  return (
                    <p style={{ marginTop: "8px" }}>
                      {booking.timeStart}-{booking.timeEnd}
                    </p>
                  );
                }
              })}
            </div>
            <div
              style={{
                marginLeft: "8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <p
                style={{
                  marginTop: "5px",
                  textDecoration: "underline"
                }}
              >
                Court
              </p>
              {instructorsBookings.map((booking, index) => {
                if (index < 9) {
                  return (
                    <p style={{ marginTop: "8px" }}>
                      {booking.courtIds[0].split("")[0]}
                    </p>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    instructor: state.authReducer.instructor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hideSchedule: () => dispatch({ type: HIDE_SCHEDULE })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
