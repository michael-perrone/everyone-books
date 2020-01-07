import React from "react";
import styles from "./TennisClubInList.module.css";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import OtherAlert from "../../OtherAlerts/OtherAlerts";

class TennisClub extends React.Component {
  constructor(props) {
    super(props);
    this.state = { instructorsAtClub: [], errorArray: [], subscribeHit: false };
    this.subscribeToClub = this.subscribeToClub.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.profileInfo &&
      this.props.profileInfo.instructorsWhoAccepted.length > 0 &&
      prevState.instructorsAtClub &&
      prevState.instructorsAtClub.length === 0
    ) {
      let instructorObject = {};
      if (this.props.profileInfo) {
        instructorObject = {
          instructors: this.props.profileInfo.instructorsWhoAccepted
        };
      }
      Axios.post("/api/getinstructors", instructorObject)
        .then(response => {
          this.setState({
            instructorsAtClub: response.data.instructorsComingBack
          });
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }
  removeSpaces = item => {
    const newString = item.split(" ").reduce((accum, element) => {
      return (accum += element);
    });
    return newString;
  };

  subscribeToClub(tennisClubId) {
    return () => {
      const objectToSend = {
        tennisClubId,
        userId: this.props.user.user.id
      };
      Axios.post("/api/userSubscribe", objectToSend)
        .then(response => {
          if (response.status === 200) {
            this.setState({ subscribeHit: true });
          }
        })
        .catch(error => {
          const emptyArray = [];
          this.setState({ errorArray: emptyArray });
          const comingError = error.response.data.error;
          let newError = {
            alertType: "failure",
            showAlert: comingError !== "" ? true : false,
            alertMessage: comingError
          };
          const newErrorArray = [];
          newErrorArray.push(newError);
          this.setState({ errorArray: newErrorArray });
        });
    };
  }

  render() {
    return this.props.club ? (
      <div id={styles.tennisClubHolder}>
        {this.state.errorArray.map(element => {
          return (
            <OtherAlert
              alertType={element.alertType}
              showAlert={element.showAlert}
              alertMessage={element.alertMessage}
            />
          );
        })}
        <div id={styles.clubName}>
          <p>{this.props.club.clubName}</p>
        </div>
        <div id={styles.tennisClubSubHolder}>
          <div id={styles.clubHolder}>
            <div id={styles.imageHolder}>
              <img
                id={styles.clubImage}
                src="http://www.ludlowtennisclub.com/images/480_IMG_0930S.JPG"
                alt="club"
              />
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-around"
                }}
              >
                <button
                  className={styles.viewButton}
                  onClick={() =>
                    this.props.push(
                      `/clubs/${this.removeSpaces(this.props.club.clubName)}`
                    )
                  }
                >
                  <i
                    style={{
                      paddingRight: "4px",
                      fontSize: "14px",
                      borderRight: "1px solid black",
                      marginRight: "8px"
                    }}
                    className="fas fa-building"
                  />{" "}
                  View Club
                </button>
                {!this.state.subscribeHit && (
                  <button
                    onClick={this.subscribeToClub(this.props.club._id)}
                    style={{ left: "78%", cursor: "pointer" }}
                    className={styles.viewButton}
                  >
                    <i
                      style={{
                        marginLeft: "-3px",
                        paddingRight: "4px",
                        fontSize: "14px",
                        borderRight: "1px solid black",
                        marginRight: "8px"
                      }}
                      className="far fa-check-square"
                    />
                    Follow
                  </button>
                )}

                {this.state.subscribeHit && (
                  <div
                    style={{
                      height: "22px",
                      width: "80px",
                      backgroundColor: "lightgreen",
                      border: "1px solid black",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <p>Subcribed!</p>
                  </div>
                )}
              </div>
            </div>

            <div style={{ fontSize: "12px" }}>
              <div
                id={styles.increasedWidth}
                className={styles.borderSurroundingDivs}
              >
                <p style={{ marginTop: "5px" }}>{this.props.club.address}</p>
                <p style={{ marginTop: "5px" }}>{this.props.club.city}</p>
                <p style={{ marginTop: "5px" }}>{this.props.club.state}</p>
                <p style={{ marginTop: "5px", marginBottom: "18px" }}>
                  {this.props.club.zip}
                </p>
                <p>{this.props.club.phoneNumber}</p>
                <a
                  style={{ marginTop: "5px" }}
                  href={`http://${this.props.club.clubWebsite}`}
                >
                  {this.props.club.clubWebsite}
                </a>
                <p style={{ marginTop: "20px", fontSize: "12px" }}>
                  {this.props.club.clubOpenTime} -
                  {this.props.club.clubCloseTime}{" "}
                </p>
              </div>
            </div>
          </div>
          <div id={styles.clubHolder}>
            <div id={styles.something} className={styles.borderSurroundingDivs}>
              <p id={styles.instructorsP}>Instructors</p>
              {this.props.profileInfo &&
                this.state.instructorsAtClub.map((element, index) => {
                  return (
                    <p className={styles.services} key={element + index}>
                      {element.name}
                    </p>
                  );
                })}
              {this.state.instructorsAtClub.length === 0 && (
                <p style={{ fontSize: "14px" }}>No Instructors Registered</p>
              )}
            </div>
            <div
              className={styles.borderSurroundingDivs}
              id={styles.servicesDiv}
            >
              <p id={styles.instructorsP}>Services Offered</p>
              {this.props.profileInfo &&
                this.props.profileInfo.services.map(element => {
                  let key = Object.keys(element);
                  let newKey = "";
                  if (key[0] === "tennisLessons") {
                    newKey = "Tennis Lessons";
                  } else if (key[0] === "groupClinics") {
                    newKey = "Group Clinics";
                  } else if (key[0] === "racquetStringing") {
                    newKey = "Racquet Stringing";
                  } else if (key[0] === "summerProgram") {
                    newKey = "Summer Program";
                  } else if (key[0] === "gym") {
                    newKey = "Gym";
                  } else if (key[0] === "tournaments") {
                    newKey = "Tournaments";
                  }
                  return (
                    <p
                      className={styles.services}
                      style={{ marginTop: "2px" }}
                      key={newKey + key}
                    >
                      {newKey}: {element[key]}
                    </p>
                  );
                })}
              {this.props.profileInfo &&
                this.props.profileInfo.otherServices.map((element, index) => {
                  return (
                    <p style={{ fontSize: "12px" }} key={element}>
                      {element}: Yes
                    </p>
                  );
                })}
              {this.props.profileInfo &&
                this.props.profileInfo.otherServices.length === 0 &&
                this.props.profileInfo.services.length === 0 && (
                  <p style={{ fontSize: "14px" }}>No Services Provided</p>
                )}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <p>Clubs are loading</p>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user
  };
};

export default withRouter(connect(mapStateToProps)(TennisClub));
