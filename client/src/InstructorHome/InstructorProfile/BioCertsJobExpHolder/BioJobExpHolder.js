import React from "react";
import styles from "./BioCertsJobExp.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class BioCertsJobExp extends React.Component {
  render() {
    let instructorUrl = `/instructor/${this.props.profile.instructor._id}/createeditprofile`;
    return (
      <div className={styles.row}>
        <div className={styles.contentHolder}>
          <p className={styles.pTagHeader}>About Me</p>
          <p style={{ padding: "5px" }}>{this.props.profile.bio}</p>
        </div>
        <div className={styles.contentHolder}>
          <p className={styles.pTagHeader}>Instructor Experience</p>
          <div style={{ display: "flex", paddingLeft: "5px" }}>
            {this.props.profile.jobExperience &&
              this.props.profile.jobExperience.length > 0 && (
                <div
                  style={{
                    width: "75%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    marginLeft: "10px"
                  }}
                >
                  <p style={{ textDecoration: "underline" }}>Organization</p>
                  {this.props.profile.jobExperience.map(element => {
                    return (
                      <p style={{ marginTop: "7px" }}>{element.clubName}</p>
                    );
                  })}
                </div>
              )}

            {this.props.profile.jobExperience.length > 0 && (
              <div
                style={{
                  width: "25%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <p style={{ textDecoration: "underline" }}>Years</p>
                {this.props.profile.jobExperience.map(element => {
                  return (
                    <p style={{ marginTop: "7px" }}>{element.jobDuration}</p>
                  );
                })}
              </div>
            )}
            {this.props.profile.jobExperience.length < 1 &&
              this.props.instructor && (
                <div>
                  <p>You have not added any job experiences in your profile.</p>
                  <Link
                    style={{
                      color: "black",
                      position: "relative",
                      top: "30px",
                      left: "20%"
                    }}
                    to={instructorUrl}
                  >
                    Click here to edit your profile.
                  </Link>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    instructor: state.authReducer.instructor
  };
};

export default connect(mapStateToProps)(BioCertsJobExp);
