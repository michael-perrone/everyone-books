import React, { useState, useEffect } from "react";
import styles from "./InstructorProfile.module.css";
import BioJobExpHolder from "./BioCertsJobExpHolder/BioJobExpHolder";
import CertHolder from "./CertHolder/CertHolder";
import otherstyles from "./BioCertsJobExpHolder/BioCertsJobExp.module.css";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const InstructorProfile = props => {
  const [instructorsBookings, setInstructorsBookings] = useState([]);
  console.log(props.instructorToken);

  function pushToClubName(clubName) {
    return () => {
      if (clubName !== "No Current Club") {
        let clubNameArray = clubName.split(" ");
        let realClubName = clubNameArray.join("");
        props.history.push(`/clubs/${realClubName}`);
      }
    };
  }

  useEffect(() => {
    if (props.instructor) {
      axios
        .get("/api/iBookings/instructor", {
          headers: { "x-auth-token": props.instructorToken }
        })
        .then(response => {
          if (response.status === 200) {
            setInstructorsBookings(response.data.instructorsBookings);
          }
        });
    }
  }, []);

  return (
    <div id={styles.instructorProfileContainer}>
      {props.instructorProfile && (
        <React.Fragment>
          <div id={styles.instructorProfileLeftBar}>
            <div id={styles.imageNameDiv}>
              <div id={styles.imageContainer}>
                <img
                  id={styles.image}
                  src="https://www.njherald.com/storyimage/TH/20150621/NEWS/909015080/AR/0/AR-909015080.jpg"
                  alt="person"
                />
              </div>
              <div style={{ display: "flex" }}>
                <p id={styles.instructorName}>
                  {props.instructorProfile.instructor.firstName}{" "}
                  {props.instructorProfile.instructor.lastName}
                </p>
                {props.instructorProfile.instructor.clubAccepted === true && (
                  <i
                    style={{
                      fontSize: "16px",
                      marginLeft: "7px",
                      position: "relative",
                      top: "20px"
                    }}
                    className="fas fa-user-check"
                  ></i>
                )}
              </div>
            </div>
            <div id={styles.bottomPartBar}>
              <p
                style={{
                  fontSize: "16px",
                  textDecoration:
                    props.instructorProfile.instructor.tennisClub ===
                    "No Current Club"
                      ? ""
                      : "underline",
                  cursor:
                    props.instructorProfile.instructor.tennisClub ===
                    "No Current Club"
                      ? ""
                      : "pointer"
                }}
                onClick={pushToClubName(
                  props.instructorProfile.instructor.tennisClub
                )}
                className={styles.pTagsInBottomBar}
              >
                {props.instructorProfile.instructor.tennisClub}
              </p>
              <p className={styles.pTagsInBottomBar}>
                Located In {props.instructorProfile.location}
              </p>
              <p className={styles.pTagsInBottomBar}>
                {props.instructorProfile.yearsTeaching} Years Teaching
              </p>
              <p className={styles.pTagsInBottomBar}>Lesson Rate:</p>
              <p style={{ marginTop: "5px" }}>
                {props.instructorProfile.lessonRate} Dollars Per Hour
              </p>
            </div>
          </div>
          <div id={styles.profileContentHolder}>
            <BioJobExpHolder profile={props.instructorProfile} />
            <div className={otherstyles.row}>
              <div className={otherstyles.contentHolder}>
                {(props.user || props.admin) && (
                  <React.Fragment>
                    <p className={otherstyles.pTagHeader}>
                      Bookings with Instructor
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        fontSize: "14px"
                      }}
                    >
                      <div
                        style={{
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
                          Booking Type
                        </p>
                        {props.bookings &&
                          props.bookings.map((booking, index) => {
                            if (index < 9) {
                              return (
                                <p style={{ marginTop: "3px" }}>
                                  {booking.bookingType}
                                </p>
                              );
                            }
                          })}
                      </div>
                      <div
                        style={{
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
                          Starts At
                        </p>
                        {props.bookings &&
                          props.bookings.map((booking, index) => {
                            if (index < 9) {
                              return (
                                <p style={{ marginTop: "3px" }}>
                                  {booking.timeStart}
                                </p>
                              );
                            }
                          })}
                      </div>
                      <div
                        style={{
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
                        {props.bookings &&
                          props.bookings.map((booking, index) => {
                            if (index < 9) {
                              return (
                                <p style={{ marginTop: "3px" }}>
                                  {booking.courtIds[0].split("")[0]}
                                </p>
                              );
                            }
                          })}
                      </div>
                    </div>
                  </React.Fragment>
                )}
                {props.instructor && (
                  <p className={otherstyles.pTagHeader}>Today's Schedule</p>
                )}
                {props.instructor && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      fontSize: "14px"
                    }}
                  >
                    <div
                      style={{
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
                        Booking Type
                      </p>
                      {instructorsBookings.map((booking, index) => {
                        if (index < 9) {
                          return (
                            <p style={{ marginTop: "3px" }}>
                              {booking.bookingType}
                            </p>
                          );
                        }
                      })}
                    </div>
                    <div
                      style={{
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
                        Starts At
                      </p>
                      {instructorsBookings.map((booking, index) => {
                        if (index < 9) {
                          return (
                            <p style={{ marginTop: "3px" }}>
                              {booking.timeStart}
                            </p>
                          );
                        }
                      })}
                    </div>
                    <div
                      style={{
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
                            <p style={{ marginTop: "3px" }}>
                              {booking.courtIds[0].split("")[0]}
                            </p>
                          );
                        }
                      })}
                    </div>
                  </div>
                )}

                {props.user && props.admin && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      marginTop: "6px"
                    }}
                  >
                    <div>
                      <p
                        style={{
                          textDecoration: "underline",
                          textAlign: "center"
                        }}
                      >
                        Booking Type
                      </p>
                      {props.bookings &&
                        props.bookings.map((element, index) => {
                          if (index < 8) {
                            return (
                              <p style={{ marginTop: "3px" }}>
                                {element.bookingType}
                              </p>
                            );
                          }
                        })}
                    </div>
                    <div>
                      <p
                        style={{
                          textDecoration: "underline",
                          textAlign: "center"
                        }}
                      >
                        Date
                      </p>
                      {props.bookings &&
                        props.bookings.map((element, index) => {
                          if (index < 8) {
                            return (
                              <p style={{ marginTop: "3px" }}>
                                {element.date.split(" ").join("-")}
                              </p>
                            );
                          }
                        })}
                    </div>
                    <div>
                      <p
                        style={{
                          textDecoration: "underline",
                          textAlign: "center"
                        }}
                      >
                        Time
                      </p>
                      {props.bookings &&
                        props.bookings.map((element, index) => {
                          if (index < 8) {
                            return (
                              <p style={{ marginTop: "3px" }}>
                                {element.timeStart}
                              </p>
                            );
                          }
                        })}
                    </div>
                  </div>
                )}
              </div>
              <CertHolder profile={props.instructorProfile} />
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    admin: state.authReducer.admin,
    instructor: state.authReducer.instructor,
    instructorToken: state.authReducer.instructorToken
  };
};

export default withRouter(connect(mapStateToProps)(InstructorProfile));
